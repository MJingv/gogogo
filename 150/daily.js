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


class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right

    }
}

const t1 = new TreeNode(1)
const t0 = new TreeNode(0)
t1.left = t0
// t0.left = new TreeNode(0)
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3


const reverse = (head) => {
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
const reverseN = (head, n) => {
    if (!head) return null
    let cur = head, next = head.next
    const helper = (head, n) => {
        if (n === 1) {
            next = head.next
            return head
        }
        const h = helper(head.next, n - 1)
        head.next.next = head
        head.next = next
        return h

    }
    return helper(cur, n)
}

const reverseBetween = (head, m, n) => {
    if (!head || head.next) return head

    if (m === 1) {
        return reverseN(head, n)

    }
    head.next = reverseBetween(head.next, m - 1, n - 1)
    return head
}
const res = JSON.stringify(reverseN(l1, 2))
console.log(res)