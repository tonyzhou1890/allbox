import setBits from './bit-kit.set-bits'
import getBitLengthOfNumber from './bit-kit.get-bit-length-of-number'

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset
 */
function write (buf: Uint8Array, bitOffset: number, num: number, bitLength?: number): number {
  bitLength = bitLength ?? getBitLengthOfNumber(num)
  let byteIndex = (bitOffset / 8) >> 0
  // from right to left inside a byte
  let bitIndex = bitOffset % 8

  while (bitLength) {
    const writeBits = 8 - bitIndex > bitLength ? bitLength : 8 - bitIndex
    // remaining bit length
    bitLength -= writeBits
    buf[byteIndex] = setBits(buf[byteIndex], bitIndex, writeBits, num >> bitLength)

    // shift bitIndex
    bitIndex += writeBits
    bitOffset += writeBits
    // if current byte has been used up, shift byteIndex
    if (bitIndex === 8) {
      byteIndex++
      bitIndex = 0
    }
  }

  return bitOffset
}

export default write
