import flat from '../src/tree.flat'

describe('function tree.flat: ', () => {
  const tree = [
    {
      val: '1',
      child: [
        {
          val: '1-1',
          child: [
            {
              val: '1-1-1',
            },
          ],
        },
        {
          val: '1-2',
        },
      ],
    },
    {
      val: '2',
    },
  ]
  test('tree flat', () => {
    expect(flat(tree, false, 'child').map(item => item.val)).toEqual([
      '1',
      '2',
      '1-1',
      '1-2',
      '1-1-1',
    ])
  })

  test('tree flat2', () => {
    expect(flat(tree, true, 'child').map(item => item.val)).toEqual([
      '1',
      '1-1',
      '1-1-1',
      '1-2',
      '2',
    ])
  })
})
