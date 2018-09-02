// eslint-disable-next-line import/prefer-default-export
export function has(value, validList) {
// eslint-disable-next-line no-plusplus
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}
