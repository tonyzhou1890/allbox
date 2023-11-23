/**
 * check if elements of the arr is all different
 * @param {any[]} arr
 */
function isUnique (arr: any[]): boolean {
  return arr.length === [...new Set(arr)].length
}

export default isUnique
