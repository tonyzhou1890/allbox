/**
 * @param {number} targetNum 1 byte
 * @param {number} bitIdx bit index (from right to left)
 * @param {number} length required bits length
 * @param {number} sourceNum
 * @returns
 */
declare function setBits(targetNum: number, bitIdx: number, length: number, sourceNum: number): number;
export default setBits;
