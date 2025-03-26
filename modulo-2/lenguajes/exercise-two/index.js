// 2. Concat

// Concat para 2 arrays usando spread operator
const concat = (a, b) => {
  return [...a, ...b];
};

// Versión de concat para múltiples arrays (opcional)
const concatMultiple = (...arrays) => {
  return arrays.reduce((result, array) => [...result, ...array], []);
};

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [7, 8, 9];

console.log("Array 1:", array1);
console.log("Array 2:", array2);
console.log("Array 3:", array3);
console.log("Concat de 2 arrays:", concat(array1, array2));
console.log("Concat de múltiples arrays:", concatMultiple(array1, array2, array3)); 