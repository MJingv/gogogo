function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

const mergeTwoLists = (list1, list2) => {
    const dummy = new ListNode(-1)//「虚拟头结点」技巧，也就是 dummy 节点
    let [p, p1, p2] = [dummy, list1, list2]
    while (p1 !== null && p2 !== null) {
        if (p1.val > p2.val) {
            p.next = p2
            p2 = p2.next
        } else {
            p.next = p1
            p1 = p1.next
        }
        p = p.next
    }
    if (p1 !== null) {
        p.next = p1
    }
    if (p2 !== null) {
        p.next = p2
    }
    return JSON.stringify(dummy.next)
};

// const res = mergeTwoLists(a1, b1)
// console.log(res)

const a4 = new ListNode(6)
const a3 = new ListNode(4, a4)
const a2 = new ListNode(2, a3)
const a1 = new ListNode(1, a2)

const b3 = new ListNode(4)
const b2 = new ListNode(3, b3)
const b1 = new ListNode(1, b2)


const partition = (head, x) => {
    const dummy1 = new ListNode(-1)
    const dummy2 = new ListNode(-1)
    let [p1, p2, p] = [dummy1, dummy2, head]
    while (p !== null) {
        if (p.val >= x) {
            p2.next = p
            p2 = p2.next
        } else {
            p1.next = p
            p1 = p1.next
        }
        const tmp = p.next
        p.next = null
        p = tmp
    }
    p1.next = dummy2.next
    return dummy1.next
};
// [1, 4, 3, 2, 5, 2]
const c = (list) => {
    const helper = (val) => {
        if (list.length === 0) return null
        return new ListNode(list[0], helper(list.shift()))
    }
    return helper()
}

// const head = new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(5, new ListNode(2))))))
const head = c([1, 4, 3, 2, 5, 2])
const res = partition(head, 3)
console.log(JSON.stringify(res))


