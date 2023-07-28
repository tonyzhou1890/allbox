/**
 *
 * @param {vector2[]} vectors
 * @param {rectPositionArr} sourceBound [leftTop: vector2, rightBottom: vector2]
 * @param {rectPositionArr} targetBound
 * @returns {vector2[]}
 */
function vector2Mapping(vectors, sourceBound, targetBound) {
    const sourceWidth = sourceBound[1][0] - sourceBound[0][0];
    const sourceHeight = sourceBound[1][1] - sourceBound[0][1];
    const targetWidth = targetBound[1][0] - targetBound[0][0];
    const targetHeight = targetBound[1][1] - targetBound[0][1];
    for (let i = 0, len = vectors.length; i < len; i++) {
        const vector = vectors[i];
        // first. transform vector to the unit vector relative to the upper left corner
        vector[0] = (vector[0] - sourceBound[0][0]) / sourceWidth;
        vector[1] = (vector[1] - sourceBound[0][1]) / sourceHeight;
        // second. transform unit vector to target vector
        vector[0] = vector[0] * targetWidth + targetBound[0][0];
        vector[1] = vector[1] * targetHeight + targetBound[0][1];
    }
    return vectors;
}

export { vector2Mapping as default };
