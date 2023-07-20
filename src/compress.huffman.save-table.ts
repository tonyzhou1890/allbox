import { Trie } from './types/compress'
import write from './bit-kit.little-endian.write'

/**
 * 保存编码表
 * @param {Trie} trie
 * @param {typeof write} [wFn]
 * @returns Uint8Array
 **/
function saveTable (trie: Trie, wFn: typeof write = write) {
  // 前两个字节标识编码表字节长度
  const buf = new Uint8Array(514)
  let currBit = 16

  recursive(trie, buf)

  // 编码表长度
  const length = Math.ceil(currBit / 8) - 2
  buf[0] = length >> 8
  buf[1] = length & 0xff

  // 裁切
  return buf.slice(0, length + 2)

  function recursive (trie: Trie, buf: Uint8Array) {
    // 非字符节点，保存 0
    if (trie.num === undefined) {
      currBit = wFn(buf, currBit, 0, 1)
    } else {
      // 字符节点，保存 1 和字符(固定 8 位)
      currBit = wFn(buf, currBit, 1, 1)
      currBit = wFn(buf, currBit, trie.num, 8)
      return
    }
    // 左子树
    if (trie.left) {
      recursive(trie.left, buf)
    }
    // 右子树
    if (trie.right) {
      recursive(trie.right, buf)
    }
  }
}

export default saveTable
