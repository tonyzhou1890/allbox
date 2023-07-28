/**
 * @param {number} num 1 byte
 * @param {number} bitIdx bit index(from right to left)
 * @param {number} length required bits length
 * @returns {number}
 */
function getBits(num, bitIdx, length) {
    return (num >> bitIdx) & ((1 << length) - 1);
}

export { getBits as default };
