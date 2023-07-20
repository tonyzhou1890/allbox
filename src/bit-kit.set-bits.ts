/**
 * @param {number} targetNum 1 byte
 * @param {number} bitIdx bit index (from right to left)
 * @param {number} length required bits length
 * @param {number} sourceNum
 * @returns
 */
function setBits (targetNum: number, bitIdx: number, length: number, sourceNum: number): number {
  return ((((1 << length) - 1) & sourceNum) << bitIdx) | targetNum
}

export default setBits
