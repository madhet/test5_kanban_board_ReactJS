export const sortByPositionAscending = (a, b) => a.position - b.position;

export const setPositionFromIndex = (item, index) => {
  item.position = index;
  return item;
};
