import read from '../src/bit-kit.little-endian.read'

describe('function bitKit.littleEndian.read: ', () => {
  test('bitkit littleEndian read 1', () => {
    const u8a = new Uint8Array([0b00000110, 0])
    expect(read(u8a, 1, 2)).toBe(3)
  })

  test('bitkit littleEndian read 2', () => {
    const u8a = new Uint8Array([0b00000010, 0])
    expect(read(u8a, 1, 1)).toBe(1)
  })

  test('bitkit littleEndian read 3', () => {
    const u8a = new Uint8Array([0b10100000, 0b01])
    // 208 -> 0b11010000
    expect(read(u8a, 1, 8)).toBe(208)
  })
})
