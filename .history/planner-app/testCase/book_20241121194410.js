
class Book {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.goToLibrary();
    }
    goToLibrary(){
        const book = {
            id: this.id,
            title: this.title,
        };
        return book;
    }
}

class Student  {
    constructor(name) {
        this.name = name;
        this.bookHold = null;
    }
}


class Library {
    constructor(book , student) {
        this.bookStorage = [];
        this.bookHolders = [];
    }
}

const person = new Student('John');

console.log(person.bookHold);

// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }