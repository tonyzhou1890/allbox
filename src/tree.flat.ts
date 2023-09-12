import { StringKeyObjType } from './types'

/**
 * @desc 平铺树状数组，可深度或者广度遍历
 * @param {*[]} array 树状数组
 * @param {boolean} deep 是否深度遍历，默认 false--广度遍历
 * @param {string} children 子节点属性，默认 children
 * @returns {Node[]}
 */
function flat<T extends StringKeyObjType> (
  array: T[],
  deep: boolean = false,
  children: string = 'children'
): T[] {
  const res: T[] = []
  const temp = [...array]

  if (deep) {
    f2(array)
  } else {
    f1()
  }

  return res

  /**
   * 广度遍历
   */
  function f1 () {
    while (temp.length) {
      const node = temp.shift() as T
      res.push(node)
      if (Array.isArray(node[children as string])) {
        temp.push(...node[children])
      }
    }
  }

  /**
   * 深度遍历
   */
  function f2 (arr: T[]) {
    for (let i = 0, len = arr.length; i < len; i++) {
      res.push(arr[i])
      if (Array.isArray(arr[i][children])) {
        f2(arr[i][children])
      }
    }
  }
}

export default flat
