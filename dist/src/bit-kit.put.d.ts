/**
 * 按位数存数据
 * @param {Uint8Array} buf
 * @param {number} bitOffset 开始位
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset. bit index from left to right inside a byte
 **/
declare function put(buf: Uint8Array, bitOffset: number, num: number, bitLength?: number): number;
export default put;
