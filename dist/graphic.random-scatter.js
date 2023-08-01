import vector2Mapping from './graphic.vector2-mapping.js';
import randomVector2 from './array.random-vector2.js';
import './number.random-range.js';

/**
 *
 * @param {rectPositionArr} bound
 * @param {number} count
 * @returns
 */
function randomScatter(bound, count) {
    count = Math.max(count, 0);
    const list = [];
    for (let i = 0; i < count; i++) {
        list.push(randomVector2(0, 1));
    }
    vector2Mapping(list, [
        [0, 0],
        [1, 1],
    ], bound);
    return list;
}

export { randomScatter as default };
