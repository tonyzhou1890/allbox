import getBitLengthOfNumber from './bit-kit.get-bit-length-of-number.js';

/**
 * 按位数存数据
 * @param {Uint8Array} buf
 * @param {number} bitOffset 开始位
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset. bit index from left to right inside a byte
 **/
function put(buf, bitOffset, num, bitLength) {
    bitLength = bitLength !== null && bitLength !== void 0 ? bitLength : getBitLengthOfNumber(num);
    const length = bitLength;
    let startByte = (bitOffset / 8) >> 0;
    let startBit = bitOffset % 8;
    while (bitLength) {
        // 当前字节剩余位数
        const currByteNotUsedBits = 8 - startBit;
        // 当前字节需要填充位数
        const fillBits = currByteNotUsedBits >= bitLength ? bitLength : currByteNotUsedBits;
        // 数字剩余位数
        bitLength -= fillBits;
        // 取 num 的指定位数的值
        const partNum = (num >> bitLength) & ((1 << fillBits) - 1);
        // 存入当前字节
        buf[startByte] = buf[startByte] | (partNum << (currByteNotUsedBits - fillBits));
        startBit = 0;
        startByte++;
    }
    return bitOffset + length;
}

export { put as default };
