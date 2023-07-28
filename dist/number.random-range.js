/**
 * @param {number} min
 * @param {number} max
 * @returns {number} float number between min and max(not included)
 */
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

export { randomRange as default };
