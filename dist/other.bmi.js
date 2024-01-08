/**
 * @param height unit: cm
 * @param weight unit: kg
 */
function bmi(height, weight) {
    return weight / ((height * height) / 10000);
}

export { bmi as default };
