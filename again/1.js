class TreeNode {
    constructor(val, left, right) {
        this.val = val
        this.left = left || null
        this.right = right || null
    }
}

const t0 = new TreeNode(0)
const t2 = new TreeNode(2)
const t4 = new TreeNode(4)
const t3 = new TreeNode(3, t2, t4)
const t1 = new TreeNode(1, t0, t3)


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


const reverse = (head) => {
    if (!head) return null
    let pre = null, cur = head
    while (cur) {
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return head
}

const reverseN = (head, n) => {
    if (!head || !n) return head
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
// const res = JSON.stringify(reverseN(l1, 2))


const maxDepth = (root) => {
    if (!root) return 0
    if (!root.left && !root.right) return 1
    if (!root.left) return maxDepth(root.right) + 1
    if (!root.right) return maxDepth(root.left) + 1
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
// const res = maxDepth(t1)


const traverse = (root) => {
    if (!root) return []
    const res = []
    const helper = (head) => {
        if (!head) return
        helper(head.left)
        helper(head.right)
        res.push(head.val)

    }
    helper(root)
    return res
}
const traverse1 = (root) => {
    if (!root) return []
    const [q, res] = [[root], []]
    while (q.length) {
        const size = q.length
        const level = []
        for (let i = 0; i < size; i++) {
            const cur = q.shift()
            level.push(cur.val)
            cur.left && q.push(cur.left)
            cur.right && q.push(cur.right)
        }
        res.push(level.slice())
    }
    return res
}
// const res = traverse1(t1)
// console.log(res)


const pool = async (max, arr = []) => {
    const cur = [], list = []

    for (const item of arr) {
        list.push(item)
        if (max <= arr.length) {
            const p = item.then(() => {
                cur.splice(cur.indexOf(p), 1)
            })
            cur.push(p)
            if (max <= cur.length) {
                await Promise.race(cur)
            }
        }
    }
    return Promise.all(list)

}


const quickSort = (list = []) => {
    const len = list.length
    if (!len) return []
    const left = [], right = [], equal = []

    const p = list[Math.floor(len / 2)]
    for (let i = 0; i < len; i++) {
        if (list[i] === p) {
            equal.push(list[i])
        } else if (list[i] < p) {
            left.push(list[i])
        } else if (list[i] > p) {
            right.push(list[i])
        }
    }

    return [...quickSort(left), ...equal, ...quickSort(right)]

}

const merge = (l1 = [], l2 = []) => {
    const len1 = l1.length, len2 = l2.length
    const res = []
    let i = 0, j = 0
    while (i < len1 && j < len2) {
        if (l1[i] < l2[j]) {
            res.push(l1[i++])
        } else {
            res.push(l2[j++])
        }
    }
    while (i < len1) {
        res.push(l1[i++])
    }
    while (j < len2) {
        res.push(l2[j++])
    }
    return res

}

const mergeSort = (list = []) => {
    const len = list.length
    if (len <= 1) return list
    const midIndex = Math.floor(len / 2)
    const left = list.slice(0, midIndex)
    const right = list.slice(midIndex)
    return merge(mergeSort(left), mergeSort(right))

}


const list = [2, 4, 0, -99, 100, 2, 0, -1, 4, 222]
// const res = quickSort(list)
// const res = mergeSort(list)


var mergeTwoLists = function (list1, list2) {
    let p1 = list1, p2 = list2, dummy = new ListNode(-1)
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
}
const res = JSON.stringify(mergeTwoLists(l1, l3))
console.log(res)
