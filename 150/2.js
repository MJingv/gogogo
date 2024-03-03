class ListNode {
    constructor(val, next = null) {
        this.val = val
        this.next = next
    }
}

const l5 = new ListNode(5)
const l4 = new ListNode(4, l5)
const l3 = new ListNode(3, l4)
const l2 = new ListNode(2, l3)
const l1 = new ListNode(1, l2)

const reverse1 = (head) => {
    if (!head) return null
    let cur = head, pre = null
    while (cur) {
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
}
const reverse = (head) => {
    if (!head || !head.next) return head
    const h = reverse(head.next)
    head.next.next = head
    head.next = null
    return h
}

// 前n
const reverseN = (head, n) => {
    if (!head || !n) return null
    let post = null

    const helper = (head, n) => {
        if (n === 1) {
            head.next= post
            return head

        }
        const h = helper(head.next, n - 1)
        head.next.next = head
        head.next = post
        return h

    }
    return helper(head, n)


}
const res = JSON.stringify(reverseN(l1, 2))
console.log(res)