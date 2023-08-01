/**
 * huffman trie node
 */
export interface Trie {
    left?: Trie;
    right?: Trie;
    num: number;
    freq: number;
    depth: number;
}
/**
 * huffman code node
 */
export interface CodeNode {
    code: number;
    bitLength: number;
}
