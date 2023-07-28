import { Trie } from './types/compress';
import get from './bit-kit.get';
/**
 * 根据编码表二进制逆向构建哈夫曼树
 * @param {Uint8Array} buf
 * @param {number} [startBit] 开始位
 * @param {typeof read} [rFn]
 * @returns {Trie}
 **/
declare function buildTrieFromTable(buf: Uint8Array, startBit?: number, rFn?: typeof get): Trie;
export default buildTrieFromTable;
