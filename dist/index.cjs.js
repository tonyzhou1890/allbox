'use strict';

/**
 * check if elements of the arr is all different
 * @param {any[]} arr
 */
function isUnique(arr) {
    return arr.length === [...new Set(arr)].length;
}

/**
 * @param {any[]} array
 * @param {number} aIndex
 * @param {number} bIndex
 * @returns any[]
 */
function swap(array, aIndex, bIndex) {
    const temp = array[aIndex];
    array[aIndex] = array[bIndex];
    array[bIndex] = temp;
    return array;
}

/**
 * @param {any} value
 * @returns string
 * @desc get type name of value
 * @example
 * getTypeName(1) // 'Number'
 * @example
 * getTypeName(new Date()) // 'Date'
 */
function getTypeName(value) {
    let type = Object.prototype.toString.call(value).slice(8, -1);
    if (type === 'Object') {
        type = value.constructor.name;
    }
    return type;
}

/**
 * sub numbers
 * @param {any[]} array
 * @param {number} [startIndex] start index of the part that needs to process, default is 0
 * @param {number} [endIndex] end index of the part that needs to process, not include self, default is the length of array
 * @returns any[]
 */
function randomSwap(array, startIndex, endIndex) {
    if (getTypeName(array) !== 'Array' || array.length < 2) {
        return array;
    }
    if (getTypeName(startIndex) !== 'Number' || startIndex < 0) {
        startIndex = 0;
    }
    if (getTypeName(endIndex) !== 'Number' || endIndex > array.length) {
        endIndex = array.length;
    }
    for (let i = 0, len = endIndex - startIndex; i < len; i++) {
        const aIndex = (Math.random() * len + startIndex) >> 0;
        const bIndex = (Math.random() * len + startIndex) >> 0;
        swap(array, aIndex, bIndex);
    }
    return array;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} float number between min and max(not included)
 */
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {vector2}
 */
function randomVector2(min, max) {
    if (min === max) {
        return [min, max];
    }
    if (min > max) {
        const temp = max;
        max = min;
        min = temp;
    }
    const vec = [0, 0];
    vec[0] = randomRange(min, max);
    vec[1] = randomRange(min, max);
    return vec;
}

/**
 * @param {number} num 1 byte
 * @param {number} bitIdx bit index(from right to left)
 * @param {number} length required bits length
 * @returns {number}
 */
function getBits(num, bitIdx, length) {
    return (num >> bitIdx) & ((1 << length) - 1);
}

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} [bitLength]
 * @returns {number} result number
 * @desc read number from Uint8Array with specific bit offset and bit length
 */
function read$1(buf, bitOffset, bitLength) {
    bitLength = bitLength ?? 1;
    let byteIndex = (bitOffset / 8) >> 0;
    // from right to left inside a byte
    let bitIndex = bitOffset % 8;
    let result = 0;
    while (bitLength) {
        const readBits = 8 - bitIndex > bitLength ? bitLength : 8 - bitIndex;
        result += getBits(buf[byteIndex], bitIndex, readBits);
        // shift bitIndex
        bitIndex += readBits;
        bitOffset += readBits;
        // if current byte has been used up, shift byteIndex
        if (bitIndex === 8) {
            byteIndex++;
            bitIndex = 0;
        }
        // remaining bit length
        bitLength -= readBits;
        result <<= bitLength;
    }
    return result;
}

/**
 * @param {number} targetNum 1 byte
 * @param {number} bitIdx bit index (from right to left)
 * @param {number} length required bits length
 * @param {number} sourceNum
 * @returns
 */
function setBits(targetNum, bitIdx, length, sourceNum) {
    return ((((1 << length) - 1) & sourceNum) << bitIdx) | targetNum;
}

/**
 * @param {number} num
 * @returns {number}
 * @desc Gets the length of the binary representation of the number
 */
function getBitLengthOfNumber(num) {
    let exp = 1;
    while (num > 2 ** exp) {
        exp++;
    }
    return exp;
    // maybe next line is better?
    // return num.toString(2).length
}

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset
 */
function write$1(buf, bitOffset, num, bitLength) {
    bitLength = bitLength ?? getBitLengthOfNumber(num);
    let byteIndex = (bitOffset / 8) >> 0;
    // from right to left inside a byte
    let bitIndex = bitOffset % 8;
    while (bitLength) {
        const writeBits = 8 - bitIndex > bitLength ? bitLength : 8 - bitIndex;
        // remaining bit length
        bitLength -= writeBits;
        buf[byteIndex] = setBits(buf[byteIndex], bitIndex, writeBits, num >> bitLength);
        // shift bitIndex
        bitIndex += writeBits;
        bitOffset += writeBits;
        // if current byte has been used up, shift byteIndex
        if (bitIndex === 8) {
            byteIndex++;
            bitIndex = 0;
        }
    }
    return bitOffset;
}

/**
 * 按位数读数据
 * @param {Uint8Array} buf
 * @param {number} bitOffset 开始位
 * @param {number} [bitLength] 读取的位数
 * @return {number}
 * @desc read data in Uint8Array. bit index from left to right in byte.
 **/
function get(buf, bitOffset, bitLength) {
    bitLength = bitLength ?? 1;
    let startByte = (bitOffset / 8) >> 0;
    let leftBits = bitLength;
    let startBit = bitOffset % 8;
    let res = 0;
    let isFirst = true;
    while (leftBits > 0) {
        // 当前字节剩余位数
        const currByteNotUsedBits = 8 - startBit;
        // 当前字节取值位数
        const readBits = leftBits > currByteNotUsedBits ? currByteNotUsedBits : leftBits;
        // 如果不是第一次取值，需要把已经取的值左移
        if (!isFirst) {
            res = res << readBits;
        }
        isFirst = false;
        res += (buf[startByte] >> (currByteNotUsedBits - readBits)) & ((1 << readBits) - 1);
        // 剩余需要字节
        leftBits -= readBits;
        startBit = 0;
        startByte++;
    }
    return res;
}

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} [bitLength]
 * @returns {number} result number
 * @desc read number from Uint8Array with specific bit offset and bit length
 */
function read(buf, bitOffset, bitLength) {
    bitLength = bitLength ?? 1;
    const rawBitLength = bitLength;
    let byteIndex = (bitOffset / 8) >> 0;
    // from right to left inside a byte
    let bitIndex = bitOffset % 8;
    let result = 0;
    while (bitLength) {
        const readBits = 8 - bitIndex > bitLength ? bitLength : 8 - bitIndex;
        result += getBits(buf[byteIndex], bitIndex, readBits) << (rawBitLength - bitLength);
        // shift bitIndex
        bitIndex += readBits;
        bitOffset += readBits;
        // if current byte has been used up, shift byteIndex
        if (bitIndex === 8) {
            byteIndex++;
            bitIndex = 0;
        }
        // remaining bit length
        bitLength -= readBits;
    }
    return result;
}

/**
 * @param {Uint8Array} buf
 * @param {number} bitOffset
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset
 */
function write(buf, bitOffset, num, bitLength) {
    bitLength = bitLength ?? getBitLengthOfNumber(num);
    let byteIndex = (bitOffset / 8) >> 0;
    // from right to left inside a byte
    let bitIndex = bitOffset % 8;
    while (bitLength) {
        const writeBits = 8 - bitIndex > bitLength ? bitLength : 8 - bitIndex;
        // remaining bit length
        buf[byteIndex] = setBits(buf[byteIndex], bitIndex, writeBits, num);
        num >>= writeBits;
        bitLength -= writeBits;
        // shift bitIndex
        bitIndex += writeBits;
        bitOffset += writeBits;
        // if current byte has been used up, shift byteIndex
        if (bitIndex === 8) {
            byteIndex++;
            bitIndex = 0;
        }
    }
    return bitOffset;
}

/**
 * 按位数存数据
 * @param {Uint8Array} buf
 * @param {number} bitOffset 开始位
 * @param {number} num
 * @param {number} [bitLength] the bit length of num, fn will get actual bit length of num if bitLength is not provided.
 * @returns {number} the new bit offset
 * @desc write number into Uint8Array on bit offset. bit index from left to right inside a byte
 **/
function put(buf, bitOffset, num, bitLength) {
    bitLength = bitLength ?? getBitLengthOfNumber(num);
    const length = bitLength;
    let startByte = (bitOffset / 8) >> 0;
    let startBit = bitOffset % 8;
    while (bitLength) {
        // 当前字节剩余位数
        const currByteNotUsedBits = 8 - startBit;
        // 当前字节需要填充位数
        const fillBits = currByteNotUsedBits >= bitLength ? bitLength : currByteNotUsedBits;
        // 数字剩余位数
        bitLength -= fillBits;
        // 取 num 的指定位数的值
        const partNum = (num >> bitLength) & ((1 << fillBits) - 1);
        // 存入当前字节
        buf[startByte] = buf[startByte] | (partNum << (currByteNotUsedBits - fillBits));
        startBit = 0;
        startByte++;
    }
    return bitOffset + length;
}

