// ------------------------------------------------------------------------------------回溯---------------------------------------------------------------
var letterCombinations = function (digits) {
    const len = digits.length
    const l = digits.split('')
    const mapping = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    const list = []
    l.map((i) => list.push(mapping[Number(i)]))
    const res = []
    const helper = (i = 0, path = []) => {
        if (path.length === len || i === len) return res.push(path.slice().join(''))
        for (let j of list[i]) {
            path.push(j)
            helper(i + 1, path)
            path.pop()
        }
    }
    helper()
    return res

};
// const res = letterCombinations('23')


// 46 全排列
var permute = function (nums) {
    const len = nums.length
    const res = []
    const path = []
    const helper = (used = {}) => {
        if (path.length === len) return res.push(path.slice())
        for (let i = 0; i < len; i++) {
            if (used[i]) continue
            path.push(nums[i])
            used[i] = true
            helper(used)
            path.pop()
            used[i] = false
        }
    }
    helper()
    return res

};
// const res = permute([1, 2, 3])

// 77 组合
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
var combine = function (n, k) {
    if (!k) return []
    if (n < 1) return
    const res = []
    const path = []


    const helper = (start = 1) => {
        if (path.length === k) return res.push(path.slice())
        for (let i = start; i <= n; i++) {
            path.push(i)
            helper(i + 1)
            path.pop()
        }
    }
    helper()
    return res
};
// const res = combine(4, 2)


// 39 组合总和 无重复，可复用
// 输入：candidates = [2,3,6,7], target = 7 输出：[[2,2,3],[7]]
var combinationSum = function (candidates, target) {
    const len = candidates.length
    const res = []
    const helper = (start = 0, path = [], sum = 0) => {
        if (sum > target) return
        if (sum === target) return res.push(path.slice())

        for (let i = start; i < len; i++) {
            const cur = candidates[i]
            path.push(cur)
            sum += cur
            helper(i, path, sum)
            path.pop()
            sum -= cur
        }
    }
    helper()
    return res


};
// const res = combinationSum([2, 3, 6, 7], 7)


// 22. 括号生成
var generateParenthesis = function (n) {
    const res = []
    const helper = (path = [], left = 0, right = 0) => {
        if (left < right || left > n || right > n) return
        if (left === n && right === n) return res.push(path.slice().join(''))

        path.push('(')
        helper(path, left + 1, right)
        path.pop()

        path.push(')')
        helper(path, left, right + 1)
        path.pop()

    }
    helper()
    return res

};
// const res = generateParenthesis(3)


// 79
var exist = function (board, word) {
    const [m, n] = [board.length, board[0].length]
    let res = false

    const helper = (row = 0, col = 0, i = 0) => {
        if (row < 0 || row >= m || col < 0 || col >= n) return
        if (i === word.length) return res = true
        if (board[row][col] !== word[i]) return false
        board[row][col] = board[row][col] + '-'
        if ((helper(row + 1, col, i + 1) || helper(row - 1, col, i + 1) || helper(row, col + 1, i + 1) || helper(row, col - 1, i + 1))) return true
        board[row][col] = board[row][col].slice(0, -1)
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === word[0]) {
                helper(i, j, 0)
            }
        }
    }

    return res

};

// const res = exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED")


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


// ------------------------------------------------------------------------------------tree------------------------------------------------------------------------------------
// 104
var maxDepth = function (root) {
    if (!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
// const res = maxDepth(t1)

//100
var isSameTree = function (p, q) {
    if (!q && !p) return true
    if (!q || !p) return false
    if (p.val !== q.val) return false
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
// const res = isSameTree(t0, t0)


var isSymmetric = function (root) {
    if (!root) return false

    const helper = (left, right) => {
        if (!left && !right) return true
        if (!left || !right) return false
        if (left.val !== right.val) return false
        return helper(left.left, right.right) && helper(left.right, right.left)
    }

    return helper(root.left, root.right)

};
// const res = isSymmetric(t1)


// 98
var isValidBST = function (root, min = null, max = null) {
    // todo 在二叉搜索树中，左子节点不仅要小于其父节点，还要小于所有的右祖先节点；同样，右子节点不仅要大于其父节点，还要大于所有的左祖先节点
    if (!root) return true
    if (min && root.val <= min) return false
    if (max && root.val >= max) return false
    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max)
};
// const res = isValidBST(t1)

// 2476
var closestNodes = function (root, queries) {
    // timeout
    const len = queries.length
    if (!root || !len) return []

    const res = []

    const helper = (node, key, left = -Infinity, right = Infinity) => {
        if (!node) return [left === -Infinity ? -1 : left, right === Infinity ? -1 : right]
        const cur = node.val
        if (key === cur) return [cur, cur]
        if (cur > key) {
            right = Math.min(right, cur)
            return helper(node.left, key, left, right)
        }
        if (cur < key) {
            left = Math.max(left, cur)
            return helper(node.right, key, left, right)
        }
    }
    for (let i = 0; i < len; i++) {
        const r = helper(root, queries[i])
        res.push(r)
    }
    return res
};
var closestNodes1 = function (root, queries) {
    const len = queries.length
    if (!root || !len) return []
    const res = [], list = []
    const helper = (node) => {
        if (!node) return null
        helper(node.left)
        list.push(node.val)
        helper(node.right)
    }
    helper(root)

    const find = (key, list) => {
        const len = list.length
        let left = 0, right = len - 1
        while (left <= right) {
            const mid = Math.floor((left + right) / 2)
            const cur = list[mid]
            if (cur === key) return [key, key]
            if (cur < key) {
                left = mid + 1
            }
            if (cur > key) {
                right = mid - 1
            }
        }

        return [list[left - 1] || -1, list[left] || -1]

    }

    for (let i = 0; i < len; i++) {
        const r = find(queries[i], list)
        res.push(r)
    }
    return res

}
// const res = closestNodes1(t1, [0, 3.5, 10])
var rangeSumBST = function (root, low, high) {
    if (!root) return 0
    if (low > high) return -1
    if (low === high) return low
    let res = 0

    const helper = (node) => {
        if (!node) return 0
        helper(node.left)
        if (node.val >= low && node.val <= high) {
            res += node.val
        }
        helper(node.right)
    }
    helper(root)
    return res

};
const res = rangeSumBST(t1, 1, 3)

// ------------------------------------------------------------------------------------二叉搜索树------------------------------------------------------------------------------------

var getMinimumDifference = function (root) {
    if (!root) return
    let res = Infinity, pre = null
    const helper = (node) => {
        if (!node) return
        helper(node.left)
        res = Math.min(res, pre ? node.val - pre.val : Infinity)
        pre = node
        helper(node.right)

    }
    helper(root)
    return res
};
// const res = getMinimumDifference(t1)

// 230

var kthSmallest = function (root, k) {
    if (!root) return null
    let i = 0, res = 0
    const helper = (node) => {
        if (!node) return
        helper(node.left)
        i++
        if (i === k) {
            res = node.val
            return;
        }

        helper(node.right)
    }
    helper(root)
    return res

};
// const res = kthSmallest(t1, 1)

// 98
var isValidBST = function (root, min = -Infinity, max = Infinity) {
    if (!root) return true
    if (root.val <= min || root.val >= max) return false

    const left = isValidBST(root.left, min, root.val)
    const right = isValidBST(root.right, root.val, max)
    return left && right

};
// const res = isValidBST(t1)

// ------------------------------------------------------------------------------------二分------------------------------------------------------------------------------------
var searchInsert = function (nums, target) {
    const len = nums.length
    let i = 0, j = len - 1
    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        if (target === nums[mid]) {
            return mid
        } else if (target < nums[mid]) {
            j = mid - 1

        } else if (target > nums[mid]) {
            i = mid + 1

        }
    }
    return j + 1

};
// const res = searchInsert([1, 3, 5, 6], 2)


// 74 搜索二维矩阵
// matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
var searchMatrix = function (matrix, target) {
    const [m, n] = [matrix.length, matrix[0].length]
    let i = 0, j = m * n - 1
    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        const cur = matrix[Math.floor(mid / n)][mid % n]
        if (cur === target) {
            return true
        } else if (cur < target) {
            i = mid + 1

        } else if (cur > target) {
            j = mid - 1
        }
    }
    return false

};
// const res = searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 5)


