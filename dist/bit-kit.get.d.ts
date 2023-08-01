/**
 * 按位数读数据
 * @param {Uint8Array} buf
 * @param {number} bitOffset 开始位
 * @param {number} [bitLength] 读取的位数
 * @return {number}
 * @desc read data in Uint8Array. bit index from left to right in byte.
 **/
declare function get(buf: Uint8Array, bitOffset: number, bitLength?: number): number;

export { get as default };
