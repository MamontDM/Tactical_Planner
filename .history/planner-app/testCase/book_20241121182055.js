
class Stundent{
    constructor(bookId){
        this.bookId = bookId;
        this.rentBook = [];
    }
    
}

class Library {
    constructor() {
        this.bookstorage = [];
    }

    addNewBook (bookId, stundent) {
        const newBook = {
            id: bookId,
            holder: stundent, 
        };
        return this.bookstorage.push(newBook);
    }



    returnBook(bookId, student){
        const returnBook = this.bookstorage.filter
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
    addNewBook (bookId, stundent) {

    }

    returnBook(bookId, student){

    }
    getBookList(){

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