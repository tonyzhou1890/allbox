import swap from './array.swap.js';
import getTypeName from './other.get-type-name.js';

/**
 * sub numbers
 * @param {any[]} array
 * @param {number} [startIndex] start index of the part that needs to process, default is 0
 * @param {number} [endIndex] end index of the part that needs to process, not include self, default is the length of array
 * @returns any[]
 */
function randomSwap(array, startIndex, endIndex) {
    if (getTypeName(array) !== 'Array' || array.length < 2) {
        return array;
    }
    if (getTypeName(startIndex) !== 'Number' || startIndex < 0) {
        startIndex = 0;
    }
    if (getTypeName(endIndex) !== 'Number' || endIndex > array.length) {
        endIndex = array.length;
    }
    for (let i = 0, len = endIndex - startIndex; i < len; i++) {
        const aIndex = (Math.random() * len + startIndex) >> 0;
        const bIndex = (Math.random() * len + startIndex) >> 0;
        swap(array, aIndex, bIndex);
    }
    return array;
}

export { randomSwap as default };
