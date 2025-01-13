class Stack {
    constructor(maxSize){
        this.stack = [];
        this.maxSize = maxSize;
    }
    isEmpty () {
        return this.stack.lenght === 0;
    }
    isFull(){
        return this.stack.length === this.maxSize;
    }
    size(){
        return this.stack.length;
    }
}