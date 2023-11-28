/**
 * @param {any} val
 * @returns
 */
function isEmpty (val: any): boolean {
  return val === undefined || val === null || val === ''
}

export default isEmpty
