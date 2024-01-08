export interface SearchPatternCheckResultValue {
  pattern?: SearchPattern
  field: string
  rawValue: string
  values: string[]
  valid: boolean
  step?: string
  // 当有预设选项的时候，这个表示当前可用选项。已经输入的选项不在此列。
  options?: string[]
  presetedValues?: string[]
}

export interface SearchPatternCheckResult {
  valid: boolean
  patterns: SearchPatternCheckResultValue[]
  pairs?: {
    [x: string]: string | string[]
  }
  /**
   * @desc 错误信息，表示第一个错误的模式
   */
  errorPattern?: SearchPatternCheckResultValue
  /**
   * @desc 当前输入阶段，field/value
   */
  step: string
  /**
   * @desc 当前输入建议项
   */
  options: string[]
  /**
   * 是否可选--field 可选表示有空模式，可在开头自由输入
   */
  optional: boolean
}

export interface SearchPattern {
  /**
   * @desc 如果 field 为空，表示空模式（字段）
   */
  field?: string
  values?: string[]
  /**
   * @desc 值分隔符，当可以存在多个值的时候，以此作为分隔符。默认 '-'
   */
  seperator?: string
  multiple?: boolean
  // validate?: (values: string[]) => { valid: boolean; msg: string }
}

export interface SearchPatternCfg {
  /**
   * @desc 模式数量限制，默认一个，0 表示无限制
   */
  // max?: number
  patterns: SearchPattern[]
  // validate?: (patterns: { pattern: SearchPattern; values: string[] }) => {
  //   valid: boolean
  //   msg: string
  // }
}

const steps = {
  field: 'field',
  value: 'value',
}

/**
 * @name patternCompile
 * @param {SearchPatternCfg} cfg
 * @param {string} text 输入字符串
 * @param {boolean} final 是否输入结束
 * @desc 模式检查，返回模式检查结果以及输入可选项
 * ```markdown
 * 检查步骤
 * 1. 已完成模式（final === true 或者非最后一个模式）
 *   1.1 非 / 开头--字符串第一个字符
 *     1.1.1 允许空模式--匹配
 *     1.1.2 不允许空模式--不匹配
 *   1.2 / 开头
 *     1.2.1 模式开始，截止到第一个 : 为 field，尝试匹配
 *     1.2.2 : 后面为值，连字符拆分，有指定值范围则尝试匹配
 * 2. 输入中模式（final === false 并且最后一个模式）
 *   2.1 非 / 开头--字符串第一个字符
 *     2.1.1 允许空模式--匹配
 *     2.1.2 不允许空模式--不匹配
 *   2.2 / 开头
 *     2.2.1 模式开始，没有 :，用 startsWith 匹配 field，有 : 则完全匹配
 *     2.2.2 : 后的值，连字符拆分，如果有指定范围，用 startsWith 匹配，否则直接通过
 * ```
 */
function searchPatternCheck (cfg: SearchPatternCfg, text: string, final = false) {
  text = text.trimStart()
  const res: SearchPatternCheckResult = {
    valid: true,
    patterns: [],
    step: '',
    options: [],
    optional: false,
  }
  // 如果左侧不是 / 开头，说明空模式开头，补全模式标识
  if (text[0] !== '/') {
    if (text[0] !== ':') {
      text = ':' + text
    }
  } else {
    // 去掉开头的 /，因为下面根据 / split 的时候前面会多一个空字符元素
    text = text.slice(1)
  }
  const patternTextArr = text.split('/')
  // 检测到的模式
  const patterns: SearchPatternCheckResultValue[] = []
  // 解析模式
  for (let i = 0; i < patternTextArr.length; i++) {
    // 是否在输入中--未完成，且是输入字符串中最后一个模式
    const typing = !final && i === patternTextArr.length - 1
    const pattern = patternParse(cfg, patternTextArr[i], typing)
    patterns.push(pattern)
  }
  // 校验
  res.patterns = patterns
  if (res.patterns.length) {
    patternValidate(res, final)
  }
  console.log(res)
  return res
}

