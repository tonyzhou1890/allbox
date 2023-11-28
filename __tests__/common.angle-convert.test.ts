import angleConvert from '../src/common.angle-convert'

describe('function common.angle-convert: ', () => {
  test('common angle convert: D -> R', () => {
    expect(angleConvert(0, 'D', 'R')).toBe(0)
    expect(angleConvert(10, 'D', 'R')).toBe(0.17453292519943295)
    expect(angleConvert(180, 'D', 'R')).toBe(Math.PI)
  })
  test('common angle convert: R -> D', () => {
    expect(angleConvert(0, 'R', 'D')).toBe(0)
    expect(angleConvert(1, 'R', 'D')).toBe(57.29577951308232)
    expect(angleConvert(Math.PI, 'R', 'D')).toBe(180)
  })
  test('common angle convert: R -> R', () => {
    expect(angleConvert(0, 'R', 'R')).toBe(0)
    expect(angleConvert(1, 'R', 'R')).toBe(1)
    expect(angleConvert(Math.PI, 'R', 'R')).toBe(Math.PI)
  })
})
