/**
 * @name angleConvert
 * @param {number} value
 * @param {string} sourceType angle type. D(egree)、R(adian)
 * @param {string} targetType like sourceType
 */
function angleConvert(value, sourceType, targetType) {
    let target = value;
    const convertPair = sourceType + targetType;
    switch (convertPair) {
        case 'DR':
            target = (value / 180) * Math.PI;
            break;
        case 'RD':
            target = (value / Math.PI) * 180;
            break;
    }
    return target;
}

export { angleConvert as default };
