import thousandsSep from '../src/number.format.thousands-sep'

describe('function number.format.thousands-sep: ', () => {
  test('thousands-sep', () => {
    expect(thousandsSep(0)).toBe('0')
    expect(thousandsSep(1)).toBe('1')
    expect(thousandsSep(111)).toBe('111')
    expect(thousandsSep(1234)).toBe('1,234')
    expect(thousandsSep(0.1234)).toBe('0.1234')
    expect(thousandsSep(1234.1234)).toBe('1,234.1234')
  })
})
