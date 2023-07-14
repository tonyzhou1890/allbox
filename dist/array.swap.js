/**
 * @param {any[]} array
 * @param {number} aIndex
 * @param {number} bIndex
 * @returns {any[]}
 */
function swap(array, aIndex, bIndex) {
    const temp = array[aIndex];
    array[aIndex] = array[bIndex];
    array[bIndex] = temp;
    return array;
}

export { swap as default };
