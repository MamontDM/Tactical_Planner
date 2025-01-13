import  Book  from "./book.js";
import  Student  from "./student.js";


class Library {
    constructor() {
        this.books = [];
    }
    addBook(book){
        if(book instanceof Book){
            this.books.push(book);
        }else{
            throw new Error("book is not instance of class Book");
        }
    }
    addBooks(booksList){
        booksList.forEach(book => this.books.push(book));
    }
    borrowBook(book, student){
        if(book.isAvaliable === true){
            book.setAvailability(false);
            // book.isAvaliable = false;
            student.borrowBook(book);
        }else{
            throw new Error("book is already borrow");
        }
    } 
    returnBook(book, student){
        if(student.returnBook(book) === true){
            console.log('vernul')
            book.setAvailability('yes');
            // book.isAvaliable = true;
        }
    }

    getAllBooks(){
        return console.log(this.books);
    }
    checkAvaliability(book){
        if(book){
            console.log(book.checkAvaliability());
        }else {
            console.log('book is not exist')
        }
    }
}

export default Library;