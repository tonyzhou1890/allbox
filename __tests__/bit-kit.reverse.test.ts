import reverse from '../src/bit-kit.reverse'

describe('function bitKit.reverse: ', () => {
  test('bitkit reverse 1', () => {
    expect(reverse(0b1010, 4)).toBe(0b0101)
  })
})
