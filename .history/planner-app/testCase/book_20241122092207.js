 class Book {
    constructor(name, title) {
        this.name = name;
        this.title = title;
        this.books = [];
        this.isAvaliable = true;
    }
    static config ={ 
        name: this.name,
        discription: this.title, 
    };

    static addBook(){
    }
    static getAllBook(){
    }
}


class Student {
    constructor(name, book) {
        this.name = name;
        this.book = book;
        this.holdBooks = [];
    }
    static takeBook(book){
        this.holdBooks.push(book);
    }
    static returnBook(book){
        const returnBook = this.holdBooks.findIndex(item => item.name === book);
        return this.holdBooks.splice(returnBook, 1);
    }
}


    class Library {
        constructor(book, student) {
            
        }
    }



Book.addBook('Sobaka', 'roman', true);

Book.getAllBook();


// public class Book {
//     private int id;
//     private String title;

// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }