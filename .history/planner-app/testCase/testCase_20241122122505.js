import Book from './book.js';
import Student from './student.js';
import Library from './library.js';

console.log('Test case Started');

const lib = new Library();

const book1 = new Book('My Little Ponny', 'kidstory');
const book2 = new Book('Lord Of The Rings', 'epicFantasy');
const book3 = new Book('Star Ship Troppers', 'scientific fantastic' )

const books = [
    new Book('My Little Ponny', 'kidstory'),
    new Book('Lord Of The Rings', 'epicFantasy'),
    new Book('Star Ship Troppers', 'scientific fantastic' ),
]

const users = [
    new Student('Sonya'),
    new Student('Dmitriy'),
    new Student('Kate'),
]


const user1 = new Student('Kate');
const user2 = new Student('Dmitriy')
const user3 = new Student('Sonya');

lib.addBook(book1);

lib.getAllBooks();

lib.addBooks(books);

lib.getAllBooks();









// public class Book {
//     private int id;
//     private String title;

// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }