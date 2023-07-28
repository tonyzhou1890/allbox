import { WorkerCallPromisify } from './types/index';
/**
 * worker job type
 */
export interface WorkerJobType {
    action: string;
    param?: Array<any>;
}
/**
 * worker job wrap type
 */
export interface WorkerJobWrapType {
    _sign: number;
    job: WorkerJobType;
    p: {
        resolve: (value: unknown) => void;
        reject: (value: unknown) => void;
    };
}
declare function worker(w: string | (() => Worker)): WorkerUtils;
export interface WorkerUtils {
    [key: string]: WorkerCallPromisify<(...args: any) => any>;
}
export default worker;
