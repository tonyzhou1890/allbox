import isUnuque from '../src/array.is-unique'

describe('function array.is-unique: ', () => {
  test('array is unique: is unique', () => {
    const raw = [1, 2, 3, 4, 5, 6]
    expect(isUnuque(raw)).toBe(true)
  })

  test('array is unique: isn`t unique', () => {
    const raw = [1, 2, 3, 1, 5, 6]
    expect(isUnuque(raw)).toBe(false)
  })
})