/**
 * @param {number} num
 * @param {number} bitLength
 * @returns {number}
 * @desc reverse binary bit. example: 0b0101 -> 0b1010
 */
function reverse(num, bitLength) {
    let res = 0;
    while (bitLength) {
        res = (res << 1) + (num & 1);
        num >>= 1;
        bitLength--;
    }
    return res;
}

/**
 * @name angleConvert
 * @param {number} value
 * @param {string} sourceType angle type. D(egree)、R(adian)
 * @param {string} targetType like sourceType
 */
function angleConvert(value, sourceType, targetType) {
    let target = value;
    const convertPair = sourceType + targetType;
    switch (convertPair) {
        case 'DR':
            target = (value / 180) * Math.PI;
            break;
        case 'RD':
            target = (value / Math.PI) * 180;
            break;
    }
    return target;
}

/**
 * @param height unit: cm
 * @param weight unit: kg
 */
function bmi(height, weight) {
    return weight / ((height * height) / 10000);
}

/**
 * @name temperatueConvert
 * @param {number} value
 * @param {string} sourceType temperature type. C(elsius)、F(ahrenheit)、K(elvin)
 * @param {string} targetType like sourceType
 */
function temperatueConvert(value, sourceType, targetType) {
    let target = value;
    const convertPair = sourceType + targetType;
    switch (convertPair) {
        case 'CF':
            target = value * 1.8 + 32;
            break;
        case 'CK':
            target = value + 273.15;
            break;
        case 'FC':
            target = (value - 32) / 1.8;
            break;
        case 'FK':
            target = ((value + 459.67) * 5) / 9;
            break;
        case 'KC':
            target = value - 273.15;
            break;
        case 'KF':
            target = value * 1.8 - 459.67;
            break;
    }
    return target;
}

/**
 * 生成编码表
 * @param {Trie} trie
 * @returns {CodeNode[]}
 * 返回一个 256 长度的数组，下标为原数字，元素为对应的编码{ code: number, bitLength: number }——bitLength 用来避免 0b01 变成和 0b1。这是为了方便编码的时候直接通过下标查表。
 **/
function buildTable(trie) {
    const arr = new Array(256);
    getChildTrie(trie, 0, arr, 0);
    return arr;
    function getChildTrie(trie, code, arr, bitLength) {
        if (!trie.left && !trie.right) {
            arr[trie.num] = {
                code,
                bitLength,
            };
            return;
        }
        if (trie.left) {
            getChildTrie(trie.left, code << 1, arr, bitLength + 1);
        }
        if (trie.right) {
            getChildTrie(trie.right, (code << 1) + 1, arr, bitLength + 1);
        }
    }
}

/**
 * 根据编码表二进制逆向构建哈夫曼树
 * @param {Uint8Array} buf
 * @param {number} [startBit] 开始位
 * @param {typeof read} [rFn]
 * @returns {Trie}
 **/
function buildTrieFromTable(buf, startBit = 0, rFn = get) {
    return build(buf);
    function build(buf) {
        const node = {};
        const flag = rFn(buf, startBit);
        startBit++;
        // flag有值，代表是字符节点——叶子节点
        if (flag) {
            node.num = rFn(buf, startBit, 8);
            startBit += 8;
            return node;
        }
        // 左子树
        node.left = build(buf);
        // 右子树
        node.right = build(buf);
        return node;
    }
}

/**
 * 构建哈夫曼树
 * @param {Trie[]} arr
 * @returns {Trie}
 **/
function buildTrie(arr) {
    while (arr.length > 1) {
        // 升序排序
        arr.sort((a, b) => a.freq - b.freq);
        const node = {};
        node.left = arr.shift();
        node.right = arr.shift();
        // 权值相等，则深度较小的作为左子树
        if (node.left.freq === node.left.freq) {
            if (node.left.depth !== undefined &&
                node.right.depth !== undefined &&
                node.left.depth > node.right.depth) {
                const temp = node.left;
                node.left = node.right;
                node.right = temp;
            }
        }
        node.freq = node.left.freq + node.right.freq;
        node.depth = Math.max(node.left.depth || 0, node.right.depth || 0) + 1;
        arr.push(node);
    }
    return arr[0];
}

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

/**
 * 保存编码表
 * @param {Trie} trie
 * @param {typeof write} [wFn]
 * @returns Uint8Array
 **/
