import { StringKeyObjType } from './types';
/**
 * @desc 平铺树状数组，可深度或者广度遍历
 * @param {*[]} array 树状数组
 * @param {boolean} deep 是否深度遍历，默认 false--广度遍历
 * @param {string} children 子节点属性，默认 children
 * @returns {Node[]}
 */
declare function flat<T extends StringKeyObjType>(array: T[], deep?: boolean, children?: string): T[];
export default flat;
