import write from '../src/bit-kit.big-endian.write'

describe('function bitKit.bigEndian.write: ', () => {
  test('bitkit bigEndian write 1', () => {
    const u8a = new Uint8Array(2)
    write(u8a, 1, 3)
    expect(u8a).toEqual(new Uint8Array([0b00000110, 0]))
  })

  test('bitkit bigEndian write 2', () => {
    const u8a = new Uint8Array(2)
    write(u8a, 1, 3, 1)
    expect(u8a).toEqual(new Uint8Array([0b00000010, 0]))
  })

  test('bitkit bigEndian write 3', () => {
    const u8a = new Uint8Array(2)
    // 321 -> 0b101000001
    write(u8a, 1, 321)
    expect(u8a).toEqual(new Uint8Array([0b10100000, 0b01]))
  })
})
