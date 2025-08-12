import { debounce, throttle, once, memoize, compose, pipe } from "../src/functionUtils";
import { jest, describe, test, expect } from "@jest/globals";

jest.useFakeTimers();

describe("FunctionUtils", () => {
  test("debounce basic trailing", () => {
    const fn = jest.fn();
    const d = debounce(fn, 100);
    d();
    d();
    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(1);
  });

  test("debounce leading", () => {
    const fn = jest.fn();
    const d = debounce(fn, 100, { leading: true, trailing: false });
    d();
    expect(fn).toBeCalledTimes(1);
    jest.advanceTimersByTime(100);
    d();
    expect(fn).toBeCalledTimes(2);
  });

  test("debounce cancel and flush", () => {
    const fn = jest.fn();
    const d = debounce(fn, 100);
    d("a");
    // cancel should prevent trailing call
    d.cancel();
    jest.advanceTimersByTime(200);
    expect(fn).not.toBeCalled();

    // try again and flush immediately
    d("b");
    d.flush();
    expect(fn).toBeCalledTimes(1);
  });

  test("throttle", () => {
    const fn = jest.fn();
    const t = throttle(fn, 100);
    t();
    t();
    expect(fn).toBeCalledTimes(1);
    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(2);
  });

  test("throttle cancel", () => {
    const fn = jest.fn();
    const t = throttle(fn, 100);
    t(); // call immediately
    // schedule a trailing call
    t();
    // cancel should prevent the scheduled call
    t.cancel();
    jest.advanceTimersByTime(200);
    expect(fn).toBeCalledTimes(1);
  });

  test("once", () => {
    const fn = jest.fn((x: number) => x * 2);
    const o = once(fn);
    expect(o(2)).toBe(4);
    expect(o(3)).toBe(4);
    expect(fn).toBeCalledTimes(1);
  });

  test("memoize", () => {
    const fn = jest.fn((x: number) => x * 2);
    const m = memoize(fn);
    expect(m(2)).toBe(4);
    expect(m(2)).toBe(4);
    expect(fn).toBeCalledTimes(1);
    m.clear();
    expect(m(2)).toBe(4);
    expect(fn).toBeCalledTimes(2);
  });

  test("compose and pipe", () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const c = compose(double, add1);
    const p = pipe(add1, double);
    expect(c(3)).toBe(8); // double(add1(3)) = 8
    expect(p(3)).toBe(8); // double(add1(3)) = 8
  });
});
