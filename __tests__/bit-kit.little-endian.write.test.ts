import write from '../src/bit-kit.little-endian.write'

describe('function bitKit.littleEndian.write: ', () => {
  test('bitkit littleEndian write 1', () => {
    const u8a = new Uint8Array(2)
    write(u8a, 1, 3)
    expect(u8a).toEqual(new Uint8Array([0b00000110, 0]))
  })

  test('bitkit littleEndian write 2', () => {
    const u8a = new Uint8Array(2)
    write(u8a, 1, 3, 1)
    expect(u8a).toEqual(new Uint8Array([0b00000010, 0]))
  })

  test('bitkit littleEndian write 3', () => {
    const u8a = new Uint8Array(2)
    // 208 -> 0b11010000
    write(u8a, 1, 208)
    expect(u8a).toEqual(new Uint8Array([0b10100000, 0b01]))
  })
})
