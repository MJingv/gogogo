export class Node {
    constructor(element) {
        this.element = element
        this.next = undefined
    }
}

export class LinkList {
    constructor() {
        this.head = null
        this.count = null //长度
    }

    push(element) {
        const node = new Node(element)
        let current
        if (!this.head) {
            //空直接赋值
            this.head = node
            this.count++

        } else {
            //非空，找到最后一个赋值
            current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = node
            this.count++
        }
    }

    removeAt(index) {
        if (index === 0) {
            this.head = this.head.next
        } else {
            let previous = this.getEelementAt(index - 1)
            let current = previous.next
            previous.next = current.next

        }
        this.count--
    }

    getEelementAt(index) {
        if (index < 0 || index >= this.count) return undefined
        if (index === 0) return this.head
        let current = this.head
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }

    insert(element, index) {
        if (index < 0 || index >= this.count) return false
        const node = new Node(element)
        if (index === 0) {
            //首位插入
            node.next = this.head
            this.head = node

        } else {
            const previous = this.getEelementAt(index - 1)
            const current = previous.next
            previous.next = node
            node.next = current
        }
        this.count++
        return true

    }

    indexOf(node) {
        let index = -1
        if (!node) return index
        let current = this.head
        for (let i = 0; i < this.count; i++) {
            if (current.element === node.element) {
                index = i
                return index
            } else {
                current = current.next
            }
        }
        return -1
    }

    remove(node) {
        const index = this.indexOf(node)
        this.removeAt(index)
    }

    getHead() {
        return this.head
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return this.count
    }
}

const l = new LinkList()
l.push(5)
l.push(2)
l.push(10)
l.push(6)
const n = new Node(11)

console.log(l.indexOf(n))
