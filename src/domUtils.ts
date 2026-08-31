/**
 * DOM event utilities: on, off, delegate
 */

export type EventHandler<T extends Event = Event> = (event: T) => void;

export interface EventOptions {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
  signal?: AbortSignal;
}

/**
 * Add an event listener to an element with optional options
 * @param element - The target element
 * @param event - The event type (e.g., 'click', 'mouseover')
 * @param handler - The event handler function
 * @param options - Optional event listener options
 * @example
 * const button = document.querySelector('#myButton');
 * on(button, 'click', (e) => console.log('Clicked!'));
 * 
 * // With options
 * on(button, 'click', handler, { once: true, passive: true });
 */
export const on = <K extends keyof HTMLElementEventMap>(
  element: Element | Document | Window | null,
  event: K | string,
  handler: EventHandler,
  options?: EventOptions | boolean,
): void => {
  if (!element || typeof element.addEventListener !== 'function') {
    return;
  }
  element.addEventListener(event as string, handler as EventListener, options);
};

/**
 * Remove an event listener from an element
 * @param element - The target element
 * @param event - The event type (e.g., 'click', 'mouseover')
 * @param handler - The event handler function to remove
 * @param options - Optional event listener options (must match those used when adding)
 * @example
 * const button = document.querySelector('#myButton');
 * const handler = (e) => console.log('Clicked!');
 * on(button, 'click', handler);
 * off(button, 'click', handler);
 */
export const off = <K extends keyof HTMLElementEventMap>(
  element: Element | Document | Window | null,
  event: K | string,
  handler: EventHandler,
  options?: EventOptions | boolean,
): void => {
  if (!element || typeof element.removeEventListener !== 'function') {
    return;
  }
  element.removeEventListener(event as string, handler as EventListener, options);
};

/**
 * Event delegation - attach a single event listener to a parent element
 * that will handle events for matching child elements
 * @param root - The parent element to attach the listener to
 * @param selector - CSS selector to match child elements
 * @param event - The event type (e.g., 'click', 'mouseover')
 * @param handler - The event handler function
 * @returns A function to remove the delegated event listener
 * @example
 * // Handle clicks on any button within a container
 * const container = document.querySelector('#container');
 * const removeListener = delegate(container, 'button', 'click', (e) => {
 *   console.log('Button clicked:', e.target.textContent);
 * });
 * 
 * // Dynamic list example - handles clicks on items added later
 * const removeListListener = delegate(list, '.list-item', 'click', (e) => {
 *   const item = e.target.closest('.list-item');
 *   console.log('List item clicked:', item.dataset.id);
 * });
 * 
 * // Remove the delegation when no longer needed
 * removeListener();
 */
export const delegate = <K extends keyof HTMLElementEventMap>(
  root: Element | Document | null,
  selector: string,
  event: K | string,
  handler: EventHandler,
  options?: EventOptions | boolean,
): (() => void) => {
  if (!root || typeof root.addEventListener !== 'function') {
    return () => {};
  }

  const delegatedHandler = (e: Event) => {
    const target = e.target as Element;
    if (!target) return;

    // Find the closest matching element up the DOM tree
    const matchingElement = target.closest(selector);
    if (matchingElement && root.contains(matchingElement)) {
      // Create a new event object with the matching element as currentTarget
      Object.defineProperty(e, 'currentTarget', {
        value: matchingElement,
        configurable: true,
      });
      handler.call(matchingElement, e);
    }
  };

  root.addEventListener(event as string, delegatedHandler as EventListener, options);

  // Return cleanup function
  return () => {
    root.removeEventListener(event as string, delegatedHandler as EventListener, options);
  };
};