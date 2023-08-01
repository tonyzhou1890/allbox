/**
 * @param {number} num 1 byte
 * @param {number} bitIdx bit index(from right to left)
 * @param {number} length required bits length
 * @returns {number}
 */
declare function getBits(num: number, bitIdx: number, length: number): number;

export { getBits as default };
