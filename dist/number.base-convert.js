import isUnique from './array.is-unique.js';

/**
 * @param {string} source
 * @param {string[]} sourceTable base table, like [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * @param {string[]} targetTable base table, like [0, 1]
 * @description (a1 * R^n + a2 * R^(n - 1) + …… am * R^0).(b1 * R^-1 + b2 * R^-2 ……).
 * But, i can't guarantee the correctness of the decimal part.
 */
function baseConvert(source, sourceTable, targetTable, precise = 32) {
    // check params
    if (!source) {
        return '';
    }
    if (!isUnique(sourceTable)) {
        throw new Error('There are duplicated elements in sourceTable');
    }
    if (!isUnique(targetTable)) {
        throw new Error('There are duplicated elements in targetTable');
    }
    const reg = new RegExp(`^[${sourceTable.join('')}.]+$`);
    if (!reg.test(source)) {
        throw new Error('source does not match with sourceTable');
    }
    if (source.split('').filter(ch => ch === '.').length > 1) {
        throw new Error('There are too many dots in source string');
    }
    // convert
    let target = '';
    const sourceArr = source.split('.').filter(v => v);
    if (!sourceArr[0] || !sourceArr[0].length)
        return target;
    // source base map
    const sourceBaseMap = {};
    const sourceTableArr = [...sourceTable];
    // use BigInt
    for (let i = 0; i < sourceTableArr.length; i++) {
        sourceBaseMap[sourceTableArr[i]] = BigInt(i);
    }
    // integer
    const sourceIntArr = sourceArr[0];
    const targetIntArr = [];
    const sourceBase = BigInt(sourceTable.length);
    const targetBase = BigInt(targetTable.length);
    let sourceInt = 0n;
    let sBase = 1n;
    for (let i = sourceIntArr.length - 1; i >= 0; i--) {
        sourceInt += sourceBaseMap[sourceIntArr[i]] * sBase;
        sBase *= sourceBase;
    }
    while (sourceInt !== 0n) {
        targetIntArr.push(targetTable[Number(sourceInt % targetBase)]);
        sourceInt /= targetBase;
    }
    target = targetIntArr.reverse().join('');
    // if target is empty string, set it to be 'zero' value
    if (!target) {
        target = targetTable[0];
    }
    /**
     * decimal
     * use fraction to represent decimal:
     *   a1/(base^1) + a2/(base^2) …… + an/(base^n)
     * fraction -> decimal
     *   (fraction) * base --> integer part
     *   (rest fraction of last calculation) * base -> integer part
     *   ……
     */
    if (sourceArr[1]) {
        const sourceDecArr = sourceArr[1];
        const targetDecArr = [];
        // use array to represent decimal value, [numerator, denominator]
        const decArr = [0n, 1n];
        for (let i = 0; i < sourceDecArr.length; i++) {
            decArr[1] *= sourceBase;
        }
        let lastDenominator = 1n;
        for (let i = 0; i < sourceDecArr.length; i++) {
            lastDenominator *= sourceBase;
            decArr[0] += (decArr[1] / lastDenominator) * sourceBaseMap[sourceDecArr[i]];
        }
        while (targetDecArr.length < precise) {
            if (decArr[0] === 0n) {
                break;
            }
            decArr[0] *= targetBase;
            targetDecArr.push(targetTable[Number(decArr[0] / decArr[1])]);
            decArr[0] %= decArr[1];
        }
        // remove tail zero
        while (targetDecArr.length && targetDecArr[targetDecArr.length - 1] === targetTable[0]) {
            targetDecArr.pop();
        }
        if (targetDecArr.length) {
            target = `${target}.${targetDecArr.join('')}`;
        }
    }
    return target;
}

export { baseConvert as default };
