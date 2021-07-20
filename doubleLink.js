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

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            const node = this.getEelementAt(index)
            if (index === 0) {
                //首位
                const next = node.next
                node.next = node.prev = undefined
                next.prev = undefined
                this.head = next
            } else if (index === this.count - 1) {
                //末尾
                const current = this.tail
                this.tail = current.prev
                this.tail.next = undefined
            } else {
                const prev = this.getEelementAt(index - 1)
                const current = prev.next
                prev.next = current.next
                current.next.prev = current.prev
            }
            this.count--
            return true

        } else {
            return false
        }

    }
}

const l = new DoublyLinkList()
l.insert(5)
l.insert(6, 1)
l.insert(7, 2)
l.removeAt(1)

console.log(l)
