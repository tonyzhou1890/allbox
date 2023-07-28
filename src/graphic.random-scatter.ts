import { vector2, rectPositionArr } from './types/array'
import vector2Mapping from './graphic.vector2-mapping'
import randomVector2 from './array.random-vector2'

/**
 *
 * @param {rectPositionArr} bound
 * @param {number} count
 * @returns
 */
function randomScatter (bound: rectPositionArr, count: number): vector2[] {
  count = Math.max(count, 0)
  const list: vector2[] = []
  for (let i = 0; i < count; i++) {
    list.push(randomVector2(0, 1))
  }
  vector2Mapping(
    list,
    [
      [0, 0],
      [1, 1],
    ],
    bound
  )
  return list
}

export default randomScatter
