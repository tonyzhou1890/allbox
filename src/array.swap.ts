/**
 * @param {any[]} array
 * @param {number} aIndex
 * @param {number} bIndex
 * @returns any[]
 */
function swap<T> (array: T[], aIndex: number, bIndex: number): T[] {
  const temp = array[aIndex]
  array[aIndex] = array[bIndex]
  array[bIndex] = temp
  return array
}

export default swap
