/**
 * @param {number} num
 * @param {number} bitLength
 * @returns {number}
 * @desc reverse binary bit. example: 0b0101 -> 0b1010
 */
function reverse(num, bitLength) {
    let res = 0;
    while (bitLength) {
        res = (res << 1) + (num & 1);
        num >>= 1;
        bitLength--;
    }
    return res;
}

export { reverse as default };
