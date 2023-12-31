import getBits from './bit-kit.get-bits.js';

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} [bitLength]
 * @returns {number} result number
 * @desc read number from Uint8Array with specific bit offset and bit length
 */
function read(buf, bitOffset, bitLength) {
    bitLength = bitLength ?? 1;
    let byteIndex = (bitOffset / 8) >> 0;
    // from right to left inside a byte
    let bitIndex = bitOffset % 8;
    let result = 0;
    while (bitLength) {
        const readBits = 8 - bitIndex > bitLength ? bitLength : 8 - bitIndex;
        result += getBits(buf[byteIndex], bitIndex, readBits);
        // shift bitIndex
        bitIndex += readBits;
        bitOffset += readBits;
        // if current byte has been used up, shift byteIndex
        if (bitIndex === 8) {
            byteIndex++;
            bitIndex = 0;
        }
        // remaining bit length
        bitLength -= readBits;
        result <<= bitLength;
    }
    return result;
}

export { read as default };
