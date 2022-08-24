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
const a4 = new ListNode(6)
const a3 = new ListNode(4, a4)
const a2 = new ListNode(2, a3)
const a1 = new ListNode(1, a2)
const b3 = new ListNode(4)
const b2 = new ListNode(3, b3)
const b1 = new ListNode(1, b2)

const res = mergeTwoLists(a1, b1)
console.log(res)