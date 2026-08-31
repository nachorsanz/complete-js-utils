import { on, off, delegate } from "../src/domUtils";
import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

describe("DomUtils", () => {
  let mockElement: Element;
  let mockDocument: Document;
  let mockWindow: Window;

  beforeEach(() => {
    // Create mock elements with event listener methods
    mockElement = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      closest: jest.fn(),
      contains: jest.fn(),
    } as any;

    mockDocument = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      contains: jest.fn(),
    } as any;

    mockWindow = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    } as any;
  });

  describe("on", () => {
    test("should add event listener to element", () => {
      const handler = jest.fn();
      on(mockElement, "click", handler);

      expect(mockElement.addEventListener).toHaveBeenCalledWith("click", handler, undefined);
    });

    test("should add event listener with options", () => {
      const handler = jest.fn();
      const options = { once: true, passive: true };
      on(mockElement, "click", handler, options);

      expect(mockElement.addEventListener).toHaveBeenCalledWith("click", handler, options);
    });

    test("should add event listener with boolean options", () => {
      const handler = jest.fn();
      on(mockElement, "click", handler, true);

      expect(mockElement.addEventListener).toHaveBeenCalledWith("click", handler, true);
    });

    test("should work with document", () => {
      const handler = jest.fn();
      on(mockDocument, "DOMContentLoaded", handler);

      expect(mockDocument.addEventListener).toHaveBeenCalledWith("DOMContentLoaded", handler, undefined);
    });

    test("should work with window", () => {
      const handler = jest.fn();
      on(mockWindow, "resize", handler);

      expect(mockWindow.addEventListener).toHaveBeenCalledWith("resize", handler, undefined);
    });

    test("should handle null element gracefully", () => {
      const handler = jest.fn();
      expect(() => on(null, "click", handler)).not.toThrow();
    });

    test("should handle element without addEventListener", () => {
      const invalidElement = {} as Element;
      const handler = jest.fn();
      expect(() => on(invalidElement, "click", handler)).not.toThrow();
    });
  });

  describe("off", () => {
    test("should remove event listener from element", () => {
      const handler = jest.fn();
      off(mockElement, "click", handler);

      expect(mockElement.removeEventListener).toHaveBeenCalledWith("click", handler, undefined);
    });

    test("should remove event listener with options", () => {
      const handler = jest.fn();
      const options = { capture: true };
      off(mockElement, "click", handler, options);

      expect(mockElement.removeEventListener).toHaveBeenCalledWith("click", handler, options);
    });

    test("should work with document", () => {
      const handler = jest.fn();
      off(mockDocument, "DOMContentLoaded", handler);

      expect(mockDocument.removeEventListener).toHaveBeenCalledWith("DOMContentLoaded", handler, undefined);
    });

    test("should work with window", () => {
      const handler = jest.fn();
      off(mockWindow, "resize", handler);

      expect(mockWindow.removeEventListener).toHaveBeenCalledWith("resize", handler, undefined);
    });

    test("should handle null element gracefully", () => {
      const handler = jest.fn();
      expect(() => off(null, "click", handler)).not.toThrow();
    });

    test("should handle element without removeEventListener", () => {
      const invalidElement = {} as Element;
      const handler = jest.fn();
      expect(() => off(invalidElement, "click", handler)).not.toThrow();
    });
  });

  describe("delegate", () => {
    let mockRoot: Element;
    let mockTarget: Element;
    let mockEvent: Event;

    beforeEach(() => {
      mockRoot = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        contains: jest.fn().mockReturnValue(true),
      } as any;

      mockTarget = {
        closest: jest.fn(),
      } as any;

      mockEvent = {
        target: mockTarget,
      } as any;
    });

    test("should add delegated event listener", () => {
      const handler = jest.fn();
      delegate(mockRoot, ".button", "click", handler);

      expect(mockRoot.addEventListener).toHaveBeenCalledTimes(1);
      expect(mockRoot.addEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );
    });

    test("should call handler when target matches selector", () => {
      const handler = jest.fn();
      const matchingElement = { textContent: "Click me" } as Element;

      // Mock closest to return the matching element
      (mockTarget.closest as jest.Mock).mockReturnValue(matchingElement);

      delegate(mockRoot, ".button", "click", handler);

      // Get the delegated handler that was registered
      const delegatedHandler = (mockRoot.addEventListener as jest.Mock).mock.calls[0][1] as Function;

      // Call the delegated handler with our mock event
      delegatedHandler(mockEvent);

      expect(handler).toHaveBeenCalledWith(mockEvent);
      expect(mockTarget.closest).toHaveBeenCalledWith(".button");
    });

    test("should not call handler when target doesn't match selector", () => {
      const handler = jest.fn();

      // Mock closest to return null (no match)
      (mockTarget.closest as jest.Mock).mockReturnValue(null);

      delegate(mockRoot, ".button", "click", handler);

      // Get the delegated handler that was registered
      const delegatedHandler = (mockRoot.addEventListener as jest.Mock).mock.calls[0][1] as Function;

      // Call the delegated handler with our mock event
      delegatedHandler(mockEvent);

      expect(handler).not.toHaveBeenCalled();
    });

    test("should not call handler when matching element is not contained in root", () => {
      const handler = jest.fn();
      const matchingElement = { textContent: "Click me" } as Element;

      // Mock closest to return the matching element
      (mockTarget.closest as jest.Mock).mockReturnValue(matchingElement);
      // Mock contains to return false (element not in root)
      (mockRoot.contains as jest.Mock).mockReturnValue(false);

      delegate(mockRoot, ".button", "click", handler);

      // Get the delegated handler that was registered
      const delegatedHandler = (mockRoot.addEventListener as jest.Mock).mock.calls[0][1] as Function;

      // Call the delegated handler with our mock event
      delegatedHandler(mockEvent);

      expect(handler).not.toHaveBeenCalled();
    });

    test("should return cleanup function", () => {
      const handler = jest.fn();
      const cleanup = delegate(mockRoot, ".button", "click", handler);

      expect(typeof cleanup).toBe("function");

      // Call cleanup
      cleanup();

      expect(mockRoot.removeEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        undefined
      );
    });

    test("should work with options", () => {
      const handler = jest.fn();
      const options = { capture: true, passive: true };

      delegate(mockRoot, ".button", "click", handler, options);

      expect(mockRoot.addEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        options
      );
    });

    test("should handle null root gracefully", () => {
      const handler = jest.fn();
      const cleanup = delegate(null, ".button", "click", handler);

      expect(typeof cleanup).toBe("function");
      expect(() => cleanup()).not.toThrow();
    });

    test("should handle root without addEventListener", () => {
      const invalidRoot = {} as Element;
      const handler = jest.fn();
      
      expect(() => delegate(invalidRoot, ".button", "click", handler)).not.toThrow();
    });

    test("should handle event without target", () => {
      const handler = jest.fn();
      const eventWithoutTarget = {} as Event;

      delegate(mockRoot, ".button", "click", handler);

      // Get the delegated handler that was registered
      const delegatedHandler = (mockRoot.addEventListener as jest.Mock).mock.calls[0][1] as Function;

      // Call the delegated handler with event without target
      expect(() => delegatedHandler(eventWithoutTarget)).not.toThrow();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("Integration with real DOM (JSDOM)", () => {
    beforeEach(() => {
      document.body.innerHTML = "";
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("should work with real DOM elements", () => {
      const button = document.createElement("button");
      button.textContent = "Click me";
      document.body.appendChild(button);

      const handler = jest.fn();
      on(button, "click", handler);

      // Simulate click
      button.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test("should work with event delegation on real DOM", () => {
      const container = document.createElement("div");
      container.innerHTML = `
        <button class="btn" data-id="1">Button 1</button>
        <button class="btn" data-id="2">Button 2</button>
        <span class="not-btn">Not a button</span>
      `;
      document.body.appendChild(container);

      const handler = jest.fn();
      const cleanup = delegate(container, ".btn", "click", handler);

      // Click on first button
      const button1 = container.querySelector('[data-id="1"]') as HTMLButtonElement;
      button1.click();

      expect(handler).toHaveBeenCalledTimes(1);

      // Click on second button
      const button2 = container.querySelector('[data-id="2"]') as HTMLButtonElement;
      button2.click();

      expect(handler).toHaveBeenCalledTimes(2);

      // Click on non-button element
      const span = container.querySelector(".not-btn") as HTMLSpanElement;
      span.click();

      expect(handler).toHaveBeenCalledTimes(2); // Should not increment

      cleanup();
    });

    test("should handle dynamically added elements with delegation", () => {
      const list = document.createElement("ul");
      list.className = "dynamic-list";
      document.body.appendChild(list);

      const handler = jest.fn();
      const cleanup = delegate(list, ".list-item", "click", handler);

      // Add items dynamically
      const item1 = document.createElement("li");
      item1.className = "list-item";
      item1.textContent = "Item 1";
      list.appendChild(item1);

      const item2 = document.createElement("li");
      item2.className = "list-item";
      item2.textContent = "Item 2";
      list.appendChild(item2);

      // Click on dynamically added items
      item1.click();
      expect(handler).toHaveBeenCalledTimes(1);

      item2.click();
      expect(handler).toHaveBeenCalledTimes(2);

      cleanup();
    });

    test("should work with once option", () => {
      const button = document.createElement("button");
      document.body.appendChild(button);

      const handler = jest.fn();
      on(button, "click", handler, { once: true });

      // Click multiple times
      button.click();
      button.click();
      button.click();

      // Should only be called once due to 'once' option
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});