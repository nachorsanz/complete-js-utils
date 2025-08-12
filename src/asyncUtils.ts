/**
 * Async utilities: retry, withTimeout, delay, pLimit, parallelMap
 */

export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export type RetryOptions = {
  retries?: number;
  factor?: number; // exponential backoff factor
  minTimeout?: number; // initial delay
  maxTimeout?: number; // cap delay
  onRetry?: (attempt: number, error: unknown) => void;
};

export const retry = async <T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> => {
  const { retries = 3, factor = 2, minTimeout = 100, maxTimeout = 2000, onRetry } = options;
  let attempt = 0;
  let delayMs = minTimeout;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= retries) throw error;
      onRetry?.(attempt + 1, error);
      await delay(delayMs);
      delayMs = Math.min(maxTimeout, Math.round(delayMs * factor));
      attempt++;
    }
  }
};

export const withTimeout = async <T>(promise: Promise<T>, ms: number, message = "Timeout exceeded"): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
};

export const pLimit = (concurrency: number) => {
  if (concurrency < 1) throw new Error("Concurrency must be at least 1");
  let activeCount = 0;
  const queue: Array<() => void> = [];

  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      const run = queue.shift();
      run && run();
    }
  };

  const run = async <T>(fn: () => Promise<T>): Promise<T> => {
    if (activeCount >= concurrency) {
      await new Promise<void>((resolve) => queue.push(resolve));
    }
    activeCount++;
    try {
      const result = await fn();
      return result;
    } finally {
      next();
    }
  };

  return run;
};

export const parallelMap = async <T, R>(
  items: T[],
  mapper: (item: T, index: number) => Promise<R>,
  concurrency = 5,
): Promise<R[]> => {
  const limit = pLimit(concurrency);
  return Promise.all(items.map((item, i) => limit(() => mapper(item, i))));
};
