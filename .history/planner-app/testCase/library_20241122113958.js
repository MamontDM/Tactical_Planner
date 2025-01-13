import { Book } from "./book";
import { Student } from "./student";


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
    borrowBook(book, student){
        if(book.isAvaliable === true){
            book.setAvailability(false);
            student.borrowBook(book);
        }else{
            throw new Error("book is already borrow");
        }
    }
    returnBook(book, student){
        if(student.returnBook(book) === true){
            book.setAvailability = true;
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
const lib = new Library();