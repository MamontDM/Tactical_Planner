
class Book {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

}

class Student  {
    constructor(name) {
        this.name = [];
        this.bookHold;
    }
}


class Library extends Book {
    constructor(parameters) {
        
    }
}

const person = new Student('John');

console.log(person.name);

// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }