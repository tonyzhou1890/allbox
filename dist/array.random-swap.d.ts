/**
 * sub numbers
 * @param {any[]} array
 * @param {number} [startIndex] start index of the part that needs to process, default is 0
 * @param {number} [endIndex] end index of the part that needs to process, not include self, default is the length of array
 * @returns any[]
 */
declare function randomSwap<T>(array: T[], startIndex?: number, endIndex?: number): T[];

export { randomSwap as default };
