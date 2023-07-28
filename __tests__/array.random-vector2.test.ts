import randomVector2 from '../src/array.random-vector2'

describe('function array.random-vector2: ', () => {
  test('array random vector2-1', () => {
    const vecList = []
    for (let i = 0; i < 100; i++) {
      vecList.push(randomVector2(1, 10))
    }
    expect(
      vecList.every(item => item[0] >= 1 && item[0] < 10 && item[1] >= 1 && item[1] < 10)
    ).toBe(true)
  })

  test('array random vector2-2', () => {
    expect(randomVector2(1, 1)).toEqual([1, 1])
  })

  test('array random vector2-2', () => {
    const vec = randomVector2(2, 1)
    expect(vec[0] >= 1 && vec[1] < 2).toBe(true)
  })
})
