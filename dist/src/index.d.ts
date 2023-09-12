import array_randomSwap from './array.random-swap';
import array_randomVector2 from './array.random-vector2';
import array_swap from './array.swap';
import bitKit_bigEndian_read from './bit-kit.big-endian.read';
import bitKit_bigEndian_write from './bit-kit.big-endian.write';
import bitKit_getBitLengthOfNumber from './bit-kit.get-bit-length-of-number';
import bitKit_getBits from './bit-kit.get-bits';
import bitKit_get from './bit-kit.get';
import bitKit_littleEndian_read from './bit-kit.little-endian.read';
import bitKit_littleEndian_write from './bit-kit.little-endian.write';
import bitKit_put from './bit-kit.put';
import bitKit_reverse from './bit-kit.reverse';
import bitKit_setBits from './bit-kit.set-bits';
import common_getTypeName from './common.get-type-name';
import compress_huffman_buildTable from './compress.huffman.build-table';
import compress_huffman_buildTrieFromTable from './compress.huffman.build-trie-from-table';
import compress_huffman_buildTrie from './compress.huffman.build-trie';
import compress_huffman_decode from './compress.huffman.decode';
import compress_huffman_encode from './compress.huffman.encode';
import compress_huffman_saveTable from './compress.huffman.save-table';
import graphic_randomScatter from './graphic.random-scatter';
import graphic_vector2Mapping from './graphic.vector2-mapping';
import number_randomRange from './number.random-range';
import string_camelize from './string.camelize';
import tree_flat from './tree.flat';
import worker_create from './worker.create';
import worker_thread from './worker.thread';
declare const Allbox: {
    array: {
        randomSwap: typeof array_randomSwap;
        randomVector2: typeof array_randomVector2;
        swap: typeof array_swap;
    };
    bitKit: {
        bigEndian: {
            read: typeof bitKit_bigEndian_read;
            write: typeof bitKit_bigEndian_write;
        };
        getBitLengthOfNumber: typeof bitKit_getBitLengthOfNumber;
        getBits: typeof bitKit_getBits;
        get: typeof bitKit_get;
        littleEndian: {
            read: typeof bitKit_littleEndian_read;
            write: typeof bitKit_littleEndian_write;
        };
        put: typeof bitKit_put;
        reverse: typeof bitKit_reverse;
        setBits: typeof bitKit_setBits;
    };
    common: {
        getTypeName: typeof common_getTypeName;
    };
    compress: {
        huffman: {
            buildTable: typeof compress_huffman_buildTable;
            buildTrieFromTable: typeof compress_huffman_buildTrieFromTable;
            buildTrie: typeof compress_huffman_buildTrie;
            decode: typeof compress_huffman_decode;
            encode: typeof compress_huffman_encode;
            saveTable: typeof compress_huffman_saveTable;
        };
    };
    graphic: {
        randomScatter: typeof graphic_randomScatter;
        vector2Mapping: typeof graphic_vector2Mapping;
    };
    number: {
        randomRange: typeof number_randomRange;
    };
    string: {
        camelize: typeof string_camelize;
        hyphenate: (str: string) => string;
    };
    tree: {
        flat: typeof tree_flat;
    };
    worker: {
        create: typeof worker_create;
        thread: typeof worker_thread;
    };
};
export default Allbox;
