import randomRange from '../src/number.random-range'

describe('function number.randomRange: ', () => {
  test('random range 100 times', () => {
    const res = []
    const nums: number[] = []
    const bound: [number, number][] = []
    for (let i = 0; i < 100; i++) {
      const min = (Math.random() * 100) >> 0
      const max = min + ((Math.random() * 100) >> 0) + 1
      const r = randomRange(min, max)
      nums.push(r)
      bound.push([min, max])
      res.push(r >= min && r < max)
    }
    expect(
      res.every((v, idx) => {
        if (!v) {
          console.log(v, idx, nums[idx], bound[idx])
        }
        return v
      })
    ).toBe(true)
  })
})
