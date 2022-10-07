export function deepEqual(a: any, b: any) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null ||typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (let i = 0; i < aKeys.length; i += 1) {
    const key = aKeys[i];
    if (!bKeys.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
};

export function sortList(data: Array<any>) {
  return [...data].sort(
    (item1, item2) =>
      Date.parse(item2.createdAt) - Date.parse(item1.createdAt)
  );
}

