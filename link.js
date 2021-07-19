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
        //检查临界值
        if (index < 0 || index >= this.count) return undefined
        if (index === 0) {
            //第一项直接移除
            this.head = this.head.next
        } else {
            //循环找到index后移除
            let current = this.head
            let previous;
            for (let i = 0; i < index; i++) {
                previous = current
                current = current.next
            }
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
}

const l = new LinkList()
l.push(5)
l.push(2)
l.push(10)
l.push(6)
// l.remove(2)
const res = l.getEelementAt(3)
console.log(res)
