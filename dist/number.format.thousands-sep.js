/**
 * @param {number} num
 * @returns
 */
function thousandsSep(num) {
    const arr = num.toString().split('.');
    return [
        arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, function ($0, $1) {
            return $1 + ',';
        }),
        arr[1],
    ]
        .filter(v => v)
        .join('.');
}

export { thousandsSep as default };
