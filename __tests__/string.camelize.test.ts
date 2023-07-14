import camelize from '../src/string.camelize'

describe('function string.camelize: ', () => {
  test('string camelize1', () => {
    expect(camelize('this-is-a-function')).toBe('thisIsAFunction')
  })
  test('string camelize2', () => {
    expect(camelize('this-is-a-')).toBe('thisIsA-')
  })
})
