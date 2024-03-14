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
                s
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
    // 滑动窗口
    if (!s) return 0
    let [left, right] = [0, 0]
    const length = s.length, window = []
    let res = 0
    while (right < length) {
        const cur = s[right]
        while (window.includes(cur)) {
            window.shift()
            left++
        }
        window.push(cur)
        right++
        res = Math.max(res, right - left)
    }
    return res

};
// const res = lengthOfLongestSubstring('abcabcbb')

// 236 最新公共祖先
var lowestCommonAncestor = function (root, p, q) {
    if (!root) return
    if (root === p || root === q) return root
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left !== null && right !== null) return root;
    if (left !== null) return left;
    if (right !== null) return right;
    return null;
};
// const res = lowestCommonAncestor(t1, t0, t4)


// 450 删除二叉搜索树的节点
var deleteNode = function (root, key) {
    if (!root) return null
    if (root.val === key) {
        if (root.left && root.right) {
            let p = root.right
            while (p.left) p = p.left
            p.left = root.left
            return root.right
        }
        return root.left || root.right
    } else if (root.val < key) {
        root.right = deleteNode(root.right, key)
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key)
    }
    return root

};
// const res = deleteNode(t1, 3)

// 53 最大子数组和
var maxSubArray = function (nums) {
    const len = nums.length
    if (!len) return 0
    const dp = Array(len).fill(-Infinity)
    dp[0] = nums[0]
    let res = -Infinity
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(nums[i], nums[i] + dp[i - 1])
        res = Math.max(res, dp[i])
    }

    return res

};
// const res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])


// 56 合并区间
// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]] 输出：[[1,6],[8,10],[15,18]] 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
var merge = function (intervals) {
    // 就是排序后遍历，没什么技巧
    const len = intervals.length
    if (len <= 1) return intervals
    const res = []
    intervals.sort((a, b) => a[0] - b[0])
    res.push(intervals[0])

    for (let i = 1; i < len; i++) {
        const cur = intervals[i]
        const merged = res[res.length - 1]
        if (cur[0] > merged[1]) {
            res.push(cur)
        } else {
            merged[1] = Math.max(merged[1], cur[1])
        }
    }
    return res

};
// const res = merge([[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]])


// 207 课程表
var canFinish = function (numCourses, prerequisites) {
    // 判断是否有环
    // 先构建graph，再遍历判断
    const len = prerequisites.length, n = numCourses
    if (!len || !n) return false
    const graph = Array(n).fill(0).map(() => [])
    for (let [cur, pre] of prerequisites) {
        graph[pre].push(cur)
    }
    let hasCycle = false
    const visited = Array(n).fill(0)
    const helper = (i, visited) => {
        if (visited[i] === -1) return true
        if (visited[i] === 1) return false

        visited[i] = -1
        for (let j of graph[i]) {
            if (helper(j, visited)) return true
        }
        visited[i] = 1

    }

    for (let i = 0; i < n; i++) {
        if (helper(i, visited)) hasCycle = true
    }

    return !hasCycle

};
// const res = canFinish(2, [[1, 0], [0, 1]])
// 33 搜索旋转排序数组
var search = function (nums, target) {
    const len = nums.length
    let i = 0, j = len - 1
    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        if (nums[mid] === target) return mid

        if (nums[mid] >= nums[i]) { // =很重要，第一段永远>第二段
            //第一个递增区间内
            if (nums[mid] > target && target >= nums[i]) { //边=很重要
                j = mid - 1
            } else {
                i = mid + 1
            }
        } else {
            //第二个递增区间内
            if (nums[mid] < target && target <= nums[j]) { //边=很重要
                i = mid + 1
            } else {
                j = mid - 1

            }
        }

    }
    return -1

};
const res = search([4, 5, 6, 7, 0, 1, 2], 0) //4

// 146 lru
var LRUCache = function (capacity) {
    this.capacity = capacity
    this.cache = new Map()

};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (this.cache.has(key)) {
        const val = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, val)
        return val
    } else {
        return -1
    }

};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (this.cache.get(key) > -1) {
        this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
        const oldestKey = this.cache.keys().next().value
        this.cache.delete(oldestKey)
    }
    this.cache.set(key, value)

};


// 发布订阅
class PubSub {
    constructor() {
        this.subscribes = {}
    }

    subscribe(event, callback) {
        if (!this.subscribes[event]) {
            this.subscribes[event] = []
        }
        this.subscribes[event].push(callback)

    }

    publish(event, data) {
        if (this.subscribes[event]) {
            this.subscribes[event].forEach(callback => {
                callback(data)
            })
        }

    }

    unsubscribe(event, callback) {
        if (this.subscribes[event]) {
            this.subscribes[event] = this.subscribes[event].filter(cb => cb !== callback)
        }

    }
}

// console.log(res)


