import { Trie } from './types/compress.js';
import put from './bit-kit.put.js';

/**
 * 保存编码表
 * @param {Trie} trie
 * @param {typeof write} [wFn]
 * @returns Uint8Array
 **/
declare function saveTable(trie: Trie, wFn?: typeof put): Uint8Array;

export { saveTable as default };
