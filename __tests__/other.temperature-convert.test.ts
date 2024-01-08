import tempConvert from '../src/other.temperature-convert'

describe('function other.temperature-convert: ', () => {
  test('other temperature convert: C -> F', () => {
    expect(tempConvert(0, 'C', 'F')).toBe(32)
    expect(tempConvert(20, 'C', 'F')).toBe(68)
  })
  test('other temperature convert: C -> K', () => {
    expect(tempConvert(0, 'C', 'K')).toBe(273.15)
    expect(tempConvert(20, 'C', 'K')).toBe(293.15)
  })
  test('other temperature convert: F -> C', () => {
    expect(tempConvert(0, 'F', 'C').toFixed(5)).toBe('-17.77778')
    expect(tempConvert(20, 'F', 'C')).toBe(-6.666666666666666)
  })
  test('other temperature convert: F -> K', () => {
    expect(tempConvert(0, 'F', 'K').toFixed(5)).toBe('255.37222')
    expect(tempConvert(20, 'F', 'K')).toBe(266.48333333333335)
  })
  test('other temperature convert: K -> C', () => {
    expect(tempConvert(0, 'K', 'C')).toBe(-273.15)
    expect(tempConvert(20, 'K', 'C').toFixed(5)).toBe('-253.15000')
  })
  test('other temperature convert: K -> F', () => {
    expect(tempConvert(0, 'K', 'F')).toBe(-459.67)
    expect(tempConvert(20, 'K', 'F')).toBe(-423.67)
  })
  test('other temperature convert: K -> K', () => {
    expect(tempConvert(0, 'K', 'K')).toBe(0)
    expect(tempConvert(20, 'K', 'K')).toBe(20)
  })
})
