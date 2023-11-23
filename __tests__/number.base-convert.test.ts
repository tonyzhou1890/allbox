import baseConvert from '../src/number.base-convert'

const chs = '0123456789abcdefghijklmnopqrstuvwxyz'
const _2SourceTable = [...chs.slice(0, 2)]
const _8SourceTable = [...chs.slice(0, 8)]
const _10SourceTable = [...chs.slice(0, 10)]
const _16SourceTable = [...chs.slice(0, 16)]
const _36SourceTable = [...chs]

describe('function number.baseConvert: ', () => {
  test('base convert: sourceTable duplicated', () => {
    expect(() => baseConvert('10e', [..._10SourceTable, '1'], _2SourceTable)).toThrow(
      'There are duplicated elements in sourceTable'
    )
  })
  test('base convert: targetTable duplicated', () => {
    expect(() => baseConvert('10e', _10SourceTable, [..._2SourceTable, '1'])).toThrow(
      'There are duplicated elements in targetTable'
    )
  })
  test('base convert: source does not match with sourceTable', () => {
    expect(() => baseConvert('10e', _10SourceTable, _2SourceTable)).toThrow(
      'source does not match with sourceTable'
    )
  })
  test('base convert: too many dots', () => {
    expect(() => baseConvert('10.1.', _10SourceTable, _2SourceTable)).toThrow(
      'There are too many dots in source string'
    )
  })
  test('base convert: empty input, expect empty output', () => {
    expect(baseConvert('', _10SourceTable, _2SourceTable)).toBe('')
  })
  test('base convert: 10 -> 2', () => {
    expect(baseConvert('0', _10SourceTable, _2SourceTable)).toBe('0')
    expect(baseConvert('01', _10SourceTable, _2SourceTable)).toBe('1')
    expect(baseConvert('10', _10SourceTable, _2SourceTable)).toBe('1010')
    expect(baseConvert('112388919', _10SourceTable, _2SourceTable)).toBe(
      '110101100101110101100110111'
    )
    expect(baseConvert('123.456', _10SourceTable, _2SourceTable)).toBe(
      '1111011.0111010010111100011010100111111'
    )
  })
  test('base convert: 2 -> 10', () => {
    expect(baseConvert('0', _2SourceTable, _10SourceTable)).toBe('0')
    expect(baseConvert('01', _2SourceTable, _10SourceTable)).toBe('1')
    expect(baseConvert('10', _2SourceTable, _10SourceTable)).toBe('2')
    expect(baseConvert('110101100101110101100110111', _2SourceTable, _10SourceTable)).toBe(
      '112388919'
    )
    expect(baseConvert('1111011.011101001011', _2SourceTable, _10SourceTable)).toBe(
      '123.455810546875'
    )
  })
  test('base convert: 10 -> 8', () => {
    expect(baseConvert('0', _10SourceTable, _8SourceTable)).toBe('0')
    expect(baseConvert('01', _10SourceTable, _8SourceTable)).toBe('1')
    expect(baseConvert('10', _10SourceTable, _8SourceTable)).toBe('12')
    expect(baseConvert('112388919', _10SourceTable, _8SourceTable)).toBe('654565467')
    expect(baseConvert('123.456', _10SourceTable, _8SourceTable, 15)).toBe('173.351361523757473')
  })
  test('base convert: 8 -> 10', () => {
    expect(baseConvert('0', _8SourceTable, _10SourceTable)).toBe('0')
    expect(baseConvert('01', _8SourceTable, _10SourceTable)).toBe('1')
    expect(baseConvert('12', _8SourceTable, _10SourceTable)).toBe('10')
    expect(baseConvert('654565467', _8SourceTable, _10SourceTable)).toBe('112388919')
    expect(baseConvert('173.351361523757473', _8SourceTable, _10SourceTable, 15)).toBe(
      '123.455999999999988'
    )
  })
  test('base convert: 10 -> 16', () => {
    expect(baseConvert('0', _10SourceTable, _16SourceTable)).toBe('0')
    expect(baseConvert('01', _10SourceTable, _16SourceTable)).toBe('1')
    expect(baseConvert('10', _10SourceTable, _16SourceTable)).toBe('a')
    expect(baseConvert('112388919', _10SourceTable, _16SourceTable)).toBe('6b2eb37')
    expect(baseConvert('123.456', _10SourceTable, _16SourceTable, 11)).toBe('7b.74bc6a7ef9d')
  })
  test('base convert: 16 -> 10', () => {
    expect(baseConvert('0', _16SourceTable, _10SourceTable)).toBe('0')
    expect(baseConvert('01', _16SourceTable, _10SourceTable)).toBe('1')
    expect(baseConvert('a', _16SourceTable, _10SourceTable)).toBe('10')
    expect(baseConvert('6b2eb37', _16SourceTable, _10SourceTable)).toBe('112388919')
    expect(baseConvert('7b.74bc6a7ef9d', _16SourceTable, _10SourceTable)).toBe(
      '123.45599999999996043698047287762165'
    )
  })
  test('base convert: 10 -> 36', () => {
    expect(baseConvert('0', _10SourceTable, _36SourceTable)).toBe('0')
    expect(baseConvert('01', _10SourceTable, _36SourceTable)).toBe('1')
    expect(baseConvert('10', _10SourceTable, _36SourceTable)).toBe('a')
    expect(baseConvert('112388919', _10SourceTable, _36SourceTable)).toBe('1uwvuf')
    expect(baseConvert('123.456', _10SourceTable, _36SourceTable, 8)).toBe('3f.gez4w97r')
  })
  test('base convert: 36 -> 10', () => {
    expect(baseConvert('0', _36SourceTable, _10SourceTable)).toBe('0')
    expect(baseConvert('01', _36SourceTable, _10SourceTable)).toBe('1')
    expect(baseConvert('a', _36SourceTable, _10SourceTable)).toBe('10')
    expect(baseConvert('1uwvuf', _36SourceTable, _10SourceTable)).toBe('112388919')
    expect(baseConvert('3f.gez4w97r', _36SourceTable, _10SourceTable)).toBe(
      '123.45599999999966821569144604533293'
    )
  })
  test('base convert: 2 -> 36', () => {
    expect(baseConvert('0', _2SourceTable, _36SourceTable)).toBe('0')
    expect(baseConvert('01', _2SourceTable, _36SourceTable)).toBe('1')
    expect(baseConvert('10', _2SourceTable, _36SourceTable)).toBe('2')
    expect(baseConvert('1101011011', _2SourceTable, _36SourceTable)).toBe('nv')
    expect(baseConvert('11010.11011', _2SourceTable, _36SourceTable)).toBe('q.udi')
  })
  test('base convert: 36 -> 2', () => {
    expect(baseConvert('0', _36SourceTable, _2SourceTable)).toBe('0')
    expect(baseConvert('01', _36SourceTable, _2SourceTable)).toBe('1')
    expect(baseConvert('2', _36SourceTable, _2SourceTable)).toBe('10')
    expect(baseConvert('nv', _36SourceTable, _2SourceTable)).toBe('1101011011')
    expect(baseConvert('q.udi', _36SourceTable, _2SourceTable)).toBe('11010.11011')
  })
})
