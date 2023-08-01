/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} [bitLength]
 * @returns {number} result number
 * @desc read number from Uint8Array with specific bit offset and bit length
 */
declare function read(buf: Uint8Array, bitOffset: number, bitLength?: number): number;

export { read as default };
