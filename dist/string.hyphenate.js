const hyphenateRE = /\B([A-Z])/g;
/**
 * @param {string} str
 * @returns {string}
 */
const hyphenate = (str) => {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
};

export { hyphenate as default, hyphenate };
