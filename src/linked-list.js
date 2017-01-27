const Node = require('./node');

class LinkedList {
    constructor() {
       
        this.length = 0;
        this._head = null;
        this._tail = null;

    }

    append(data) {
        var node = new Node (data);
        var currentNode = this._head;

        if (!this.length) {

            this._head = node;
            this._tail = node;
  
        } else {

        this._tail.next = node;
        node.prev = this._tail;
        this._tail = node;

        }

        this.length++;
    //    return node; 
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        var currentNode = this._head;
        var count = 0;

        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode.data;
    }

    insertAt(index, data) {
        var count = 0;
        var currentNode = this._head;
        var nodeToInsert = new Node (data);
        var beforeNodeToInsert = null;

        if (index === 0) {

            nodeToInsert.next = this._head;
            this._head.prev = nodeToInsert;
            this._head = nodeToInsert;

            this.length++;
            return this;
        }


        if (index === this.length) {
            this.append(data); // switch insertion to appending
            return this;
        }

        while (count < index) {

            beforeNodeToInsert = currentNode;
            currentNode = currentNode.next;
            count++;
        }

        currentNode.prev = nodeToInsert;
        nodeToInsert.next = currentNode;
        nodeToInsert.prev = beforeNodeToInsert;
        beforeNodeToInsert.next = nodeToInsert;
        beforeNodeToInsert = null;

        this.length++;
        return this;
    }

    isEmpty() {
        return this._head === null
    }

    clear() {
        var currentNode = this._head;

        while (currentNode.next) {
            currentNode.data = null;
            currentNode = currentNode.next;

            this.length--;
        }

        this._tail.data = null;
        this.length--
        return this;
    }

    deleteAt(index) {
        var currentNode = this._head,
            prevNodeToDelete = null,
            nodeToDelete = null,
            deletedNode = null,
            count = 0;

        if (index == 0) {
            this._head = currentNode.next;
            this._head.prev = null;
            currentNode = null;
            this.length--;
            return this
        }

        while (count < index) {
            prevNodeToDelete = currentNode;
            nodeToDelete = currentNode.next;
            currentNode = currentNode.next;
            count++;
        }

        prevNodeToDelete.next = nodeToDelete.next;
        nodeToDelete.next.prev = prevNodeToDelete;
        nodeToDelete = null;
        this.length--;
    }

    reverse() {}

    indexOf(data) {
        var currentNode = this._head;
        var count = 0;

        while (currentNode.data) {
            if (currentNode.data == data) {
                return count;
                break
            } 

            currentNode = currentNode.next;
            if (!currentNode) return -1;
            count++;  
        }
    }
}

module.exports = LinkedList;
