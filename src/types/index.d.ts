/**
 * string key object
 */
export interface StringKeyObjType {
  [x: string]: any
}

/**
 * worker call promisify
 */
export type WorkerCallPromisify<T extends (...args: any) => any> = (
  ...rest: Parameters<T>
) => Promise<ReturnType<T>>
