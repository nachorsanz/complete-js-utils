import { delay, retry, withTimeout, pLimit, parallelMap } from "../src/asyncUtils";
import { describe, test, expect } from "@jest/globals";

describe("AsyncUtils", () => {
  test("delay waits the specified time", async () => {
    const start = Date.now();
    await delay(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(45);
  });

  test("retry succeeds after transient failures", async () => {
    let attempts = 0;
    const fn = async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "ok";
    };
    const result = await retry(fn, { retries: 5, minTimeout: 10, factor: 1 });
    expect(result).toBe("ok");
    expect(attempts).toBe(3);
  });

  test("retry throws after max retries", async () => {
    let attempts = 0;
    const fn = async () => {
      attempts++;
      throw new Error("always fail");
    };
    await expect(retry(fn, { retries: 2, minTimeout: 5, factor: 1 })).rejects.toThrow("always fail");
    expect(attempts).toBe(3); // initial + 2 retries
  });

  test("withTimeout resolves before timeout", async () => {
    const result = await withTimeout(Promise.resolve(42), 100);
    expect(result).toBe(42);
  });

  test("withTimeout rejects on timeout", async () => {
    await expect(
      withTimeout(
        delay(50).then(() => 1 as unknown as Promise<number>),
        10,
      ),
    ).rejects.toThrow(/Timeout exceeded/);
  });

  test("pLimit enforces concurrency", async () => {
    const limit = pLimit(2);
    let running = 0;
    let maxRunning = 0;

    const task = async (ms: number) => {
      running++;
      maxRunning = Math.max(maxRunning, running);
      await delay(ms);
      running--;
      return ms;
    };

    const results = await Promise.all([
      limit(() => task(30)),
      limit(() => task(30)),
      limit(() => task(30)),
      limit(() => task(30)),
    ]);

    expect(results).toHaveLength(4);
    expect(maxRunning).toBeLessThanOrEqual(2);
  });

  test("parallelMap maps with limited concurrency", async () => {
    const items = [1, 2, 3, 4, 5];
    const results = await parallelMap(
      items,
      async (n) => {
        await delay(10);
        return n * 2;
      },
      2,
    );
    expect(results).toEqual([2, 4, 6, 8, 10]);
  });
});
