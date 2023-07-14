import hyphenate from '../src/string.hyphenate'

describe('function string.hyphenate: ', () => {
  test('string hyphenate', () => {
    expect(hyphenate('thisIsAFunction')).toBe('this-is-a-function')
  })
})
