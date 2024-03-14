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
        console.log(cur.val)
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return head
}
const res=JSON.stringify(reverse1(l1))

const reverse = (head) => {
    if (!head || !head.next) return head
    const h = reverse(head.next)
    head.next.next = head
    head.next = null
    return h
}

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
console.log(res)
