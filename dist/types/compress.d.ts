/**
 * huffman trie node
 */
interface Trie {
    left?: Trie;
    right?: Trie;
    num: number;
    freq: number;
    depth: number;
}
/**
 * huffman code node
 */
interface CodeNode {
    code: number;
    bitLength: number;
}

export { CodeNode, Trie };
