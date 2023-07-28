import { vector2 } from './types/array'
import randomRange from './number.random-range'

/**
 * @param {number} min
 * @param {number} max
 * @returns {vector2}
 */
function randomVector2 (min: number, max: number): vector2 {
  if (min === max) {
    return [min, max]
  }
  if (min > max) {
    const temp = max
    max = min
    min = temp
  }
  const vec: vector2 = [0, 0]
  vec[0] = randomRange(min, max)
  vec[1] = randomRange(min, max)

  return vec
}

export default randomVector2
