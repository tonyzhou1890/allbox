import tempConvert from '../src/common.temperature-convert'

describe('function common.temperature-convert: ', () => {
  test('common temperature convert: C -> F', () => {
    expect(tempConvert(0, 'C', 'F')).toBe(32)
    expect(tempConvert(20, 'C', 'F')).toBe(68)
  })
  test('common temperature convert: C -> K', () => {
    expect(tempConvert(0, 'C', 'K')).toBe(273.15)
    expect(tempConvert(20, 'C', 'K')).toBe(293.15)
  })
  test('common temperature convert: F -> C', () => {
    expect(tempConvert(0, 'F', 'C')).toBe(-17.77778)
    expect(tempConvert(20, 'F', 'C')).toBe(-6.66667)
  })
  test('common temperature convert: F -> K', () => {
    expect(tempConvert(0, 'F', 'K')).toBe(255.37222)
    expect(tempConvert(20, 'F', 'K')).toBe(266.48333)
  })
  test('common temperature convert: K -> C', () => {
    expect(tempConvert(0, 'K', 'C')).toBe(-273.15)
    expect(tempConvert(20, 'K', 'C')).toBe(-253.15)
  })
  test('common temperature convert: K -> F', () => {
    expect(tempConvert(0, 'K', 'F')).toBe(-459.67)
    expect(tempConvert(20, 'K', 'F')).toBe(-423.67)
  })
  test('common temperature convert: K -> K', () => {
    expect(tempConvert(0, 'K', 'K')).toBe(0)
    expect(tempConvert(20, 'K', 'K')).toBe(20)
  })
})
