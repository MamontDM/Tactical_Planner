 
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


export default Book;

class Book {
    #sate;
    constructor(name, title) {
        this.name = name;
        this.title = title;
        this.state = {isAvaliable: true};
    }
    get isAvaliable(){
        return this.#state;
    }
    set isAvaliable(status){
        if(typeof status !== 'boolean'){
            throw new Error('Status must be a boolean');
        }
        this.#sate.isAvaliable = status;
    }
}


export default Book;