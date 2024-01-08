/**
 * @param precise decimal length
 * @description
 * ```
 * Machin's formula
 * π = 16arctan(1/5) - 4acrtan(1/239)
 * =>
 * π/4 = 4 * (1/(1*5^1) - 1/(3*5^3) + 1/(5*5^5) - 1/(7*5^7) + ……) -
 *       (1/(1*239^1) - 1/(3*239^3) + 1/(5*239^5) - 1/(7*239^7) + ……)
 * ```
 */
declare function pi(precise?: number): string;

export { pi as default };
