import { rectPositionArr, vector2 } from './types/array.js';

/**
 *
 * @param {rectPositionArr} bound
 * @param {number} count
 * @returns
 */
declare function randomScatter(bound: rectPositionArr, count: number): vector2[];

export { randomScatter as default };
