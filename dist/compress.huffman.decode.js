import getTypeName from './common.get-type-name.js';
import get from './bit-kit.get.js';
import buildTable from './compress.huffman.build-table.js';
import buildTrieFromTable from './compress.huffman.build-trie-from-table.js';

/**
 * decode
 * @param {Uint8Array} buf
 * @returns {Uint8Array}
 */
function decode(buf) {
    if (getTypeName(buf) !== 'Uint8Array') {
        throw new Error('Huffman.decode 的参数需要是 Uint8Array');
    }
    const read = get;
    // 前两个字节是编码表字节长度
    const tableLength = (buf[0] << 8) + buf[1];
    // 构建哈夫曼树
    const trie = buildTrieFromTable(buf.slice(2, tableLength + 2), undefined, read);
    // 生成编码表
    const table = buildTable(trie);
    // 编码表值(code_bitLength)为 key， key 为值，方便解码时快速查询
    const reservedTable = {};
    for (let i = 0, len = table.length; i < len; i++) {
        if (table[i] !== undefined) {
            reservedTable[`${table[i].code}_${table[i].bitLength}`] = i;
        }
    }
    // 解码
    // 原数据字节长度--数据前 4 个字节
    let dataLength = 0;
    for (let i = 0; i < 4; i++) {
        if (dataLength) {
            dataLength <<= 8;
        }
        dataLength += buf[tableLength + 2 + i];
    }
    // 原数据长度的二进制流
    const rawData = new Uint8Array(dataLength);
    // 压缩数据解码
    const compressedBuf = buf.slice(tableLength + 6);
    let decodeLength = 0;
    let bitPos = 0;
    let currBitLength = 0;
    let currNum = undefined;
    let detectiveCode = null;
    while (decodeLength < dataLength) {
        currBitLength = 0;
        currNum = undefined;
        // 查找原数据
        while (currNum === undefined) {
            currBitLength++;
            detectiveCode = read(compressedBuf, bitPos, currBitLength);
            currNum = reservedTable[`${detectiveCode}_${currBitLength}`];
            if (currBitLength > 256) {
                throw new Error('解压错误');
            }
        }
        rawData[decodeLength] = currNum;
        bitPos += currBitLength;
        decodeLength++;
    }
    return rawData;
}

export { decode as default };
