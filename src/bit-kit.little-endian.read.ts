import getBits from './bit-kit.get-bits'

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} [bitLength]
 * @returns {number} result number
 * @desc read number from Uint8Array with specific bit offset and bit length
 */
function read (buf: Uint8Array, bitOffset: number, bitLength?: number): number {
  bitLength = bitLength ?? 1
  const rawBitLength = bitLength
  let byteIndex = (bitOffset / 8) >> 0
  // from right to left inside a byte
  let bitIndex = bitOffset % 8
  let result = 0

  while (bitLength) {
    const readBits = 8 - bitIndex > bitLength ? bitLength : 8 - bitIndex
    result += getBits(buf[byteIndex], bitIndex, readBits) << (rawBitLength - bitLength)

    // shift bitIndex
    bitIndex += readBits
    bitOffset += readBits
    // if current byte has been used up, shift byteIndex
    if (bitIndex === 8) {
      byteIndex++
      bitIndex = 0
    }
    // remaining bit length
    bitLength -= readBits
  }

  return result
}

export default read
