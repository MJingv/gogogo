'use strict';

class Node {
    constructor(element) {
        this.element = element
        this.next = undefined
    }
}

class LinkList {
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

    // 反转链表
    reverseList(head) {
        if (!head) return null
        let cur = head, pre = null
        while (cur) {
            let next = cur.next
            cur.next = pre
            pre = cur
            cur = next

        }
        return pre

    }

    // 反转链表-递归
    reverseListRecursion(head) {
        const fun = (cur, pre = null) => {
            if (!cur) return pre
            let next = cur.next
            cur.next = pre
            return fun(next, cur)
        }

        return fun(head)
    }

    // 区间反转
    reverseIntervalList(head, m, n) {
        let count = n - m - 1
        if (count === 0) {
            return null
        }
        if (count === 1) {
            return head
        }
        let pre = null, cur = head

        for (let i = 0; i < n; i++) {
            if (i < m + 1) {
                cur = cur.next
            } else {
                //反转
                let next = cur.next
                cur.next = pre
                pre = cur
                cur = next
            }
        }
        return pre
    }


    printLink(head) {
        while (head.next) {
            console.log(`${head.element}->`)
            head = head.next
        }
        console.log(`${head.element}->`)

    }
}

module.exports = {
    Node,
    LinkList
};

const l = new LinkList()
l.push(1)
l.push(2)
l.push(3)
l.push(4)
l.push(5)
l.push(6)
l.push(7)

const n = new Node(5)
l.printLink(l.head)
const res = l.reverseIntervalList(l.head, 1, 5)
console.log('---after---')
l.printLink(res)

