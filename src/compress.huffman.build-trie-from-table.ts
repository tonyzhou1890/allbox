import { Trie } from './types/compress'
import read from './bit-kit.little-endian.read'

/**
 * 根据编码表二进制逆向构建哈夫曼树
 * @param {Uint8Array} buf
 * @param {number} [startBit] 开始位
 * @param {typeof read} [rFn]
 * @returns {Trie}
 **/
function buildTrieFromTable (buf: Uint8Array, startBit: number = 0, rFn: typeof read = read): Trie {
  return build(buf)

  function build (buf: Uint8Array): Trie {
    const node: Trie = {} as Trie
    const flag = rFn(buf, startBit)
    startBit++
    // flag有值，代表是字符节点——叶子节点
    if (flag) {
      node.num = rFn(buf, startBit, 8)
      startBit += 8
      return node
    }
    // 左子树
    node.left = build(buf)
    // 右子树
    node.right = build(buf)
    return node
  }
}

export default buildTrieFromTable
