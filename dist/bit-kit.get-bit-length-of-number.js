/**
 * @param {number} num
 * @returns {number}
 * @desc Gets the length of the binary representation of the number
 */
function getBitLengthOfNumber(num) {
    let exp = 1;
    while (num > 2 ** exp) {
        exp++;
    }
    return exp;
    // maybe next line is better?
    // return num.toString(2).length
}

export { getBitLengthOfNumber as default };
