class Book  {
    constructor(id, stringTitle) {
        this.bookId = id;
        this.stringTitle = stringTitle;
    }
}


class Student{
    constructor(bookId){
        this.bookId = bookId;
        this.rentBook = [];
    }
}



class Library {
    constructor() {
        this.bookStorage = [];
        this.bookUsers = []
    }

    addNewBook (bookId, student) {
        const book = {
            id: bookId,
            holder: student, 
        }
        return this.bookStorage.push(book);
    }

    returnBook(bookId, student){
    }

    getBookList(){
    }
}

const lib = new Library;

const newBook = Library.addNewBook('Pyatachok', 'John');
console.log(Library.bookStorage);





// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }