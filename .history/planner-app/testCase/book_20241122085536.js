class Book {
    constructor(name, title) {
        this.name = name;
        this.title - title;
        this.books = [];
        this.isAvaliable = true;
    }
    static config ={ 
        name: this.name,
        discription: this.title, 
    };

    static addBook(name, title){
        const newBook = new Book(name, title);
        
        return this.books.push(newBook);
    }
    static getAllBook(){

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