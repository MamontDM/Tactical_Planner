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

    returnBook(bookId){
        const index = this.bookStorage.findIndex(item => item.id === bookId);
        if(index !== -1){
            this.bookStorage.splice(index, 1);
        }else{
            console.log('book not Found!');
        }
        return this.bookStorage;
    }

    getBookList(){
        return this.bookStorage;
    }
}

const lib = new Library();

const newBook = lib.addNewBook('Pyatachok', 'John');
const newBook1 = lib.addNewBook('Hrsuh', 'JSveltn');
const newBook2 = lib.addNewBook('Pyok', 'Onn');
const newBook3 = lib.addNewBook('Pychok', 'YA');



// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }