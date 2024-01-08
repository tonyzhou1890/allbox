import isUnique from './array.is-unique.js';
import randomSwap from './array.random-swap.js';
import randomVector2 from './array.random-vector2.js';
import swap from './array.swap.js';
import read from './bit-kit.big-endian.read.js';
import write from './bit-kit.big-endian.write.js';
import getBitLengthOfNumber from './bit-kit.get-bit-length-of-number.js';
import getBits from './bit-kit.get-bits.js';
import get from './bit-kit.get.js';
import read$1 from './bit-kit.little-endian.read.js';
import write$1 from './bit-kit.little-endian.write.js';
import put from './bit-kit.put.js';
import reverse from './bit-kit.reverse.js';
import setBits from './bit-kit.set-bits.js';
import buildTable from './compress.huffman.build-table.js';
import buildTrieFromTable from './compress.huffman.build-trie-from-table.js';
import buildTrie from './compress.huffman.build-trie.js';
import decode from './compress.huffman.decode.js';
import encode from './compress.huffman.encode.js';
import saveTable from './compress.huffman.save-table.js';
import randomScatter from './graphic.random-scatter.js';
import vector2Mapping from './graphic.vector2-mapping.js';
import pi from './math.pi.js';
import baseConvert from './number.base-convert.js';
import thousandsSep from './number.format.thousands-sep.js';
import randomRange from './number.random-range.js';
import angleConvert from './other.angle-convert.js';
import bmi from './other.bmi.js';
import getTypeName from './other.get-type-name.js';
import searchPatternCheck from './other.search-pattern-check.js';
import temperatueConvert from './other.temperature-convert.js';
import camelize from './string.camelize.js';
import flat from './tree.flat.js';
import isEmpty from './validate.is-empty.js';
import create from './worker.create.js';
import thread from './worker.thread.js';
import './types/array.js';
import './types/compress.js';
import './types/index.js';

declare const Allbox: {
    array: {
        isUnique: typeof isUnique;
        randomSwap: typeof randomSwap;
        randomVector2: typeof randomVector2;
        swap: typeof swap;
    };
    bitKit: {
        bigEndian: {
            read: typeof read;
            write: typeof write;
        };
        getBitLengthOfNumber: typeof getBitLengthOfNumber;
        getBits: typeof getBits;
        get: typeof get;
        littleEndian: {
            read: typeof read$1;
            write: typeof write$1;
        };
        put: typeof put;
        reverse: typeof reverse;
        setBits: typeof setBits;
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
    math: {
        pi: typeof pi;
    };
    number: {
        baseConvert: typeof baseConvert;
        format: {
            thousandsSep: typeof thousandsSep;
        };
        randomRange: typeof randomRange;
    };
    other: {
        angleConvert: typeof angleConvert;
        bmi: typeof bmi;
        getTypeName: typeof getTypeName;
        searchPatternCheck: typeof searchPatternCheck;
        temperatureConvert: typeof temperatueConvert;
    };
    string: {
        camelize: typeof camelize;
        hyphenate: (str: string) => string;
    };
    tree: {
        flat: typeof flat;
    };
    validate: {
        isEmpty: typeof isEmpty;
    };
    worker: {
        create: typeof create;
        thread: typeof thread;
    };
};

export { Allbox as default };
