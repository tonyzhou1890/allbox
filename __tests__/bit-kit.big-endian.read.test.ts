import read from '../src/bit-kit.big-endian.read'

describe('function bitKit.bigEndian.read: ', () => {
  test('bitkit bigEndian read 1', () => {
    const u8a = new Uint8Array([0b00000110, 0])
    expect(read(u8a, 1, 2)).toBe(3)
  })

  test('bitkit bigEndian read 2', () => {
    const u8a = new Uint8Array([0b00000010, 0])
    expect(read(u8a, 1, 1)).toBe(1)
  })

  test('bitkit bigEndian read 3', () => {
    const u8a = new Uint8Array([0b10100000, 0b01])
    // 321 -> 0b101000001
    expect(read(u8a, 1, 9)).toBe(321)
  })
})
