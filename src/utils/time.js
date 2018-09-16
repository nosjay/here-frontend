/* utils for date-time */
export function currentTimestamp() { // eslint-disable-line
  return ((new Date()).getTime() / 1000).toFixed(0);
}
