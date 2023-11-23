/**
 * check if elements of the arr is all different
 * @param {any[]} arr
 */
function isUnique(arr) {
    return arr.length === [...new Set(arr)].length;
}

export { isUnique as default };
