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
    // 输入: 1->2->3->4->5->NULL, m = 2, n = 4
    // 输出: 1->4->3->2->5->NULL
    reverseIntervalList(head, m, n) {
        let count = n - m + 1
        if (count <= 0) {
            return null
        }
        if (count === 1) {
            return head
        }
        let pre = null, cur = head, start = null

        for (let i = 1; i < m; i++) {
            start = cur
            cur = cur.next
        }
        let end = start.next

        for (let i = m; i < n + 1; i++) {
            let next = cur.next
            cur.next = pre
            pre = cur
            cur = next
            end.next = cur
        }

        start.next = pre
        return start
    }

    // 区间反转递归
    // 输入: 1->2->3->4->5->NULL, m = 2, n = 4
    // 输出: 1->4->3->2->5->NULL
    reverseIntervalListRecursion(head, m, n) {
        const fun = (pre = null, cur, count) => {
            if (!count) return pre
            let next = cur.next
            cur.next = pre
            return fun(cur, next, --count)
        }

        let count = n - m + 1
        if (count <= 0) {
            return null
        }
        if (count === 1) {
            return head
        }

        let start = null, end = head, cur = head

        for (let i = 1; i < n + 1; i++) {
            end = end.next
        }
        for (let i = 1; i < m; i++) {
            start = cur
            cur = cur.next
        }
        const link = fun(end, cur, count) //4 3 2
        start.next = link
        return start
    }

    // 两个一组翻转链表
    // 给定 1->2->3->4, 你应该返回 2->1->4->3.
    group2Reverse(head) {
        if (!head || !head.next) return null
        let dummyHead = new Node()
        let p = dummyHead
        let node1 = null, node2 = null
        dummyHead.next = head

        while (p.next && p.next.next) {
            node1 = p.next
            node2 = p.next.next

            node1.next = node2.next
            node2.next = node1
            p.next = node2
            p = node1
        }


        return dummyHead.next

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


const n = new Node(5)
l.printLink(l.head)
const res = l.group2Reverse(l.head)
console.log('---after---')
l.printLink(res)

