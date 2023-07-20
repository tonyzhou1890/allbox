declare class Text {
}

/**
 * sub numbers
 * @param {any[]} array
 * @param {number} [startIndex] start index of the part that needs to process, default is 0
 * @param {number} [endIndex] end index of the part that needs to process, not include self, default is the length of array
 * @returns {any[]}
 */
declare function randomSwap<T>(array: T[], startIndex?: number, endIndex?: number): T[];

/**
 * @param {any[]} array
 * @param {number} aIndex
 * @param {number} bIndex
 * @returns {any[]}
 */
declare function swap<T>(array: T[], aIndex: number, bIndex: number): T[];

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
 * @param {string} str
 * @returns {string}
 */
declare function camelize(str: string): string;

declare const Allbox: {
    Text: typeof Text;
    array: {
        randomSwap: typeof randomSwap;
        swap: typeof swap;
    };
    common: {
        getTypeName: typeof getTypeName;
    };
    string: {
        camelize: typeof camelize;
        hyphenate: (str: string) => string;
    };
};

export { Allbox as default };
