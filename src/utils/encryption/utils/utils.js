/* eslint-disable no-bitwise,no-param-reassign */
/**
 * @param {*} object
 * @return {boolean}
 */
export function isNull(object) {
  return object === null || object === undefined;
}

/**
 * @param {*} object
 * @return {boolean}
 */
export function isNotNull(object) {
  return !isNull(object);
}

/**
 * returns bit length of the integer x
 * @param {number} x
 * @return {number}
 */
export function nbits(x) {
  let r = 1;
  let t;
  t = x >>> 16;
  if (t !== 0) { x = t; r += 16; }

  t = x >> 8;
  if (t !== 0) { x = t; r += 8; }

  t = x >> 2;
  if (t !== 0) { x = t; r += 4; }

  t = x >> 2;
  if (t !== 0) { x = t; r += 2; }

  t = x >> 1;
  if (t !== 0) { x = t; r += 1; }
  return r;
}
