'use strict';

/**
 * @param {any[]} array
 * @param {number} aIndex
 * @param {number} bIndex
 * @returns {any[]}
 */
function swap(array, aIndex, bIndex) {
    const temp = array[aIndex];
    array[aIndex] = array[bIndex];
    array[bIndex] = temp;
    return array;
}

/**
 * @param {any} value
 * @returns {string}
 * @desc get type name of value
 * @example
 * getTypeName(1) // 'Number'
 * @example
 * getTypeName(new Date()) // 'Date'
 */
function getTypeName(value) {
    let type = Object.prototype.toString.call(value).slice(8, -1);
    if (type === 'Object') {
        type = value.constructor.name;
    }
    return type;
}

/**
 * sub numbers
 * @param {any[]} array
 * @param {number} [startIndex] start index of the part that needs to process, default is 0
 * @param {number} [endIndex] end index of the part that needs to process, not include self, default is the length of array
 * @returns {any[]}
 */
function randomSwap(array, startIndex, endIndex) {
    if (getTypeName(array) !== 'Array' || array.length < 2) {
        return array;
    }
    if (getTypeName(startIndex) !== 'Number' || startIndex < 0) {
        startIndex = 0;
    }
    if (getTypeName(endIndex) !== 'Number' || endIndex > array.length) {
        endIndex = array.length;
    }
    for (let i = 0, len = (endIndex - startIndex); i < len; i++) {
        const aIndex = (Math.random() * len + startIndex) >> 0;
        const bIndex = (Math.random() * len + startIndex) >> 0;
        swap(array, aIndex, bIndex);
    }
    return array;
}

const camelizeRE = /-(\w)/g;
/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
}

const hyphenateRE = /\B([A-Z])/g;
/**
 * @param {string} str
 * @returns {string}
 */
const hyphenate = (str) => {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
};

// This file is generated by build/prebuild.
const Allbox = {
    array: {
        randomSwap: randomSwap,
        swap: swap,
    },
    common: {
        getTypeName: getTypeName,
    },
    string: {
        camelize: camelize,
        hyphenate: hyphenate,
    },
};

module.exports = Allbox;
