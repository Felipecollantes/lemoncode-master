// 1. Array operations

// Head: extraer primer elemento usando destructuring
const head = (array) => {
  const [first] = array;
  return first;
};

// Tail: devolver todos menos el primer elemento usando rest operator
const tail = (array) => {
  const [, ...rest] = array;
  return rest;
};

// Init: devolver todos menos el último elemento usando métodos de Array.prototype
const init = (array) => {
  return array.slice(0, -1);
};

// Last: devolver el último elemento
const last = (array) => {
  return array[array.length - 1];
};

const testArray = [1, 2, 3, 4, 5];
console.log("Array original:", testArray);
console.log("Head:", head(testArray));
console.log("Tail:", tail(testArray));
console.log("Init:", init(testArray));
console.log("Last:", last(testArray)); 