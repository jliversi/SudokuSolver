export const calcRowIdx = (num, dim) => {
  return Math.floor(num / dim);
}

export const calcColIdx = (num, dim) => {
  return col % dim;
}

export const calcBoxIdx = (rowIdx, colIdx, dim) => {
  const numSets = Math.sqrt(dim);
  const rowSet = Math.floor(rowIdx / numSets);
  const colSet = Math.floor(colIdx / numSets);

  return colSet + (rowSet * numSets);
};

export const isSquare = (num) => {
  return num > 0 && Math.sqrt(num) % 1 === 0;
};

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

export const deepDupArrObj = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    newObj[el] = Array.from(obj[el]);
  });
  return newObj;
}; 