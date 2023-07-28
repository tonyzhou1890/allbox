import get from './bit-kit.get.js';

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

export { buildTrieFromTable as default };
