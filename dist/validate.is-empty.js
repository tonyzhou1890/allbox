/**
 * @param {any} val
 * @returns
 */
function isEmpty(val) {
    return val === undefined || val === null || val === '';
}

export { isEmpty as default };
