/**
 * @param {number} min
 * @param {number} max
 * @returns {number} float number between min and max(not included)
 */
function randomRange (min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export default randomRange
