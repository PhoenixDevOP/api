export default class Utils {
  static defer<T extends (...args: unknown[]) => any, A extends unknown[]>(
    callback: T,
    ...args: A
  ) {
    return setImmediate(() => callback(...args));
  }
}
