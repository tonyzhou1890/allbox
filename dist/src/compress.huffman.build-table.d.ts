import { Trie, CodeNode } from './types/compress';
/**
 * 生成编码表
 * @param {Trie} trie
 * @returns {CodeNode[]}
 * 返回一个 256 长度的数组，下标为原数字，元素为对应的编码{ code: number, bitLength: number }——bitLength 用来避免 0b01 变成和 0b1。这是为了方便编码的时候直接通过下标查表。
 **/
declare function buildTable(trie: Trie): CodeNode[];
export default buildTable;
