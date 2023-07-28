import randomRange from './number.random-range.js';

/**
 * @param {number} min
 * @param {number} max
 * @returns {vector2}
 */
function randomVector2(min, max) {
    if (min === max) {
        return [min, max];
    }
    if (min > max) {
        const temp = max;
        max = min;
        min = temp;
    }
    const vec = [0, 0];
    vec[0] = randomRange(min, max);
    vec[1] = randomRange(min, max);
    return vec;
}

export { randomVector2 as default };
