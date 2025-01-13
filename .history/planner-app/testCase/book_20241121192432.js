


class Book {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

class Student extends Book {
    constructor(name) {
        super();
        this.name = [];
    }
}


const book = new Book(10, '')



















// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }