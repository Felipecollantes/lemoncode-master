// 4. Read Books (TypeScript)

interface Book {
  title: string;
  isRead: boolean;
}


function isBookRead(books: Book[], titleToSearch: string): boolean {
  const book = books.find(book => book.title === titleToSearch);
  return book ? book.isRead : false;
}

const books: Book[] = [
  { title: "Harry Potter y la piedra filosofal", isRead: true },
  { title: "Canción de hielo y fuego", isRead: false },
  { title: "Devastación", isRead: true },
];


console.log("Resultados de búsqueda:");

console.log(`¿Se ha leído 'Devastación'? ${isBookRead(books, "Devastación")}`); // true
console.log(`¿Se ha leído 'Canción de hielo y fuego'? ${isBookRead(books, "Canción de hielo y fuego")}`); // false
console.log(`¿Se ha leído 'Los Pilares de la Tierra'? ${isBookRead(books, "Los Pilares de la Tierra")}`); // false 