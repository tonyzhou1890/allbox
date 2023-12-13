import pi from '../src/math.pi'

describe('function math.pi: ', () => {
  test('math pi: 0', () => {
    expect(pi(0)).toBe('3')
  })

  test('math pi: 1', () => {
    expect(pi(1)).toBe('3.1')
  })

  test('math pi: 32', () => {
    expect(pi()).toBe('3.14159265358979323846264338327950')
  })
})
