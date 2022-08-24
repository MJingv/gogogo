function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

const c = (list) => {
    const helper = (val) => {
        if (list.length === 0) return null
        return new ListNode(list[0], helper(list.shift()))
    }
    return helper()
}

// 21.合并两个有序链表
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

// 86.分割链表
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

// const head = new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(5, new ListNode(2))))))
const head = c([1, 4, 3, 2, 5, 2])
// const res = partition(head, 3)
// console.log(JSON.stringify(res))

// 23.合并K个升序链表
// 输入：lists = [[1,4,5],[1,3,4],[2,6]] 输出：[1,1,2,3,4,4,5,6]
const mergeKLists = (lists) => {
    const list = []
    const dummy = new ListNode(-1)
    let p = dummy
    lists.forEach(i => {
        while (i !== null) {
            list.push(i.val)
            i = i.next
        }
    })
    const pq = list.sort((a, b) => a - b)
    pq.forEach(i => {
        p.next = new ListNode(i)
        p = p.next
    })

    return dummy.next
};
const list1 = c([1, 4, 5])
const list2 = c([1, 3, 4])
const list3 = c([2, 6])
// const res = mergeKLists([list1, list2, list3])
// console.log(JSON.stringify(res))


// [剑指offer]22.链表中倒数第k个节点
// 给定一个链表: 1->2->3->4->5, 和 k = 2.
// 返回链表 4->5.
// 技巧，p1走k（还剩n-k），p2从0和p1一起走完（p2只走了n-k）
const getKthFromEnd = (head, k) => {
    let [p1, p2] = [head, head]
    for (let i = 0; i < k; i++) {
        p1 = p1.next
    }
    while (p1 !== null) {
        p1 = p1.next
        p2 = p2.next
    }
    return p2
};
// const res = getKthFromEnd(c([1, 2, 3, 4, 5]), 2)
// console.log(JSON.stringify(res))


// 第 19 题「 删除链表的倒数第 N 个结点」
// 输入：head = [1,2,3,4,5], n = 2 输出：[1,2,3,5]
const removeNthFromEnd = (head, n) => {
    const getKthFromEnd = (head, k) => {
        let [p1, p2] = [head, head]
        for (let i = 0; i < k; i++) {
            p1 = p1.next
        }
        while (p1 !== null) {
            p1 = p1.next
            p2 = p2.next
        }
        return p2
    };

    const dummy = new ListNode(-1)
    dummy.next = head
    const k = getKthFromEnd(dummy, n + 1)
    k.next = k.next.next
    return dummy.next
};
// const res = removeNthFromEnd(c([1]), 1)
// console.log(JSON.stringify(res))
// 876 题「 链表的中间结点」
var middleNode = function (head) {
    let [fast, low] = [head, head]//快慢指针
    while (fast !== null && fast.next) {
        fast = fast.next.next
        low = low.next
    }
    return low
};
const res = middleNode(c([1, 2, 3, 4, 5, 6]))
console.log(JSON.stringify(res))
