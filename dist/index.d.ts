/**
 * sub numbers
 * @param {any[]} array
 * @param {number} [startIndex] start index of the part that needs to process, default is 0
 * @param {number} [endIndex] end index of the part that needs to process, not include self, default is the length of array
 * @returns any[]
 */
declare function randomSwap<T>(array: T[], startIndex?: number, endIndex?: number): T[];

type vector2 = [number, number]

type rectPositionArr = [vector2, vector2]

/**
 * @param {number} min
 * @param {number} max
 * @returns {vector2}
 */
declare function randomVector2(min: number, max: number): vector2;

/**
 * @param {any[]} array
 * @param {number} aIndex
 * @param {number} bIndex
 * @returns any[]
 */
declare function swap<T>(array: T[], aIndex: number, bIndex: number): T[];

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} [bitLength]
 * @returns {number} result number
 * @desc read number from Uint8Array with specific bit offset and bit length
 */
declare function read$1(buf: Uint8Array, bitOffset: number, bitLength?: number): number;

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset
 */
declare function write$1(buf: Uint8Array, bitOffset: number, num: number, bitLength?: number): number;

/**
 * @param {number} num
 * @returns {number}
 * @desc Gets the length of the binary representation of the number
 */
declare function getBitLengthOfNumber(num: number): number;

/**
 * @param {number} num 1 byte
 * @param {number} bitIdx bit index(from right to left)
 * @param {number} length required bits length
 * @returns {number}
 */
declare function getBits(num: number, bitIdx: number, length: number): number;

/**
 * 按位数读数据
 * @param {Uint8Array} buf
 * @param {number} bitOffset 开始位
 * @param {number} [bitLength] 读取的位数
 * @return {number}
 * @desc read data in Uint8Array. bit index from left to right in byte.
 **/
declare function get(buf: Uint8Array, bitOffset: number, bitLength?: number): number;

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} [bitLength]
 * @returns {number} result number
 * @desc read number from Uint8Array with specific bit offset and bit length
 */
declare function read(buf: Uint8Array, bitOffset: number, bitLength?: number): number;

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset
 */
declare function write(buf: Uint8Array, bitOffset: number, num: number, bitLength?: number): number;

/**
 * 按位数存数据
 * @param {Uint8Array} buf
 * @param {number} bitOffset 开始位
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset. bit index from left to right inside a byte
 **/
declare function put(buf: Uint8Array, bitOffset: number, num: number, bitLength?: number): number;

/**
 * @param {number} num
 * @param {number} bitLength
 * @returns {number}
 * @desc reverse binary bit. example: 0b0101 -> 0b1010
 */
declare function reverse(num: number, bitLength: number): number;

/**
 * @param {number} targetNum 1 byte
 * @param {number} bitIdx bit index (from right to left)
 * @param {number} length required bits length
 * @param {number} sourceNum
 * @returns
 */
declare function setBits(targetNum: number, bitIdx: number, length: number, sourceNum: number): number;

/**
 * @param {any} value
 * @returns string
 * @desc get type name of value
 * @example
 * getTypeName(1) // 'Number'
 * @example
 * getTypeName(new Date()) // 'Date'
 */
declare function getTypeName(value: any): string;

/**
 * huffman trie node
 */
interface Trie {
  left?: Trie
  right?: Trie
  num: number
  freq: number
  depth: number
}

/**
 * huffman code node
 */
interface CodeNode {
  code: number
  bitLength: number
}

/**
 * 生成编码表
 * @param {Trie} trie
 * @returns {CodeNode[]}
 * 返回一个 256 长度的数组，下标为原数字，元素为对应的编码{ code: number, bitLength: number }——bitLength 用来避免 0b01 变成和 0b1。这是为了方便编码的时候直接通过下标查表。
 **/
declare function buildTable(trie: Trie): CodeNode[];

/**
 * 根据编码表二进制逆向构建哈夫曼树
 * @param {Uint8Array} buf
 * @param {number} [startBit] 开始位
 * @param {typeof read} [rFn]
 * @returns {Trie}
 **/
declare function buildTrieFromTable(buf: Uint8Array, startBit?: number, rFn?: typeof get): Trie;

/**
 * 构建哈夫曼树
 * @param {Trie[]} arr
 * @returns {Trie}
 **/
declare function buildTrie(arr: Trie[]): Trie;

/**
 * decode
 * @param {Uint8Array} buf
 * @returns {Uint8Array}
 */
declare function decode(buf: Uint8Array): Uint8Array;

/**
 * 压缩
 * @param {Uint8Array} buf
 * @return {Uint8Array}
 **/
declare function encode(buf: Uint8Array): Uint8Array;

/**
 * 保存编码表
 * @param {Trie} trie
 * @param {typeof write} [wFn]
 * @returns Uint8Array
 **/
declare function saveTable(trie: Trie, wFn?: typeof put): Uint8Array;

/**
 *
 * @param {rectPositionArr} bound
 * @param {number} count
 * @returns
 */
declare function randomScatter(bound: rectPositionArr, count: number): vector2[];

/**
 *
 * @param {vector2[]} vectors
 * @param {rectPositionArr} sourceBound [leftTop: vector2, rightBottom: vector2]
 * @param {rectPositionArr} targetBound
 * @returns {vector2[]}
 */
declare function vector2Mapping(vectors: vector2[], sourceBound: rectPositionArr, targetBound: rectPositionArr): vector2[];

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} float number between min and max(not included)
 */
declare function randomRange(min: number, max: number): number;

/**
 * @param {string} str
 * @returns string
 */
declare function camelize(str: string): string;

/**
 * worker call promisify
 */
type WorkerCallPromisify<T extends (...args: any) => any> = (
  ...rest: Parameters<T>
) => Promise<ReturnType<T>>

declare function worker(w: string | (() => Worker)): WorkerUtils;
interface WorkerUtils {
    [key: string]: WorkerCallPromisify<(...args: any) => any>;
}

declare const Allbox: {
    array: {
        randomSwap: typeof randomSwap;
        randomVector2: typeof randomVector2;
        swap: typeof swap;
    };
    bitKit: {
        bigEndian: {
            read: typeof read$1;
            write: typeof write$1;
        };
        getBitLengthOfNumber: typeof getBitLengthOfNumber;
        getBits: typeof getBits;
        get: typeof get;
        littleEndian: {
            read: typeof read;
            write: typeof write;
        };
        put: typeof put;
        reverse: typeof reverse;
        setBits: typeof setBits;
    };
    common: {
        getTypeName: typeof getTypeName;
    };
    compress: {
        huffman: {
            buildTable: typeof buildTable;
            buildTrieFromTable: typeof buildTrieFromTable;
            buildTrie: typeof buildTrie;
            decode: typeof decode;
            encode: typeof encode;
            saveTable: typeof saveTable;
        };
    };
    graphic: {
        randomScatter: typeof randomScatter;
        vector2Mapping: typeof vector2Mapping;
    };
    number: {
        randomRange: typeof randomRange;
    };
    string: {
        camelize: typeof camelize;
        hyphenate: (str: string) => string;
    };
    worker: typeof worker;
};

export { Allbox as default };
