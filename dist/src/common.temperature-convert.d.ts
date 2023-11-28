/**
 * @name temperatueConvert
 * @param {number} value
 * @param {string} sourceType temperature type. C(elsius)、F(ahrenheit)、K(elvin)
 * @param {string} targetType like sourceType
 */
declare function temperatueConvert(value: number, sourceType: 'C' | 'F' | 'K', targetType: 'C' | 'F' | 'K'): number;
export default temperatueConvert;
