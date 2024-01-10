import patternCheck from '../src/other.search-pattern-check'

describe('function other.searchPatternCheck: ', () => {
  test('other search-pattern-check1: default', () => {
    expect(
      patternCheck(
        {
          patterns: [],
        },
        '/:关键字/author:name/tag:novel'
      )
    ).toMatchObject({
      valid: false,
    })
  })
  test('other search-pattern-check2: default', () => {
    expect(
      patternCheck(
        {
          patterns: [
            { field: '' },
            {
              field: 'author',
              values: ['name', 'name2'],
              multiple: true,
            },
            {
              field: 'tag',
            },
          ],
        },
        '/:关键字/author:name-name2/tag:novel'
      )
    ).toMatchObject({
      valid: true,
    })
  })
  test('other search-pattern-check3: multiple', () => {
    expect(
      patternCheck(
        {
          patterns: [
            { field: '' },
            {
              field: 'tag',
            },
          ],
        },
        '/:关键字/tag:novel',
        true
      )
    ).toMatchObject({
      valid: true,
      pairs: {
        default: '关键字',
        tag: 'novel',
      },
    })
  })
})
