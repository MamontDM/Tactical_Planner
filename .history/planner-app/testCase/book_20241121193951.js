
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
    constructor(book , student) {
        this.bookStorage = [];
        this.bookHolder = [];
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