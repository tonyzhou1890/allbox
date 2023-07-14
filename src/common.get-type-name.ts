/**
 * @param {any} value
 * @returns {string}
 * @desc get type name of value
 * @example
 * getTypeName(1) // 'Number'
 * @example
 * getTypeName(new Date()) // 'Date'
 */
function getTypeName (value: any): string {
  let type = Object.prototype.toString.call(value).slice(8, -1)
  if (type === 'Object') {
    type = value.constructor.name
  }
  return type
}

export default getTypeName
