 class Book {
    constructor(name, title) {
        this.name = name;
        this.title = title;
        this.isAvaliable = true;
    }
    checkAvaliability(){
        return this.isAvaliable ? true : false;
    }
    setAvailability(status){
        return this.isAvaliable = status;
    }
}
const book1 = new Book('My Little Ponny', 'kidstory');
const book2 = new Book('Lord Of The Rings', 'epicFantasy');
const book3 = new Book('Star Ship Troppers', 'scientific fantastic' )

class Student {
    constructor(name){
        this.name = name;
        this.borrowBooks = [];
    }

    borrowBook(book){
        console.log(`${this.name} is taked ${JSON.stringify(book)`);
        return this.borrowBooks.push(book);
    }
    returnBook(book){
        const returnBook = this.borrowBooks.indexOf(book);
        console.log(returnBook);
        if(returnBook === -1){
            console.log(`${this.name} do not borrow this Book`);
        }else{
            const getback = this.borrowBooks.splice(returnBook, 1);
            console.log(`book is spliced ${book}`);
        }
        return true;
    }

    getBookList(){
        return this.borrowBooks;
    }

}
const user1 = new Student('Kate');
const user2 = new Student('Dmitriy')
const user3 = new Student('Sonya');


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

lib.addBook(book1);
lib.addBook(book2);
lib.addBook(book3);


lib.borrowBook(book2, user2);
// lib.returnBook(book2, user2);

user2.getBookList();



// lib.getAllBooks();
// lib.checkAvaliability(book1);


// public class Book {
//     private int id;
//     private String title;

// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }