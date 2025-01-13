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

    set item (element){
        if(this.isFull()){
            throw new Error("Stack is full");
        }
        return this.stack.push(element);
    }


    get item (){
        if(this.isEmpty()){
            throw new Error("Stack is empty");
        }
        return this.stack.pop();
    }
}