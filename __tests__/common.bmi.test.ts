import bmi from '../src/common.bmi'

describe('function common.bmi: ', () => {
  test('common angle convert: D -> R', () => {
    expect(bmi(160, 60)).toBe(23.4375)
  })
})
