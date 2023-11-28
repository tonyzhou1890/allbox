/**
 * @param height unit: cm
 * @param weight unit: kg
 */
function bmi (height: number, weight: number): number {
  return weight / ((height * height) / 10000)
}

export default bmi
