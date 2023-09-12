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

export { flat as default };
