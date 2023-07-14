const camelizeRE = /-(\w)/g;
/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
}

export { camelize as default };
