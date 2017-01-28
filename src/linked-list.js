const Node = require('./node');

class LinkedList {
    constructor() {
       
        this.length = 0;
        this._head = null;
        this._tail = null;

    }

    append(data) {
        var node = new Node (data),
        currentNode = this._head;

        if (!this.length) {

            this._head = node;
            this._tail = node;
  
        } else {
            
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;

        }

        this.length++;
        return this; 
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {

        // checking valid index
        if (index > -1 && index < this.length) {
            var currentNode = this._head;
            var count = 0;

            while (count < index) {
                currentNode = currentNode.next;
                count++;
            }

            return currentNode.data;
        }
        
    }

    insertAt(index, data) {
        var count = 0;
        var currentNode = this._head;
        var nodeToInsert = new Node (data);
        var beforeNodeToInsert = null;

        // use case for insertion in front of _head
        if (index == 0) {

            // use case if list is empty pass to append()
            if (this.length == 0) {
                return this.append(data);
            }

            // use case if list is not empty
            nodeToInsert.next = this._head.next;
            this._head.prev = nodeToInsert;
            this._head = nodeToInsert;

            this.length++;
            return this;
        }

        // use case for insertion in the tail of list
        if (index === this.length) {
            this.append(data);
            return this;
        }

        // regular insertion between list nodes
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
        return !this.length;
    }

    clear() {

        if (this.isEmpty()) return this;
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

        // use case for single element in list
        if (this.length == 1) {
            return this.clear();
        }

        // use case for _head node deletion 
        if (index == 0) {
            this._head = currentNode.next;
            this._head.prev = null;
            currentNode = null;
            this.length--;
            return this
        }

        // usual node deletion
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
        return this
    }

    reverse() {

        var currentNode = this._head;
        var buff = [];

        // reading nodes and filling buffer array
        while (currentNode.data) {
            buff.push(currentNode.data);
            if (currentNode.next) {
                currentNode = currentNode.next;
            } else break
        }

        currentNode = this._head;

        // replacing existing node values with elements popped from array
        while (currentNode.data) {
            currentNode.data = buff.pop();
            if (currentNode.next) {
                currentNode = currentNode.next;
            } else break
        }

        return this
    }

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
