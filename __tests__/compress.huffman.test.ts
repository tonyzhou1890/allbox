import encode from '../src/compress.huffman.encode'
import decode from '../src/compress.huffman.decode'
import util from 'node:util'
import fs from 'node:fs'

describe('package compress.huffman: ', () => {
  test('compress huffman 1', () => {
    console.log(__dirname)
    const str = fs.readFileSync(__dirname + '/assets/舞舞舞.txt', { encoding: 'utf-8' })
    // const str = 'this is a paragraph text'
    const textEncoder = new util.TextEncoder()
    const data = textEncoder.encode(str)
    console.time('huffman encode')
    const encoded = encode(data)
    console.timeEnd('huffman encode')
    const textDecoder = new util.TextDecoder()
    console.time('huffman decode')
    const decodedBuf = decode(encoded)
    console.timeEnd('huffman decode')
    const decoded = textDecoder.decode(decodedBuf)
    console.log('huffman compress rate: ', encoded.length / data.length)
    expect(decoded).toBe(str)
  })
})
