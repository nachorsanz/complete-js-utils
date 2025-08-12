/**
 * Function utilities: debounce, throttle, once, memoize, compose, pipe
 */

export type AnyFunction = (...args: any[]) => any;

export type DebounceOptions = {
  leading?: boolean;
  trailing?: boolean;
};

export const debounce = <F extends AnyFunction>(
  fn: F,
  wait: number,
  options: DebounceOptions = {},
): F & {
  cancel: () => void;
  flush: () => void;
} => {
  const { leading = false, trailing = true } = options;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<F> | null = null;
  let lastThis: any;
  let leadingCalled = false;

  const invoke = () => {
    if (trailing && lastArgs) {
      fn.apply(lastThis, lastArgs);
      lastArgs = null;
    }
    timeoutId = null;
    leadingCalled = false;
  };

  const debounced = function (this: any, ...args: Parameters<F>) {
    lastArgs = args;
    lastThis = this;

    if (timeoutId == null) {
      if (leading && !leadingCalled) {
        fn.apply(lastThis, lastArgs);
        lastArgs = null;
        leadingCalled = true;
      }
      timeoutId = setTimeout(invoke, wait);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(invoke, wait);
    }
  } as unknown as F & { cancel: () => void; flush: () => void };

  debounced.cancel = () => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    leadingCalled = false;
  };

  debounced.flush = () => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
      invoke();
    }
  };

  return debounced;
};

export const throttle = <F extends AnyFunction>(fn: F, wait: number): F & { cancel: () => void } => {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<F> | null = null;
  let lastThis: any;

  const invoke = () => {
    lastCall = Date.now();
    if (lastArgs) {
      fn.apply(lastThis, lastArgs);
      lastArgs = null;
    }
    timeoutId = null;
  };

  const throttled = function (this: any, ...args: Parameters<F>) {
    const now = Date.now();
    const remaining = wait - (now - lastCall);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      invoke();
    } else if (!timeoutId) {
      timeoutId = setTimeout(invoke, remaining);
    }
  } as unknown as F & { cancel: () => void };

  throttled.cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
    lastArgs = null;
  };

  return throttled;
};

export const once = <F extends AnyFunction>(fn: F): F => {
  let called = false;
  let result: ReturnType<F>;
  return function (this: any, ...args: Parameters<F>) {
    if (!called) {
      result = fn.apply(this, args);
      called = true;
    }
    return result;
  } as F;
};

export const memoize = <F extends AnyFunction>(
  fn: F,
  resolver?: (...args: Parameters<F>) => any,
): F & {
  cache: Map<any, any>;
  clear: () => void;
} => {
  const cache = new Map<any, any>();
  const memoized = function (this: any, ...args: Parameters<F>) {
    const key = resolver ? resolver(...args) : args.length === 1 ? args[0] : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  } as unknown as F & { cache: Map<any, any>; clear: () => void };
  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  return memoized;
};

export const compose =
  <T>(...fns: Array<(arg: any) => any>) =>
  (input: T) =>
    fns.reduceRight((acc, fn) => fn(acc), input);

export const pipe =
  <T>(...fns: Array<(arg: any) => any>) =>
  (input: T) =>
    fns.reduce((acc, fn) => fn(acc), input);