export default searchPatternCheck

/**
 * 解析模式
 * @param cfg
 * @param text
 * @param typing
 */
function patternParse (
  cfg: SearchPatternCfg,
  text: string,
  typing: boolean
): SearchPatternCheckResultValue {
  const segments = text.split(':')
  const pattern: SearchPatternCheckResultValue = {
    field: '',
    rawValue: '',
    values: [],
    valid: true,
  }
  // 解析 field
  const field = parseField(cfg, segments[0], typing && segments.length === 1)
  Object.assign(pattern, field)
  // 解析 values
  pattern.rawValue = segments.slice(1).join(':')
  // 输入错误，或者输入中，结束解析
  if (!field.valid || field.step) {
    return pattern
  }

  if (field.pattern) {
    const values = parseValues(pattern.pattern, pattern.rawValue, typing)
    Object.assign(pattern, values)
  }
  return pattern
}

function parseField (cfg: SearchPatternCfg, fieldText: string, typing: boolean) {
  const res: {
    valid: boolean
    field: string
    pattern?: SearchPattern
    step?: string
    options?: string[]
    optional?: boolean
  } = {
    valid: true,
    field: fieldText,
  }
  // 输入中给出输入提示
  if (typing) {
    res.step = steps.field
    res.options = cfg.patterns
      ?.filter?.(item => item.field && item.field?.startsWith(fieldText))
      .map(item => item.field as string)
    // 是否可以空模式
    res.optional = !res.field && cfg.patterns.some(item => !item.field)
  } else {
    // 否则找出具体的 pattern
    res.pattern = cfg.patterns.find(item => item.field === fieldText)
    res.valid = !!res.pattern
  }
  return res
}

function parseValues (pattern: SearchPattern | undefined, rawValue: string, typing: boolean) {
  const res: {
    values: string[]
    valid: boolean
    step?: string
    options?: string[]
    optional?: boolean
    multiple?: boolean
    seperator?: string
    presetedValues?: string[]
  } = {
    values: [],
    valid: true,
  }
  res.multiple = pattern?.multiple
  res.seperator = pattern?.seperator || '-'
  res.presetedValues = pattern?.values
  const inputValueList =
    res.multiple && res.seperator && rawValue
      ? rawValue.split(res.seperator)
      : [rawValue].filter(item => item)
  // 如果输入中，不校验有效性，直接筛选提示
  if (typing) {
    res.options = res.presetedValues
    res.optional = !pattern?.values?.length
    res.step = steps.value
  } else {
    // 如果限定了输入，需要校验输入是否有效
    if (res.presetedValues?.length) {
      res.valid = inputValueList.every(item => res.presetedValues?.includes(item))
      if (!res.valid) {
        res.step = steps.value
      } else {
        res.values = inputValueList
      }
    } else {
      res.values = inputValueList
    }
  }

  return res
}

/**
 * 校验模式
 */
function patternValidate (res: SearchPatternCheckResult, final: boolean) {
  // 找出已经存在的错误
  const invalidPattern = res.patterns.find(item => !item.valid)
  if (invalidPattern) {
    res.valid = false
    res.errorPattern = invalidPattern
    return res
  }
  // 如果输入中，设置提示信息
  if (!final) {
    const pattern = res.patterns.slice(-1)[0]
    res.step = pattern.step ?? ''
    res.options = pattern.options ?? []
    return res
  }
  // 检查
  res.patterns.map(item => {
    // 正确的才继续检查
    if (item.valid) {
      // 必填--如果 field 存在，values 必须有值
      if (item.field && !item.values.length) {
        item.valid = false
        item.step = steps.value
      }
    }
    if (!item.valid && res.valid) {
      res.valid = false
      res.errorPattern = item
    }
  })
  // 结果对象
  const pairs: { [x: string]: string | string[] } = {}
  // 如果全部正确，返回
  res.patterns.map(item => {
    const key = item.field || 'default'
    pairs[key] = item.pattern?.multiple ? item.values : item.values[0] ?? ''
  })
  res.pairs = pairs
  return res
}
