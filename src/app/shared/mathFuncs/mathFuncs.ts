import { Meetup } from 'src/app/entities/meetup';

export function deepEqual(a: any, b: any) {
  if (a === b) {
    return true;
  }
  if (
    a === null ||
    b === null ||
    typeof a !== 'object' ||
    typeof b !== 'object'
  ) {
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
      console.log(false);
      return false;
    }
  }
  console.log(true);
  return true;
}

export function sortListCompareFn(item1: any, item2: any) {
  return Date.parse(item2.createdAt) - Date.parse(item1.createdAt);
}
