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
function pi(precise = 32) {
    precise = Math.max(0, precise);
    let m = 10n;
    let b1 = 5n;
    const b1Fac = 5n * 5n;
    let b2 = 239n;
    const b2Fac = 239n * 239n;
    let numerator = 4n * b2 - b1;
    let denominator = b1 * b2;
    let fac = 1n;
    let enlarge = 1n;
    for (let i = 1; i <= precise; i++) {
        m *= 10n;
        fac = 2n * BigInt(i) + 1n;
        b1 *= b1Fac;
        b2 *= b2Fac;
        enlarge = fac * b1 * b2;
        numerator *= enlarge;
        if (i % 2 === 1) {
            numerator -= (4n * b2 - b1) * denominator;
        }
        else {
            numerator += (4n * b2 - b1) * denominator;
        }
        denominator *= enlarge;
    }
    const p = (4n * m * numerator) / denominator;
    const decimal = p.toString().substring(1, precise + 1);
    return precise ? `3.${decimal}` : '3';
}

export { pi as default };
