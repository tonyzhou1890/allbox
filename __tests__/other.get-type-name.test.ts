import getTypeName from '../src/other.get-type-name'

describe('function common.get-type-name: ', () => {
  test('base type Number', () => {
    expect(getTypeName(1)).toBe('Number')
  })

  test('class constructor', () => {
    expect(getTypeName(new Date())).toBe('Date')
  })

  test('class custom', () => {
    class Custom {
      constructor() {}
    }
    const instance = new Custom()
    expect(getTypeName(instance)).toBe('Custom')
  })
})