function saveTable(trie, wFn = put) {
    // 前两个字节标识编码表字节长度
    const buf = new Uint8Array(514);
    let currBit = 16;
    recursive(trie, buf);
    // 编码表长度
    const length = Math.ceil(currBit / 8) - 2;
    buf[0] = length >> 8;
    buf[1] = length & 0xff;
    // 裁切
    return buf.slice(0, length + 2);
    function recursive(trie, buf) {
        // 非字符节点，保存 0
        if (trie.num === undefined) {
            currBit = wFn(buf, currBit, 0, 1);
        }
        else {
            // 字符节点，保存 1 和字符(固定 8 位)
            currBit = wFn(buf, currBit, 1, 1);
            currBit = wFn(buf, currBit, trie.num, 8);
            return;
        }
        // 左子树
        if (trie.left) {
            recursive(trie.left, buf);
        }
        // 右子树
        if (trie.right) {
            recursive(trie.right, buf);
        }
    }
}

/**
 * 压缩
 * @param {Uint8Array} buf
 * @return {Uint8Array}
 **/
function encode(buf) {
    if (getTypeName(buf) !== 'Uint8Array') {
        throw new Error('Huffman.encode 的参数需要是 Uint8Array');
    }
    const write = put;
    // 频率统计。
    // 统计一个字节共 256 种数值分别出现的次数
    let arr = new Array(256).fill(0);
    for (let i = 0, len = buf.length; i < len; i++) {
        arr[buf[i]]++;
    }
    arr = arr
        .map((freq, num) => {
        return {
            num,
            freq,
        };
    })
        .filter(v => v.freq);
    // 构建哈夫曼树
    const trie = buildTrie(arr);
    // 生成编码表
    const table = buildTable(trie);
    // 编码--前面 4 个字节标识原数据字节长度
    let encodeBuf = new Uint8Array(buf.length + 4);
    for (let i = 0; i < 4; i++) {
        encodeBuf[i] = (buf.length >> ((3 - i) * 8)) & 0xff;
    }
    let currBit = 32;
    for (let i = 0, len = buf.length; i < len; i++) {
        const bitLength = table[buf[i]].bitLength;
        if (currBit + bitLength > encodeBuf.length * 8) {
            const newBuf = new Uint8Array(encodeBuf.length + 1000);
            newBuf.set(encodeBuf);
            encodeBuf = newBuf;
        }
        currBit = write(encodeBuf, currBit, table[buf[i]].code, bitLength);
    }
    // encodeBuf 裁切
    encodeBuf = encodeBuf.slice(0, Math.ceil(currBit / 8));
    // 保存编码表
    const tableBuf = saveTable(trie, write);
    // 合并数据
    const finalData = new Uint8Array(encodeBuf.length + tableBuf.length);
    finalData.set(tableBuf);
    finalData.set(encodeBuf, tableBuf.length);
    return finalData;
}

/**
 *
 * @param {vector2[]} vectors
 * @param {rectPositionArr} sourceBound [leftTop: vector2, rightBottom: vector2]
 * @param {rectPositionArr} targetBound
 * @returns {vector2[]}
 */
function vector2Mapping(vectors, sourceBound, targetBound) {
    const sourceWidth = sourceBound[1][0] - sourceBound[0][0];
    const sourceHeight = sourceBound[1][1] - sourceBound[0][1];
    const targetWidth = targetBound[1][0] - targetBound[0][0];
    const targetHeight = targetBound[1][1] - targetBound[0][1];
    for (let i = 0, len = vectors.length; i < len; i++) {
        const vector = vectors[i];
        // first. transform vector to the unit vector relative to the upper left corner
        vector[0] = (vector[0] - sourceBound[0][0]) / sourceWidth;
        vector[1] = (vector[1] - sourceBound[0][1]) / sourceHeight;
        // second. transform unit vector to target vector
        vector[0] = vector[0] * targetWidth + targetBound[0][0];
        vector[1] = vector[1] * targetHeight + targetBound[0][1];
    }
    return vectors;
}

/**
 *
 * @param {rectPositionArr} bound
 * @param {number} count
 * @returns
 */
function randomScatter(bound, count) {
    count = Math.max(count, 0);
    const list = [];
    for (let i = 0; i < count; i++) {
        list.push(randomVector2(0, 1));
    }
    vector2Mapping(list, [
        [0, 0],
        [1, 1],
    ], bound);
    return list;
}

