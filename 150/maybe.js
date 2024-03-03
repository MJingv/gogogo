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


// string转int
const f1 = (s) => {
    const num = Number(s)
    if (isNaN(num)) {
        throw new Error('invalid input')
    }
    if (num > Number.MAX_SAFE_INTEGER) {
        throw new Error('overflow')
    }
    if (num < Number.MIN_SAFE_INTEGER) {
        throw new Error('underflow')
    }
    return num
}
// const res = f1('fjaljf002=,.z1jf0?]J03')

// 输入一个int数组，找到和最小的子数组，输出子数组的开始，结束、和
const f2 = (nums = []) => {


}
// const res = f2([1, -2, 3, -4, 5])


// n个节点的二叉树


var generateTrees = function (n) {
    if (n === 0) return []

    const helper = (start, end) => {
        const res = []

        if (start > end) {
            res.push(null)
            return res
        }
        for (let i = start; i <= end; i++) {
            // i是root
            const leftTrees = helper(start, i - 1)
            const rightTrees = helper(i + 1, end)

            for (let left of leftTrees) {
                for (let right of rightTrees) {
                    const node = new TreeNode(i)
                    node.left = left
                    node.right = right
                    res.push(node)
                }
            }
        }
        return res

    }
    return helper(1, n)

};
// const res = JSON.stringify(generateTrees(4))

// 抢红包


// 124 二叉树中最大的路径和
var maxPathSum = function (root) {
    if (!root) return 0
    let res = -Infinity
    const helper = (node) => {
        if (!node) return 0
        const left = Math.max(0, helper(node.left))
        const right = Math.max(0, helper(node.right))
        const cur = node.val + left + right
        res = Math.max(res, cur)
        return node.val + Math.max(left, right)
    }
    helper(root)
    return res
};
// const res = maxPathSum(t1)

// 20
var isValid = function (s) {
    // 只入栈左边的
    const stack = []
    for (let val of s) {
        if (val === '(') {
            stack.push(')')
        } else if (val === '[') {
            stack.push(']')
        } else if (val === '{') {
            stack.push('}')
        } else {
            if (stack.pop() !== val) return false
        }
    }
    return stack.length === 0

};
// const res = isValid('(){[]{}')


// 216 组合总和
// 输入: k = 3, n = 9 输出: [[1,2,6], [1,3,5], [2,3,4]] 解释: 1 + 2 + 6 = 9 1 + 3 + 5 = 9 2 + 3 + 4 = 9 没有其他符合的组合了。
var combinationSum3 = function (k, n) {
    if (!k || !n) return []
    const res = []
    let path = []
    const helper = (i = 1, sum = 0) => {
        if (sum === n && path.length === k) {
            res.push(path.slice())
        }
        if (path.length === k || i === 10) return
        path.push(i)
        helper(i + 1, sum + i)
        path.pop()
        helper(i + 1, sum)
    }
    helper()
    return res

};
// const res = combinationSum3(3, 9)

// 206 反转链表
var reverseList = function (head) {
    if (!head) return null
    let cur = head, pre = null
    while (cur) {
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
};
// 3 无重复字符的最长子串
var lengthOfLongestSubstring = function (s) {


};
const res = lengthOfLongestSubstring('abcabcbb')
// 236
// 450
// 146
// 53
// 207
// 33
// 56
console.log(res)