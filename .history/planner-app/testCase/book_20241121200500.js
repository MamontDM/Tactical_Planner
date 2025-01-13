
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
        const bookInstanse = book.id;
        console.log(bookInstanse);


        this.bookStorage.push(book);
    }

    borrowBook(book, student){
        // this.bookStorage[Book.]
    }
}

const lib = new Library();

lib.addNewBook(new Book(10, 'Libertad'));
lib.addNewBook(new Book(2, 'Vermont'));


console.log(lib.bookStorage);


// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }