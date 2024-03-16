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
const res = JSON.stringify(reverse(l1))


// 前n
const reverseN = (head, n) => {
    if (!head) return null
    let next = null
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
    return helper(head, n)
}

//92
const reverseBetween = (head, m, n) => {
    if (!head) return null


    const reverseN = (head, n) => {
        if (!head) return
        let next = null
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
        return helper(head, n)

    }

    if (m === 1) return reverseN(head, n)


    head.next = reverseBetween(head.next, m - 1, n - 1)
    return head
}

// 24 两个一组转
var swapPairs = function (head) {
    if (!head || !head.next) return head
    let cur = head, next = head.next
    cur.next = swapPairs(next.next)
    next.next = cur
    return next
};

// 21 合并两个有序链表
var mergeTwoLists = function (list1, list2) {
    if (!list1) return list2
    if (!list2) return list1

    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2)
        return list1
    } else {
        list2.next = mergeTwoLists(list1, list2.next)
        return list2
    }
    return mergeTwoLists(list1, list2)
};

// const res = JSON.stringify(mergeTwoLists(l1, l3))

// 2 两数相加
var addTwoNumbers1 = function (l1, l2) {
    let dummyHead = new ListNode(-1)
    let p = l1, q = l2, cur = dummyHead
    let carry = 0
    while (p || q) {
        let x = p && p.val || 0
        let y = q && q.val || 0
        let sum = x + y + carry
        carry = Math.floor(sum / 10)
        cur.next = new ListNode(sum % 10)
        cur = cur.next
        if (p) p = p.next
        if (q) q = q.next

    }
    if (carry > 0) {
        cur.next = new ListNode(carry)
    }
    return dummyHead.next
};

const addTwoNumbers = (l1, l2) => {
    // 没全a
    const dummyHead = new ListNode(-1)
    let p1 = l1, p2 = l2, cur = dummyHead
    let flag = 0
    while (p1 && p2) {
        const val = p1.val + p2.val + flag
        cur.next = new ListNode(val % 10)
        flag = val >= 10 ? 1 : 0
        p1 = p1.next
        p2 = p2.next
        cur = cur.next
    }
    while (p1) {
        cur.next = p1
        p1 = p1.next
        cur = cur.next
    }
    while (p2) {
        cur.next = p2
        p2 = p2.next
        cur = cur.next
    }
    if (flag) cur.next = new ListNode(1)


    return dummyHead.next

}
// const res = JSON.stringify(addTwoNumbers(l1, l1))

console.log(res)
