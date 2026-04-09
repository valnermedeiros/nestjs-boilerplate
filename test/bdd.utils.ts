/**
 * Async step function for Allure steps within tests
 * Usage: await step('Given: ...', async () => { ... })
 */
export async function step<T>(
  description: string,
  fn: () => T | Promise<T>,
): Promise<T> {
  console.log(`[STEP] ${description}`);
  return fn();
}

/**
 * BDD-style test context for sharing data between steps
 */
export class BDDContext {
  private data: Map<string, unknown> = new Map();

  set<T>(key: string, value: T): void {
    this.data.set(key, value);
  }

  get<T>(key: string): T {
    return this.data.get(key) as T;
  }

  getOrThrow<T>(key: string): T {
    const value = this.data.get(key);
    if (value === undefined) {
      throw new Error(`Context key "${key}" not found`);
    }
    return value as T;
  }

  clear(): void {
    this.data.clear();
  }
}
