/**
 * @param {string} source
 * @param {string[]} sourceTable base table, like [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * @param {string[]} targetTable base table, like [0, 1]
 * @description (a1 * R^n + a2 * R^(n - 1) + …… am * R^0).(b1 * R^-1 + b2 * R^-2 ……).
 * But, i can't guarantee the correctness of the decimal part.
 */
declare function baseConvert(source: string, sourceTable: string[], targetTable: string[], precise?: number): string;

export { baseConvert as default };
