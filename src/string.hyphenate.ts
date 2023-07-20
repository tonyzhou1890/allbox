const hyphenateRE = /\B([A-Z])/g
/**
 * @param {string} str
 * @returns string
 */
export const hyphenate = (str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

export default hyphenate
