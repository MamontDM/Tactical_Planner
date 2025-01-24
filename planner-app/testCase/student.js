
export class Student {
    constructor(name){
        this.name = name;
        this.borrowBooks = [];
    }
    borrowBook(book){
        return this.borrowBooks.push(book);
    }
    returnBook(book){
        const returnBook = this.borrowBooks.indexOf(book);
        if(returnBook === -1){
            console.log(`${this.name} do not borrow this Book`);
        }else{
            const getback = this.borrowBooks.splice(returnBook, 1);
            console.log(`book is spliced ${book}`);
        }
        return true;
    }
    getBookList(){
        return console.log(this.borrowBooks);
    }
}


export default Student;