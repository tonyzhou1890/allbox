/**
 * @name temperatueConvert
 * @param {number} value
 * @param {string} sourceType temperature type. C(elsius)、F(ahrenheit)、K(elvin)
 * @param {string} targetType like sourceType
 */
function temperatueConvert (
  value: number,
  sourceType: 'C' | 'F' | 'K',
  targetType: 'C' | 'F' | 'K'
): number {
  let target = value
  const convertPair = sourceType + targetType
  switch (convertPair) {
    case 'CF':
      target = value * 1.8 + 32
      break
    case 'CK':
      target = value + 273.15
      break
    case 'FC':
      target = (value - 32) / 1.8
      break
    case 'FK':
      target = ((value + 459.67) * 5) / 9
      break
    case 'KC':
      target = value - 273.15
      break
    case 'KF':
      target = value * 1.8 - 459.67
      break
  }
  return target
}

export default temperatueConvert
