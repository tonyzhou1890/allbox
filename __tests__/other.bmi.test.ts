import bmi from '../src/other.bmi'

describe('function other.bmi: ', () => {
  test('other angle convert: D -> R', () => {
    expect(bmi(160, 60)).toBe(23.4375)
  })
})
