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

    insert(element, index = 0) {

        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element)
            let current = this.head
            if (index === 0) {
                //第一个，链表为null
                if (!this.head) {
                    this.head = node
                    this.tail = node
                } else {
                    node.next = this.head
                    current.prev = node
                    this.head = node
                }
            } else if (index === this.count) {
                //最后一个
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node

            } else {
                const aux = this.getEelementAt(index - 1)
                current = aux.next
                node.prev = aux
                node.next = current
                aux.next = node
                current.prev = node
            }
            this.count++
            return true
        } else {
            return false
        }
    }
}

const l = new DoublyLinkList()
l.insert(5)
l.insert(11, 1)
l.insert(99, 1)

console.log(l)
