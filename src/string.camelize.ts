const camelizeRE = /-(\w)/g
/**
 * @param {string} str
 * @returns string
 */
function camelize (str: string): string {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

export default camelize
