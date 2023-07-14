import swap from '../src/array.swap'

describe('function array.swap: ', () => {
  test('array swap1', () => {
    expect(swap([1], 0, 0)).toEqual([1])
  })

  test('array swap2', () => {
    expect(swap([1, 2, 3], 0, 2)).toEqual([3, 2, 1])
  })
})
