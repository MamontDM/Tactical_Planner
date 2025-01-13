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

const book1 = new Book('Harry Potter', 'fantasy');
const book2 = new Book('LordOfTheRings', 'epic');


class Student {
    constructor(name, borrowBooks){
        this.name = name;
        this.borrowBooks = [];
    }

    borrowBooks(book){
        return this.borrowBooks.push(book);
    }
    returnBook(book){
        console.log(book);
        const returnBook = this.borrowBooks.findIndex(item => item.name === book);
        const return = this.borrowBooks.splice(returnBook, )
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