/**
 * @param {string} source
 * @param {string[]} sourceTable base table, like [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * @param {string[]} targetTable base table, like [0, 1]
 * @description (a1 * R^n + a2 * R^(n - 1) + …… am * R^0).(b1 * R^-1 + b2 * R^-2 ……).
 * But, i can't guarantee the correctness of the decimal part.
 */
function baseConvert(source, sourceTable, targetTable, precise = 32) {
    // check params
    if (!source) {
        return '';
    }
    if (!isUnique(sourceTable)) {
        throw new Error('There are duplicated elements in sourceTable');
    }
    if (!isUnique(targetTable)) {
        throw new Error('There are duplicated elements in targetTable');
    }
    const reg = new RegExp(`^[${sourceTable.join('')}.]+$`);
    if (!reg.test(source)) {
        throw new Error('source does not match with sourceTable');
    }
    if (source.split('').filter(ch => ch === '.').length > 1) {
        throw new Error('There are too many dots in source string');
    }
    // convert
    let target = '';
    const sourceArr = source.split('.').filter(v => v);
    if (!sourceArr[0] || !sourceArr[0].length)
        return target;
    // source base map
    const sourceBaseMap = {};
    const sourceTableArr = [...sourceTable];
    // use BigInt
    for (let i = 0; i < sourceTableArr.length; i++) {
        sourceBaseMap[sourceTableArr[i]] = BigInt(i);
    }
    // integer
    const sourceIntArr = sourceArr[0];
    const targetIntArr = [];
    const sourceBase = BigInt(sourceTable.length);
    const targetBase = BigInt(targetTable.length);
    let sourceInt = 0n;
    let sBase = 1n;
    for (let i = sourceIntArr.length - 1; i >= 0; i--) {
        sourceInt += sourceBaseMap[sourceIntArr[i]] * sBase;
        sBase *= sourceBase;
    }
    while (sourceInt !== 0n) {
        targetIntArr.push(targetTable[Number(sourceInt % targetBase)]);
        sourceInt /= targetBase;
    }
    target = targetIntArr.reverse().join('');
    // if target is empty string, set it to be 'zero' value
    if (!target) {
        target = targetTable[0];
    }
    /**
     * decimal
     * use fraction to represent decimal:
     *   a1/(base^1) + a2/(base^2) …… + an/(base^n)
     * fraction -> decimal
     *   (fraction) * base --> integer part
     *   (rest fraction of last calculation) * base -> integer part
     *   ……
     */
    if (sourceArr[1]) {
        const sourceDecArr = sourceArr[1];
        const targetDecArr = [];
        // use array to represent decimal value, [numerator, denominator]
        const decArr = [0n, 1n];
        for (let i = 0; i < sourceDecArr.length; i++) {
            decArr[1] *= sourceBase;
        }
        let lastDenominator = 1n;
        for (let i = 0; i < sourceDecArr.length; i++) {
            lastDenominator *= sourceBase;
            decArr[0] += (decArr[1] / lastDenominator) * sourceBaseMap[sourceDecArr[i]];
        }
        while (targetDecArr.length < precise) {
            if (decArr[0] === 0n) {
                break;
            }
            decArr[0] *= targetBase;
            targetDecArr.push(targetTable[Number(decArr[0] / decArr[1])]);
            decArr[0] %= decArr[1];
        }
        // remove tail zero
        while (targetDecArr.length && targetDecArr[targetDecArr.length - 1] === targetTable[0]) {
            targetDecArr.pop();
        }
        if (targetDecArr.length) {
            target = `${target}.${targetDecArr.join('')}`;
        }
    }
    return target;
}

/**
 * @param {number} num
 * @returns
 */
function thousandsSep(num) {
    const arr = num.toString().split('.');
    return [
        arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, function ($0, $1) {
            return $1 + ',';
        }),
        arr[1],
    ]
        .filter(v => v)
        .join('.');
}

const camelizeRE = /-(\w)/g;
/**
 * @param {string} str
 * @returns string
 */
function camelize(str) {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
}

const hyphenateRE = /\B([A-Z])/g;
/**
 * @param {string} str
 * @returns string
 */
const hyphenate = (str) => {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
};

/**
 * @desc 平铺树状数组，可深度或者广度遍历
 * @param {*[]} array 树状数组
 * @param {boolean} deep 是否深度遍历，默认 false--广度遍历
 * @param {string} children 子节点属性，默认 children
 * @returns {Node[]}
 */
function flat(array, deep = false, children = 'children') {
    const res = [];
    const temp = [...array];
    if (deep) {
        f2(array);
    }
    else {
        f1();
    }
    return res;
    /**
     * 广度遍历
     */
    function f1() {
        while (temp.length) {
            const node = temp.shift();
            res.push(node);
            if (Array.isArray(node[children])) {
                temp.push(...node[children]);
            }
        }
    }
    /**
     * 深度遍历
     */
    function f2(arr) {
        for (let i = 0, len = arr.length; i < len; i++) {
            res.push(arr[i]);
            if (Array.isArray(arr[i][children])) {
                f2(arr[i][children]);
            }
        }
    }
}

/**
 * @param {any} val
 * @returns
 */
function isEmpty(val) {
    return val === undefined || val === null || val === '';
}

function create(w) {
    const type = getTypeName(w);
    if (type !== 'String' && type !== 'Function') {
        throw new Error('worker 参数类型错误');
    }
    const workerNum = Math.max(window.navigator.hardwareConcurrency - 1, 1); // 线程数量
    const quene = new Map();
    const waiting = [];
    const workers = new Array(workerNum).fill(null).map((_, index) => {
        return {
            index,
            worker: type === 'String' ? new Worker(w) : w(),
            idle: true, // 是否空闲
        };
    });
    workers.map(item => {
        item.worker.addEventListener('message', e => {
            if (!e.data || !e.data._sign) {
                console.error('worker 返回数据错误');
                quene.get(e.data._sign).reject('worker 返回数据错误');
            }
            else {
                quene.get(e.data._sign).resolve(e.data.result);
                quene.delete(e.data._sign);
                item.idle = true;
                // 尝试接受新任务
                assignJob();
            }
        });
    });
    /**
     * 将等待队列中的任务加入空闲线程
     */
    function assignJob() {
        let idleWorker = null;
        let waitingJob = null;
        if (waiting.length) {
            idleWorker = workers.find(item => item.idle);
            if (idleWorker) {
                idleWorker.idle = false;
                waitingJob = waiting.shift();
                quene.set(waitingJob._sign, waitingJob.p);
                idleWorker.worker.postMessage({
                    ...waitingJob.job,
                    _sign: waitingJob._sign,
                });
            }
        }
    }
    const fns = new Proxy({}, {
        get(target, prop) {
            return function (...rest) {
                return new Promise((resolve, reject) => {
                    const _sign = Date.now() * Math.random();
                    waiting.push({
                        _sign,
                        job: {
                            action: prop,
                            param: rest,
                        },
                        p: { resolve, reject },
                    });
                    // 分配线程
                    assignJob();
                });
            };
        },
    });
    return fns;
}

// worker 收到信息并执行相关操作
function thread(utils) {
    return function (e) {
        const { action, param = [], _sign } = e.data;
        if (typeof utils[action] === 'function') {
            const res = {
                action,
                result: utils[action](...param),
                _sign,
            };
            postMessage(res);
        }
        else {
            console.log(`指定操作${action}不存在`);
        }
    };
}

// This file is generated by build/prebuild.
const Allbox = {
    array: {
        isUnique: isUnique,
        randomSwap: randomSwap,
        randomVector2: randomVector2,
        swap: swap,
    },
    bitKit: {
        bigEndian: {
            read: read$1,
            write: write$1,
        },
        getBitLengthOfNumber: getBitLengthOfNumber,
        getBits: getBits,
        get: get,
        littleEndian: {
            read: read,
            write: write,
        },
        put: put,
        reverse: reverse,
        setBits: setBits,
    },
    common: {
        angleConvert: angleConvert,
        bmi: bmi,
        getTypeName: getTypeName,
        temperatureConvert: temperatueConvert,
    },
    compress: {
        huffman: {
            buildTable: buildTable,
            buildTrieFromTable: buildTrieFromTable,
            buildTrie: buildTrie,
            decode: decode,
            encode: encode,
            saveTable: saveTable,
        },
    },
    graphic: {
        randomScatter: randomScatter,
        vector2Mapping: vector2Mapping,
    },
    number: {
        baseConvert: baseConvert,
        format: {
            thousandsSep: thousandsSep,
        },
        randomRange: randomRange,
    },
    string: {
        camelize: camelize,
        hyphenate: hyphenate,
    },
    tree: {
        flat: flat,
    },
    validate: {
        isEmpty: isEmpty,
    },
    worker: {
        create: create,
        thread: thread,
    },
};

module.exports = Allbox;