//162
var findPeakElement = function (nums) {
    const len = nums.length
    if (!len) return -1
    if (len === 1) return 0
    for (let j = 1; j < len - 1; j++) {
        if (nums[j - 1] < nums[j] && nums[j + 1] < nums[j]) return j
    }
    return nums[0] > nums[len - 1] ? 0 : len - 1

};
var findPeakElement1 = function (nums) {
    // 单调+有界 可以二分
    const len = nums.length
    let i = 0, j = len - 1
    while (i < j) {
        const mid = Math.floor((i + j) / 2)
        if (nums[mid] < nums[mid + 1]) {
            i = mid + 1
        } else {
            j = mid
        }

    }
    return i

}
// const res = findPeakElement1([1, 2, 1, 3, 5, 6, 4])

// 33 搜索旋转排序数组
var search = function (nums, target) {
    const len = nums.length
    let i = 0, j = len - 1
    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        if (nums[mid] === target) {
            return mid
        }
        if (nums[mid] <= nums[i]) {
            // mid在第二个递增区间内
            if (target > nums[mid] && target <= nums[j]) {
                i = mid + 1;
            } else {
                j = mid - 1;
            }
        } else {
            // mid在第一个递增区间内
            if (target >= nums[i] && target < nums[mid]) {
                j = mid - 1;
            } else {
                i = mid + 1;
            }
        }

    }
    return -1


};
// const res = search([4, 5, 6, 7, 0, 1, 2], 0)

// 34
// 输入：nums = [5,7,7,8,8,10], target = 8 输出：[3,4]
var searchRange = function (nums, target) {
    const len = nums.length
    let i = 0, j = len - 1
    const res = [-1, -1]
    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        if (nums[mid] === target) {
            res[0] = mid
            res[1] = mid
            let left = mid - 1, right = mid + 1

            while (nums[left] === target) {
                res[0] = left
                left--
            }
            while (nums[right] === target) {
                res[1] = right
                right++
            }
            return res

        } else if (nums[mid] > target) {
            j = mid - 1
        } else if (nums[mid] < target) {
            i = mid + 1
        }
    }

    return res

};
// const res = searchRange([5, 7, 7, 8, 8, 10], 1)


// 153 寻找旋转排序数组中的最小值
var findMin = function (nums) {
    const len = nums.length
    if (nums[0] < nums[len - 1]) return nums[0]
    let i = 0, j = len - 1, min = Infinity
    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        if (nums[mid] > nums[j]) {//1st
            i = mid + 1

        } else {//2rd
            j = mid - 1
            min = Math.min(min, nums[mid])

        }


    }
    return min

};
// const res = findMin([3, 4, 5, 1, 2])

// 4 hard

// ------------------------------------------------------------------------------------堆------------------------------------------------------------------------------------
// 215 数据中第k个最大元素
// 502 ipo hard
// 373查找和最小的k对数字
// 295 数据流的中位数


// ------------------------------------------------------------------------------------数学------------------------------------------------------------------------------------
// 9回文数
// 66加一
// 172阶乘后的0
// 69 x的平方根
var mySqrt = function (x) {
    if (!x) return 0
    if (x < 4) return 1
    let max = Math.floor(x / 2)
    let res = 0, i = 2, j = max

    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        const cur = mid * mid
        if (cur === x) {
            return mid
        } else if (cur < x) {
            i = mid + 1
        } else if (cur > x) {
            j = mid - 1
        }
    }


    return i - 1

};
// const res = mySqrt(10)


// 50 pow（x,n）
// 149 直线上最多的点数 hard


// ------------------------------------------------------------------------------------dp一维------------------------------------------------------------------------------------
// 70 爬楼梯
// 198 打家劫舍
// 139 单词拆分
// 322 零钱兑换
// 300 最长递增子序列
// ------------------------------------------------------------------------------------dp多维------------------------------------------------------------------------------------
// 120三角形最小路径和
//
// 64最小路径和
//
// 63不同路径 II
//
// 5最长回文子串
//
// 97交错字符串
//
// 72编辑距离
//
// 123买卖股票的最佳时机 III
//
// 188买卖股票的最佳时机 IV
//
// 221最大正方形
console.log(res)