interface StringKeyObjType {
    [x: string]: any;
}
declare const camelizeRE: RegExp;
/**
 * @param {string} str
 * @returns {string}
 */
declare function camelize(str: string): string;
/**
 * @param {any} value
 * @returns {string}
 * @desc get type name of value
 * @example
 * getTypeName(1) // 'Number'
 * @example
 * getTypeName(new Date()) // 'Date'
 */
declare function getTypeName(value: any): string;
/**
 *
 * @param arr
 * @returns
 */
declare function genObjectFromFilenameStrArr(arr: Array<string>): StringKeyObjType;
declare function genStrFromObj(obj: StringKeyObjType): string;
