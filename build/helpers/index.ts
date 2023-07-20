interface StringKeyObjType {
  [x: string]: any
}

const camelizeRE = /-(\w)/g
/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * @param {any} value
 * @returns {string}
 * @desc get type name of value
 * @example
 * getTypeName(1) // 'Number'
 * @example
 * getTypeName(new Date()) // 'Date'
 */
function getTypeName(value: any): string {
  let type = Object.prototype.toString.call(value).slice(8, -1)
  if (type === 'Object') {
    type = value.constructor.name
  }
  return type
}

/**
 *
 * @param arr
 * @returns
 */
function genObjectFromFilenameStrArr(arr: Array<string>): StringKeyObjType {
  const obj: StringKeyObjType = {}
  arr.map(item => {
    const path = item.split('.')
    let curObj = obj
    for (let i = 0; i < path.length - 1; i++) {
      const key = camelize(path[i])
      if (!curObj[key]) {
        curObj[key] = {}
      }
      curObj = curObj[key]
    }
    curObj[camelize(path[path.length - 1])] = [
      ...path.slice(0, -1),
      camelize(path[path.length - 1]),
    ].join('_')
  })
  return obj
}

function genStrFromObj(obj: StringKeyObjType) {
  const str = inner(obj).join('\r\n').slice(0, -1)
  return str

  function inner(obj: StringKeyObjType) {
    let arr: string[] = []
    Object.keys(obj).forEach(key => {
      if (getTypeName(obj[key]) === 'Object') {
        const temp = inner(obj[key])
        temp[0] = `${key}: ${temp[0]}`
        arr.push(...temp)
      } else if (getTypeName(obj[key] === 'String')) {
        arr.push(`${key}: ${obj[key]},`)
      }
    })
    arr = arr.map((item: string) => '  ' + item)
    arr.unshift('{')
    arr.push('},')
    return arr
  }
}

module.exports = {
  camelize,
  getTypeName,
  genObjectFromFilenameStrArr,
  genStrFromObj,
}
