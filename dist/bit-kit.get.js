/**
 * 按位数读数据
 * @param {Uint8Array} buf
 * @param {number} bitOffset 开始位
 * @param {number} [bitLength] 读取的位数
 * @return {number}
 * @desc read data in Uint8Array. bit index from left to right in byte.
 **/
function get(buf, bitOffset, bitLength) {
    bitLength = bitLength !== null && bitLength !== void 0 ? bitLength : 1;
    let startByte = (bitOffset / 8) >> 0;
    let leftBits = bitLength;
    let startBit = bitOffset % 8;
    let res = 0;
    let isFirst = true;
    while (leftBits > 0) {
        // 当前字节剩余位数
        const currByteNotUsedBits = 8 - startBit;
        // 当前字节取值位数
        const readBits = leftBits > currByteNotUsedBits ? currByteNotUsedBits : leftBits;
        // 如果不是第一次取值，需要把已经取的值左移
        if (!isFirst) {
            res = res << readBits;
        }
        isFirst = false;
        res += (buf[startByte] >> (currByteNotUsedBits - readBits)) & ((1 << readBits) - 1);
        // 剩余需要字节
        leftBits -= readBits;
        startBit = 0;
        startByte++;
    }
    return res;
}

export { get as default };
