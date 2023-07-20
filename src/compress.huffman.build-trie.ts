import { Trie } from './types/compress'

/**
 * 构建哈夫曼树
 * @param {Trie[]} arr
 * @returns {Trie}
 **/
function buildTrie (arr: Trie[]): Trie {
  while (arr.length > 1) {
    // 升序排序
    arr.sort((a, b) => a.freq - b.freq)

    const node: Trie = {} as Trie
    node.left = arr.shift() as Trie
    node.right = arr.shift() as Trie

    // 权值相等，则深度较小的作为左子树
    if (node.left.freq === node.left.freq) {
      if (
        node.left.depth !== undefined &&
        node.right.depth !== undefined &&
        node.left.depth > node.right.depth
      ) {
        const temp = node.left
        node.left = node.right
        node.right = temp
      }
    }

    node.freq = node.left.freq + node.right.freq
    node.depth = Math.max(node.left.depth || 0, node.right.depth || 0) + 1

    arr.push(node)
  }
  return arr[0]
}

export default buildTrie
