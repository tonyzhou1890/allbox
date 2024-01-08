import getTypeName from './other.get-type-name'
import buildTable from './compress.huffman.build-table'
import saveTable from './compress.huffman.save-table'
import buildTrie from './compress.huffman.build-trie'
import put from './bit-kit.put'

/**
 * 压缩
 * @param {Uint8Array} buf
 * @return {Uint8Array}
 **/
function encode (buf: Uint8Array): Uint8Array {
  if (getTypeName(buf) !== 'Uint8Array') {
    throw new Error('Huffman.encode 的参数需要是 Uint8Array')
  }
  const write = put
  // 频率统计。
  // 统计一个字节共 256 种数值分别出现的次数
  let arr = new Array(256).fill(0)
  for (let i = 0, len = buf.length; i < len; i++) {
    arr[buf[i]]++
  }
  arr = arr
    .map((freq, num) => {
      return {
        num,
        freq,
      }
    })
    .filter(v => v.freq)
  // 构建哈夫曼树
  const trie = buildTrie(arr)
  // 生成编码表
  const table = buildTable(trie)
  // 编码--前面 4 个字节标识原数据字节长度
  let encodeBuf = new Uint8Array(buf.length + 4)
  for (let i = 0; i < 4; i++) {
    encodeBuf[i] = (buf.length >> ((3 - i) * 8)) & 0xff
  }
  let currBit = 32
  for (let i = 0, len = buf.length; i < len; i++) {
    const bitLength = table[buf[i]].bitLength
    if (currBit + bitLength > encodeBuf.length * 8) {
      const newBuf = new Uint8Array(encodeBuf.length + 1000)
      newBuf.set(encodeBuf)
      encodeBuf = newBuf
    }
    currBit = write(encodeBuf, currBit, table[buf[i]].code, bitLength)
  }
  // encodeBuf 裁切
  encodeBuf = encodeBuf.slice(0, Math.ceil(currBit / 8))
  // 保存编码表
  const tableBuf = saveTable(trie, write)
  // 合并数据
  const finalData = new Uint8Array(encodeBuf.length + tableBuf.length)
  finalData.set(tableBuf)
  finalData.set(encodeBuf, tableBuf.length)
  return finalData
}

export default encode
