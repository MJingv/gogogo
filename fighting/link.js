// 比二叉树简单，加哟

// 链表是一种常见的数据结构，操作链表有很多常见的技巧，以下是一些常见的链表操作技巧：
// 快慢指针：快慢指针常用于解决链表中的一些问题，如寻找链表的中点，检测链表是否有环等。
// 双指针：双指针常用于解决链表中的一些问题，如寻找链表的倒数第k个节点。
// 虚拟头节点：虚拟头节点常用于简化链表操作，特别是插入和删除节点时。
// 递归：递归是处理链表问题的一个常见方法，特别是在反转链表或者合并链表等问题中。
// 哨兵节点：哨兵节点是一种特殊的节点，它的主要作用是防止链表操作时出现空指针错误。
// 链表的合并和拆分：在处理一些复杂的链表问题时，我们可能需要将链表合并或者拆分。

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


// 力扣第 21 题「合并两个有序链表」
// 输入：l1 = [1,2,4], l2 = [1,3,4] 输出：[1,1,2,3,4,4]

var mergeTwoLists = function (list1, list2) {
    let [p1, p2] = [l1, l2]
    const dummy = new ListNode(-1)
    let p = dummy
    while (p1 && p2) {
        if (p1.val < p2.val) {
            p.next = p1
            p1 = p1.next
        } else {
            p.next = p2
            p2 = p2.next

        }
        p = p.next

    }
    if (p1) p.next = p1
    if (p2) p.next = p2

    return dummy.next
};

// const res = mergeTwoLists(l1)


// 86
var partition = function (head, x) {
    const dummy1 = new ListNode(-1)
    const dummy2 = new ListNode(-1)
    let [p1, p2, p] = [dummy1, dummy2, head]


    while (p) {
        if (p.val < x) {
            p1.next = p
            p1 = p1.next
        } else {
            p2.next = p
            p2 = p2.next
        }
        const tmp = p.next
        p.next = null
        p = tmp
    }


    p1.next = dummy2.next
    return dummy1.next

};
// const res = JSON.stringify(partition(l1, 0))


// 力扣第 23 题「合并K个升序链表」：
var mergeKLists = function (lists) {
    const len = lists.length
    if (!len) return null

};
// const res = mergeKLists([l1, l3])

const findFromEnd = (head, k) => {
    let [p1, p] = [head, head]

    for (let i = 0; i < k; i++) {
        p = p.next
    }

    while (p) {
        p = p.next
        p1 = p1.next
    }
    return p1
}

// const res = findFromEnd(l1, 2)

// 力扣第 19 题「删除链表的倒数第 N 个结点」：
// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
var removeNthFromEnd = function (head, n) {
    const findFromEnd = (head, k) => {
        let [p, p1] = [head, head]
        for (let i = 0; i < k; i++) {
            p = p.next
        }
        while (p) {
            p = p.next
            p1 = p1.next
        }
        return p1
    }

    const dummy = new TreeNode(-1)
    dummy.next = head
    const x = findFromEnd(dummy, n + 1)
    x.next = x.next.next
    return dummy.next

};
// const res = removeNthFromEnd(l1, 2)


// 力扣第 876 题「链表的中间结点」
var middleNode = function (head) {
    let [p1, p2] = [head, head]
    while (p1 && p2 && p2.next) {
        p1 = p1.next
        p2 = p2.next.next
    }
    return p1

};
const res = middleNode(l1)

console.log(res)