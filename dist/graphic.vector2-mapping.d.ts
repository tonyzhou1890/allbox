import { vector2, rectPositionArr } from './types/array.js';

/**
 *
 * @param {vector2[]} vectors
 * @param {rectPositionArr} sourceBound [leftTop: vector2, rightBottom: vector2]
 * @param {rectPositionArr} targetBound
 * @returns {vector2[]}
 */
declare function vector2Mapping(vectors: vector2[], sourceBound: rectPositionArr, targetBound: rectPositionArr): vector2[];

export { vector2Mapping as default };
