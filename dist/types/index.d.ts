/**
 * string key object
 */
interface StringKeyObjType {
    [x: string]: any;
}
/**
 * worker call promisify
 */
declare type WorkerCallPromisify<T extends (...args: any) => any> = (...rest: Parameters<T>) => Promise<ReturnType<T>>;

export { StringKeyObjType, WorkerCallPromisify };
