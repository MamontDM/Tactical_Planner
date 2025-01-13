 class Book {
    constructor(name, title) {
        this.name = name;
        this.title = title;
        this.isAvaliable = true;
    }
    checkAvaliabilty(){
        console.log(this.isAvaliable);
        return this.isAvaliable ? true : false;
    }
    setAvailability(status){
        return this.isAvaliable = status;
    }
}
const book1 = new Book('My Little Ponny', 'kidstory');
const book2 = new Book('Lord Of The Rings', 'epicFantasy');
const book2 = new Book('Star Ship Troppers', 'scientific fantastic' )


class Student {
    constructor(name){
        this.name = name;
        this.borrowBooks = [];
    }

    borrowBook(book){
        console.log(book);
        return this.borrowBooks.push(book);
    }
    returnBook(book){
        console.log(book);
        const returnBook = this.borrowBooks.findIndex(item => item.name === book);
        if(returnBook === -1){
            console.log(`${this.name} do not borrow this Book`);
        }else{
            const getback = this.borrowBooks.splice(returnBook, 1);
            console.log(book);
        }
        const getback = this.borrowBooks.splice(returnBook, 1);
        console.log(book);
    }

}
const user1 = new Student('Kate');
const user2 = new Student('Dmitriy')
const user3 = new Student('Sonya');


class Library {
    constructor() {
        this.books = [];
        this.student =[];
    }

    addBook(book){
        if(book instanceof Book){
            this.books.push(book);
        }else{
            throw new Error(message: "book is not instance of class Book");
        }
    }
    borrowBook(book, student){
        if(book.isAvaliable === true){
            book.setAvailability(false);
            student.borrowBook(book);
        }else{
            throw new Error(message: "book is already borrow");
        }
    }
    returnBook(book, student){
        
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