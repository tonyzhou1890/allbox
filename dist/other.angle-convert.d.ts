/**
 * @name angleConvert
 * @param {number} value
 * @param {string} sourceType angle type. D(egree)、R(adian)
 * @param {string} targetType like sourceType
 */
declare function angleConvert(value: number, sourceType: 'D' | 'R', targetType: 'D' | 'R'): number;

export { angleConvert as default };
