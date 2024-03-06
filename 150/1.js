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
// const res = rangeSumBST(t1, 1, 3)

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


// 50 pow（x,n）求幂
var myPow = function (x, n) {
    if (n === 0) return 1
    if (n < 0) {
        x = 1 / x
        n = -n
    }
    let res = 1
    while (n > 0) {
        if (n % 2 === 1) {
            res = res * x
        }
        x *= x
        n = Math.floor(n / 2)
    }
    return res


};
// const res = myPow(2.00000, 10)
// 149 直线上最多的点数 hard


// ------------------------------------------------------------------------------------dp一维------------------------------------------------------------------------------------
// 70 爬楼梯
var climbStairs = function (n) {
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 2
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
};
// const res = climbStairs(3)

// 198 打家劫舍
var rob = function (nums) {
    const len = nums.length
    if (len === 0) return 0
    if (len === 1) return nums[0]
    const dp = Array(len).fill(0)
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])
    }
    return Math.max(...dp)
};
// const res = rob([0])


// 139 单词拆分
var wordBreak = function (s, wordDict) {
    const n = s.length, len = wordDict.length
    const dp = Array(n + 1).fill(false)
    dp[0] = true

    for (let i = 1; i <= n; i++) {//i结尾
        for (let j = 0; j < i; j++) {//j开头
            const tmp = s.slice(j, i)
            if (wordDict.includes(tmp) && dp[j]) dp[i] = true

        }

    }

    return dp[n]
};
// const res = wordBreak("leetcode", ["leet", "code"])

// 322 零钱兑换
// 计算并返回可以凑成总金额所需的 最少的硬币个数
// 输入：coins =  amount = 11 输出：3 解释：11 = 5 + 5 + 1

var coinChange = function (coins, amount) {
    const len = coins.length
    if (!amount) return 0
    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0

    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < len; j++) {
            const cur = coins[j]
            if (i >= cur) {
                dp[i] = Math.min(dp[i], dp[i - cur] + 1)
            }
        }

    }
    return dp[amount] === Infinity ? -1 : dp[amount]


};
// const res = coinChange([1, 2, 5], 11)

// 300 最长递增子序列
// 严格递增
// 输入：nums = [10,9,2,5,3,7,101,18] 输出：4 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
var lengthOfLIS = function (nums) {
    const len = nums.length
    const dp = Array(len).fill(1)
    for (let i = 1; i < len; i++) {//i结尾
        for (let j = 0; j < i; j++) {// j开头
            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1) //记住吧，做错无数遍了
        }
    }
    return Math.max(...dp)
};
// const res = lengthOfLIS([4, 10, 4, 3, 8, 9])


// ------------------------------------------------------------------------------------dp多维------------------------------------------------------------------------------------
// 120三角形最小路径和
// 给定一个三角形 triangle ，找出自顶向下的最小路径和。
// 如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
var minimumTotal = function (triangle) {
    const len = triangle.length
    const dp = Array(len).fill(0).map(() => Array(len).fill(Infinity))
    dp[0][0] = triangle[0][0]
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < triangle[i].length; j++) {
            if (j === 0) {
                dp[i][j] = dp[i - 1][j] + triangle[i][j]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j]

            }
        }
    }


    return Math.min(...dp[len - 1])


};
// const res = minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])

// 64最小路径和
// 请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。每次只能向下或者向右移动一步。
// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]] 输出：7 解释：因为路径 1→3→1→1→1 的总和最小。
var minPathSum1 = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(Infinity))
    dp[0][0] = grid[0][0]
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }
    }
    return dp[m - 1][n - 1]
};
const minPathSum = (grid) => {
    const [m, n] = [grid.length, grid[0].length]
    const dp = Array(m).fill(0)
    dp[0] = grid[0][0]
    for (let j = 1; j < n; j++) {
        dp[j] = dp[j - 1] + grid[0][j]
    }

    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (j === 0) {
                dp[j] += grid[i][j]
            } else {
                dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j]
            }
        }
    }
    return dp[n - 1]
}

// const res = minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])


// 63不同路径 II
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
var uniquePathsWithObstacles1 = function (obstacleGrid) {
    // timeous
    const [m, n] = [obstacleGrid.length, obstacleGrid[0].length]
    let res = 0
    const helper = (i = 0, j = 0) => {
        if (i < 0 || i >= m || j < 0 || j >= n) return
        if (obstacleGrid[i][j] === 1) return;
        if (i === m - 1 && j === n - 1) return res += 1

        i = i + 1
        helper(i, j)
        i = i - 1

        j = j + 1
        helper(i, j)
        j = j - 1
    }
    helper()
    return res
};
var uniquePathsWithObstacles = function (obstacleGrid) {
    const [m, n] = [obstacleGrid.length, obstacleGrid[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(0))// 到达点的路径个数
    dp[0][0] = obstacleGrid[0][0] === 1 ? 0 : 1
    for (let i = 1; i < m; i++) {
        dp[i][0] = obstacleGrid[i][0] === 1 ? 0 : dp[i - 1][0]
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = obstacleGrid[0][j] === 1 ? 0 : dp[0][j - 1]

    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] !== 1) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1] //todo keypoint 我的路径数=左+上
            }
        }
    }
    return dp[m - 1][n - 1]
}// const res = uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]])


// 5最长回文子串
var longestPalindrome = function (s) {
    const len = s.length
    if (len === 1) return s
    if (len === 2) {
        if (s[0] === s[1]) return s
        return s[0]
    }
    const dp = Array(len).fill(0).map(() => Array(len).fill(false))
    let start = 0, maxLength = 1
    for (let i = 0; i < len; i++) dp[i][i] = true

    for (let j = 1; j < len; j++) {
        for (let i = 0; i < j; i++) {
            if (s[i] === s[j]) {
                if (j - i < 3 || dp[i + 1][j - 1]) {
                    dp[i][j] = true
                    if (j - i + 1 > maxLength) {
                        start = i
                        maxLength = j - i + 1
                    }
                }
            }
        }
    }

    return s.slice(start, start + maxLength)
};
// const res = longestPalindrome('ccc')

// 97交错字符串
var isInterleave1 = function (s1, s2, s3) {
    const l1 = s1.length, l2 = s2.length, l3 = s3.length
    if (l1 + l2 !== l3) return false
    let i = 0, j = 0, k = 0
    let res = false
    const helper = (i, j, k) => {
        if (k === l3) return res = true
        if (i < l1 && s1[i] === s3[k]) helper(i + 1, j, k + 1)
        if (j < l2 && s2[j] === s3[k]) helper(i, j + 1, k + 1)
    }
    helper(i, j, k)
    return res
};
const isInterleave = (s1, s2, s3) => {
    const l1 = s1.length, l2 = s2.length, l3 = s3.length
    if (l1 + l2 !== l3) return false
    // i和j开头是否可以i+j的string
    const dp = Array(l1 + 1).fill(0).map(() => Array(l2 + 1).fill(false))
    dp[0][0] = true
    for (let i = 0; i <= l1; i++) {
        for (let j = 0; j <= l2; j++) {
            if (i > 0 && s1[i - 1] === s3[i + j - 1]) dp[i][j] = dp[i - 1][j]
            if (j > 0 && s2[j - 1] === s3[i + j - 1]) dp[i][j] = dp[i][j - 1] || dp[i][j]
        }
    }
    return dp[l1][l2]
}
const res = isInterleave("aabcc", "dbbca", "aadbbcbcac")
// 72编辑距离
//
// 123买卖股票的最佳时机 III
//
// 188买卖股票的最佳时机 IV
//
// 221最大正方形
console.log(res)