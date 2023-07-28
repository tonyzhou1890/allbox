import randomScatter from '../src/graphic.random-scatter'

describe('function graphic.random-scatter: ', () => {
  test('graphic random scatter-1', () => {
    const vecList = randomScatter(
      [
        [1, 2],
        [3, 5],
      ],
      100
    )
    expect(vecList.every(item => item[0] >= 1 && item[0] < 3 && item[1] >= 2 && item[1] < 5)).toBe(
      true
    )
  })
})
