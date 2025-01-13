
class Book {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        }
}

class Student  {
    constructor(name) {
        this.name = name;
        this.bookHold = null;
    }
}


class Library {
    constructor() {
        this.bookStorage = [];
        this.bookHolders = [];
    }

    addNewBook(book){
        return this.bookStorage[book];
    }
}

const book = new Book(10, 'Stelth');


const lib = new Library();

lib.addNewBook(Book(10, 'Fantasy'));

console.log(lib.bookStorage);


console.log(book);

// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }