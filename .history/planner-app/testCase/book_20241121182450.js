
class Student{
    constructor(bookId){
        this.bookId = bookId;
        this.rentBook = [];
    }
    
}

class Library {
    constructor() {
    }

    addNewBook (bookId, student) {
    }
    returnBook(bookId, student){
    }
    getBookList(){
    }
}




class Book extends Library  {
    super();
    constructor(id, stringTitle) {
        this.id = id;
        this.stringTitle = stringTitle;
    }
}







// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }