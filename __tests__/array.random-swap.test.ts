import randomSwap from '../src/array.random-swap'
import getTypeName from '../src/common.get-type-name'

describe('function array.random-swap: ', () => {
  test('array random swap: with index', () => {
    const raw = [1, 2, 3, 4, 5, 6]
    const result = randomSwap([...raw], 0, 6)
    expect(result.length).toBe(raw.length)
    expect(result.every(item => getTypeName(item) === 'Number')).toBe(true)
    expect(result).not.toEqual(raw)
  })

  test('array random swap: without index', () => {
    const raw = [1, 2, 3, 4, 5, 6]
    const result = randomSwap([...raw])
    expect(result.length).toBe(raw.length)
    expect(result.every(item => getTypeName(item) === 'Number')).toBe(true)
    expect(result).not.toEqual(raw)
  })

  test('array random swap: with index out boundary', () => {
    const raw = [1, 2, 3, 4, 5, 6]
    const result = randomSwap([...raw], -1, 10)
    expect(result.length).toBe(raw.length)
    expect(result.every(item => getTypeName(item) === 'Number')).toBe(true)
    expect(result).not.toEqual(raw)
  })

  test('array random swap: not array', () => {
    const raw = { a: 1 }
    const copy = { ...raw }
    // @ts-ignore
    const result = randomSwap(copy as Array<number>, -1, 10)
    expect(result).toEqual(raw)
  })

  test('array random swap: not enough elements', () => {
    const raw = [1]
    const result = randomSwap([...raw], -1, 10)
    expect(result).toEqual(raw)
  })
})
