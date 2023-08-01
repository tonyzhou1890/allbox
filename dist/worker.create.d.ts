import { WorkerCallPromisify } from './types/index.js';

/**
 * worker job type
 */
interface WorkerJobType {
    action: string;
    param?: Array<any>;
}
/**
 * worker job wrap type
 */
interface WorkerJobWrapType {
    _sign: number;
    job: WorkerJobType;
    p: {
        resolve: (value: unknown) => void;
        reject: (value: unknown) => void;
    };
}
declare function create(w: string | (() => Worker)): WorkerUtils;
interface WorkerUtils {
    [key: string]: WorkerCallPromisify<(...args: any) => any>;
}

export { WorkerJobType, WorkerJobWrapType, WorkerUtils, create as default };
