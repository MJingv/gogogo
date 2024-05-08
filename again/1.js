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
    constructor(val, next) {
        this.val = val
        this.next = next || null
    }
}

const l3 = new ListNode(3)
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
const res = traverse1(t1)
console.log(res)