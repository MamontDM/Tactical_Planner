
class Book {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        }
}

class Student  {
    constructor(name) {
        this.name = name;
        this.bookHold = null;
    }
}


class Library {
    constructor() {
        this.bookStorage = [];
        this.bookHolders = [];
        this.avaliableBook = [];
    }

    addNewBook(book){
       this.bookStorage.push(book);
    }

    borrowBook(bookId, student){
        const result = this.bookStorage.findIndex(item => item.id === bookId);
    
    }



    returnBook(book, student){

    }


    isAvaliable(book){
        const result = this.bookStorage.findIndex(item => item.id === book);
        if(result === -1){
            console.log(`${book} is already borrow` );
        }else{
            console.log(`${this.bookStorage[result]} is available`)
        }
    }
}


const lib = new Library();




lib.addNewBook(new Book(10, 'Libertad'));
lib.addNewBook(new Book(82, 'Vermont'));
lib.addNewBook(new Book(5, 'Conde'));
lib.addNewBook(new Book(6, 'Petro'));
lib.addNewBook(new Book(4, 'Colombo'));
lib.addNewBook(new Book(1, 'Montana'));


// const borrow = lib.borrowBook(5);



lib.isAvaliable(45);

// console.log(borrow);


// console.log(est);
// console.log(lib.bookStorage);


// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }