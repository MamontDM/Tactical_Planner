 
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

export default Book;

