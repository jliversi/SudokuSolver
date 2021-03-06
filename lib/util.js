export const calcBoxIdx = (rowIdx, colIdx, dim) => {
  const numSets = Math.sqrt(dim);
  const rowSet = Math.floor(rowIdx / numSets);
  const colSet = Math.floor(colIdx / numSets);

  return colSet + (rowSet * numSets);
};

export const boxIdxToPosArr = (i, dim) => {
  dim = Math.sqrt(dim);
  const xOffset = Math.floor(i / dim) * dim;
  const yOffset = (i % dim) * dim;
  const result = [];
  for (let i = xOffset; i < xOffset + dim; i++) {
    for (let j = yOffset; j < yOffset + dim; j++) {
      result.push([i,j]);
    }
  }
  return result;
}

export const setUnion = (...sets) => {
  const union = new Set();
  for (const nextSet of sets) {
    for (const ele of nextSet) {
      union.add(ele);
    }
  }
  return union;
};

export const setIntersection = (...sets) => {
  let intersection = new Set(sets[0]);
  for (const nextSet of sets.slice(1)) {
    intersection = new Set([...nextSet].filter(x => intersection.has(x)))
  }
  return intersection;
}

export const calcMissingNums = (arr, len) => {
  const result = new Set(Array.from({ length: len }, (_, i) => i + 1));
  arr.forEach(el => result.delete(el));
  return result;
}