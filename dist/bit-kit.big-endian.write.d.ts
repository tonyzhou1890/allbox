/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset
 */
declare function write(buf: Uint8Array, bitOffset: number, num: number, bitLength?: number): number;

export { write as default };
