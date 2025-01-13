
class Book {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        }
}

class Student  {
    constructor(name, book) {
        this.name = name;
        this.takedBook = book;
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
        const bookIndex = this.bookStorage.findIndex(item => item.id === book);
        const studentIndex = this.bookHolders.findIndex(person => person.name === student);
        if(bookIndex !== -1){
            this.bookHolders[studentIndex].takedBook = this.bookStorage[bookIndex];
        }else{
            console.log(`Story  ${this.bookStorage[bookIndex]} is not available`)
        };
    }



    returnBook(book, student){
сду
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



lib.addNewBook(new Book('Potter', 'fantasy'));
lib.addNewBook(new Book('Eragon', 'fantasy'));
lib.addNewBook(new Book('Experiment', 'horror'));
lib.addNewBook(new Book('Wild Cat', 'love story'));
lib.addNewBook(new Book('Wild Forest', 'nature'));

lib.addNewStudent(new Student('Kate', ''));


lib.borrowBook('Wild Cat', 'Kate');

lib.borrowBook('Potter', 'Kate');

lib.borrowBook('Eragon', 'Kate');


// public class Book {
//     private int id;
//     private String title;

// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }