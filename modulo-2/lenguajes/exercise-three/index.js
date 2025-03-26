// 3. Clone Merge

// Clone: devuelve un nuevo objeto con las propiedades del objeto source
function clone(source) {
  return { ...source };
}

// Merge: mezcla las propiedades de source en target, source sobreescribe a target
function merge(source, target) {
  return { ...target, ...source };
}

const a = { name: "Maria", surname: "Ibañez", country: "SPA" };
const b = { name: "Luisa", age: 31, married: true };

console.log("Objeto a:", a);
console.log("Objeto b:", b);
console.log("Clone de a:", clone(a));
console.log("Merge de a sobre b:", merge(a, b)); 