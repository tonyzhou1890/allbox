import { Trie, CodeNode } from './types/compress'

/**
 * 生成编码表
 * @param {Trie} trie
 * @returns {CodeNode[]}
 * 返回一个 256 长度的数组，下标为原数字，元素为对应的编码{ code: number, bitLength: number }——bitLength 用来避免 0b01 变成和 0b1。这是为了方便编码的时候直接通过下标查表。
 **/
function buildTable (trie: Trie): CodeNode[] {
  const arr = new Array(256)

  getChildTrie(trie, 0, arr, 0)

  return arr

  function getChildTrie (trie: Trie, code: number, arr: CodeNode[], bitLength: number) {
    if (!trie.left && !trie.right) {
      arr[trie.num] = {
        code,
        bitLength,
      }
      return
    }
    if (trie.left) {
      getChildTrie(trie.left, code << 1, arr, bitLength + 1)
    }
    if (trie.right) {
      getChildTrie(trie.right, (code << 1) + 1, arr, bitLength + 1)
    }
  }
}

export default buildTable
