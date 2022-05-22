export const toggle = (array, item) =>
  array.includes(item) ?
    array.filter(i => i !== item) :
    [...array, item];
