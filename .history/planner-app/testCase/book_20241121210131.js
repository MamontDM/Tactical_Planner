
class Book {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        }
}

class Student  {
    constructor(name, readingBook) {
        this.name = name;
        this.readingBook = null;
    }
}


class Library {
    constructor() {
        this.bookStorage = [];
        this.bookHolders = [];
        this.avaliableBook = [];
    }
    addNewStudent(student){
        this.bookHolders.push(student);
    }

    addNewBook(book){
       this.bookStorage.push(book);
    }

    borrowBook(book, student){
        const result = this.bookStorage.findIndex(item => item.id === book);
        const holder = this.bookHolders.findIndex(person => person.name === student);

        if(result !== -1){
            const newHolder = {
                book: this.bookStorage[result].name;
                holder: this.bookStorage[holder].name;
            }
            this.bookStorage.splice(result, 1)
        }else{
            console.log(`Story  ${this.bookStorage[result].title} is not available`)
        }
    }



    returnBook(book, student){

    }


    isAvaliable(book){
        const result = this.bookStorage.findIndex(item => item.id === book);
        if(result === -1){
            console.log(`${book} is already borrow` );
        }else{
            console.log(`Story about ${this.bookStorage[result].title} is available`)
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

lib.addNewStudent(new Student('Kate', ''));

const newReader = lib.borrowBook('5', 'Kate');

console.log(newReader);

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