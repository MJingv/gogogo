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


// 215 数组中第k个最大的元素
var findKthLargest = function (nums, k) {
    const len = nums.length
    const quickSort = (list = []) => {
        const len = list.length
        if (!len) return []
        const left = [], right = [], equal = []

        const mid = Math.floor(len / 2)
        for (let i = 0; i < len; i++) {
            const cur = list[i]
            if (nums[mid] === cur) {
                equal.push(cur)
            } else if (nums[mid] < cur) {
                right.push(cur)

            } else if (nums[mid] > cur) {
                left.push(cur)
            }

        }
        return [...quickSort(left), ...equal, ...quickSort(right)]

    }
    const list = quickSort(nums)
    return list[len - k]

};
// const res = findKthLargest([3, 2, 1, 5, 6, 4], 2)


// 206 反转链表
var reverseList = function (head) {
    if (!head || !head.next) return head
    let cur = head, pre = null
    while (cur) {
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
};

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

const reverseBetween = (head, left, right) => {
    if (!head) return head

    if (left === 1) return reverseN(head, right)

    head.next = reverseBetween(head.next, left - 1, right - 1)
    return head

}
// const res = JSON.stringify(reverseBetween(l1, 2, 3))

// k个一组反转链表
var reverseKGroup = function (head, k) {
    if (!head) return head
    const helper = (a, b) => {
        // [a,b)
        if (!head) return head
        let cur = head, pre = null
        while (cur !== b) {
            const next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        }
        return pre
    }
    let a = head, b = head
    for (let i = 0; i < k; i++) {
        if (!b) return head
        b = b.next

    }
    const h = helper(a, b)
    a.next = reverseKGroup(b, k)
    return h

}
const res = JSON.stringify(reverseKGroup(l1, 2))
// 3 无重复字符的最长子串
var lengthOfLongestSubstring = function (s) {
    const len = s.length
    if (len <= 1) return len
    let max = 1, window = [s[0]], i = 0, j = 1
    while (j < len) {
        const cur = s[j]
        while (window.includes(cur)) {
            window.shift()
            i++
        }
        window.push(cur)
        j++
        max = Math.max(max, window.length)
    }
    return max
};
// const res = lengthOfLongestSubstring('abcabcbb')


// 236 二叉树最近公共祖先
var lowestCommonAncestor = function (root, p, q) {
    if (!root || root === p || root === q) return root
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if (left && right) return root
    if (!left && !right) return null
    return left || right
};
// const res = lowestCommonAncestor(t1, t2, t4)

// 450 删除二叉搜索树中的节点
var deleteNode = function (root, key) {
    if (!root) return null
    if (root.val === key) {
        if (root.left && root.right) {
            const left = root.left
            let p = root.right
            while (p.left) p = p.left
            p.left = left
            return root.right
        }
        return root.left || root.right
    }
    if (root.val < key) {
        root.left = deleteNode(root.left, key)
    }
    if (root.val > key) {
        root.right = deleteNode(root.right, key)
    }


};
// const res = deleteNode(t1, t4)

// 124 二叉树中最大路径和 hard


// 146 lru
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map()

    }

    get(key) {
        if (this.map.has(key)) {
            const val = this.map.get(key)
            this.map.delete(key)
            this.map.set(key, val)
            return val
        }
        return -1
    }

    put(key, val) {
        if (this.map.get(key)) this.map.delete(key)
        if (this.map.size >= this.capacity) {
            const old = this.map.keys().next().value
            this.map.delete(old)
        }
        this.map.set(key, val)
    }
}


// 297 序列化
// 53 最大子数组和
var maxSubArray = function (nums) {
}
// 207
// 33
// 56
// 151
// 560
// 22
// 4
// 48
// 103
// 25
// 8


console.log(res)