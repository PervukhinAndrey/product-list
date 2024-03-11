export function selectInclusionsUniqueById(arr) {
  const mapInclusionsUniqueById = new Map();
  arr.forEach(({ id, ...rest }) => {
    if (!mapInclusionsUniqueById.has(id)) mapInclusionsUniqueById.set(id, rest);
  });

  const newArr = [];
  mapInclusionsUniqueById.forEach((value, key, map) => {
    newArr.push({ id: key, ...value });
  });
  return newArr;
}
