'use strict';

const {Node, LinkList} = require("./link");

class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next);
        this.prev = undefined
    }
}

class DoublyLinkList extends LinkList {
    constructor() {
        super()
        this.tail = undefined
    }

    insert(element, index) {
        if (index < 0 || index > this.count - 1) return false
        const node = new DoublyNode(element)
        let current = this.head
        if (index === 0) {
            if (!this.head && !this.tail) {
                this.head = this.tail = node
            } else {
                node.next = this.head
                this.head.prev = node
                this.head = node
            }
        } else {

        }
    }

}

const l = new DoublyLinkList()
l.insert(5)
const res = JSON.stringify(l)
console.log(res)
