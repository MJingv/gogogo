// 动态规划一般就是求最值，核心是穷举
// bad case 状态 选择 定义dp
// 最优子结构，问题相互独立

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const t1 = new TreeNode(1)
const t0 = new TreeNode(0)
t1.left = t0
// t0.left = new TreeNode(0)
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3


// 509. 斐波那契数
// 剑指 Offer 10- I. 斐波那契数列
var fib = function (n) {
    // 备忘录
    const dp = [0, 1]
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
};
const fib1 = (n) => {
    // 尾优化
    if (n === 0) return 0
    if (n === 1) return 1
    let [a, b] = [0, 1]
    for (let i = 2; i <= n; i++) {
        const tmp = a + b
        a = b
        b = tmp
    }
    return b
}
// const res = fib1(5)
// console.log(res)

// 322. 零钱兑换
// 剑指 Offer II 103. 最少的硬币数目
// 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
// 计算并返回可以凑成总金额所需的 最少的硬币个数
var coinChange = function (coins, amount) {
    const len = coins.length
    if (!amount) return 0
    if (!len) return -1
    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i < amount + 1; i++) {
        for (let j = 0; j < len; j++) {
            if (coins[j] <= i) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
            }

        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
};
// const res = coinChange([1, 2, 5], 11)
// console.log(res)

// 剑指 Offer 10- II. 青蛙跳台阶问题
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
// 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
var numWays = function (n) {
    if (!n) return 1
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 2
    for (let i = 3; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007
    }

    return dp[n] % 1000000007
};
// const res = numWays(7)
// console.log(res)

// 70. 爬楼梯
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
var climbStairs = function (n) {
    if (!n) return 1
    if (n === 1) return 1
    if (n === 2) return 2
    let [a, b] = [1, 2]
    for (let i = 3; i <= n; i++) {
        const tmp = a + b
        a = b
        b = tmp
    }
    return b
};
// const res = climbStairs(3)
// console.log(res)

// 面试题 三步问题
// 三步问题。有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶、2阶或3阶。实现一种方法，计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模1000000007。
var waysToStep = function (n) {
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 2
    dp[3] = 4

    for (let i = 4; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % 1000000007
    }

    return dp[n] % 1000000007

};
// const res = waysToStep(5) //4
// console.log(res)

// 剑指 Offer 14- I. 剪绳子
// 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
// 输入: 10 输出: 36 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36
var cuttingRope = function (n) {
    if (n === 2) return 1
    const dp = Array(n + 1).fill(-Infinity)
    dp[1] = 1
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (j < i) {
                // 剪成i和j就不剪了
                dp[i] = Math.max(dp[i], dp[i - 1], (i - j) * j, dp[i - j] * j)
            }

        }
    }
    return dp[n]

};
// const res = cuttingRope(10)
// console.log(res)

// 112. 路径总和
// 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。
var hasPathSum = function (root, targetSum) {
    if (!root) return false
    let res = false
    const helper = (node, sum) => {
        if (!node) return
        if (!node.left && !node.right && sum === targetSum) return res = true
        node.left && helper(node.left, sum + node.left.val)
        node.right && helper(node.right, sum + node.right.val)
        return false
    }
    helper(root, root.val)
    return res
};
// const res = hasPathSum(t1, 8)
// console.log(res)

// 115. 不同的子序列 hard

// 139. 单词拆分
// 输入: s = "applepenapple", wordDict = ["apple", "pen"] 输出: true 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。 注意，你可以重复使用字典中的单词。
var wordBreak = function (s, wordDict) {
    const len = wordDict.length
    const sLen = s.length
    if (!s && !len) return true
    if (!s || !len) return false
    const dp = Array(sLen + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= sLen; i++) {
        for (let j = 0; j < i; j++) {
            const str = s.slice(j, i)
            if (dp[j] && wordDict.includes(str)) dp[i] = true
        }

    }
    return dp[sLen]
};
// const res = wordBreak('applepenapple', ["apple", "pen"])
// console.log(res)

// 1696. 跳跃游戏 VI
// 你的目标是到达数组最后一个位置（下标为 n - 1 ），你的 得分 为经过的所有数字之和。请你返回你能得到的 最大得分 。
// 输入：nums = [1,-1,-2,4,-7,3], k = 2 输出：7 解释：你可以选择子序列 [1,-1,4,3] （上面加粗的数字），和为 7 。
var maxResult = function (nums, k) {
    // timeout
    if (k <= 0) return nums[0]
    const len = nums.length
    const dp = Array(len).fill(-Infinity)
    dp[0] = nums[0]
    for (let i = 1; i < len; i++) {
        for (let j = 1; j <= k; j++) {
            if (i >= j) {
                dp[i] = Math.max(dp[i], dp[i - j] + nums[i])
            }
        }
    }
    return dp

};
// const res = maxResult([1, -1, -2, 4, -7, 3], 2)
// console.log(res)

// 221. 最大正方形
// 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
var maximalSquare = function (matrix) {
    const [m, n] = [matrix.length, matrix[0].length]
    if (!m || !n) return 0

    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    let max = 0
    for (let i = 0; i < m; i++) {
        dp[i][0] = matrix[i][0]
        if (dp[i][0] === '1') max = 1
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = matrix[0][j]
        if (dp[0][j] === '1') max = 1

    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === '1') {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
                max = Math.max(max, dp[i][j])
            }
        }
    }
    return max * max
};
// const res = maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]])
// console.log(res)

// 240. 搜索二维矩阵 II
var searchMatrix = function (matrix, target) {
    // 从右上 or 左下开始遍历
    const [m, n] = [matrix.length, matrix[0].length]
    if (!m && !n) return false
    if (matrix[0][0] > target) return false
    let res = false
    let [i, j] = [0, n - 1]
    while (i < m && j >= 0) {
        const val = matrix[i][j]
        if (target === val) return res = true
        if (target > val) {
            i++
        }
        if (target < val) {
            j--
        }
    }

    return res
};
// const res = searchMatrix([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 5)
// console.log(res)

// 343. 整数拆分
// 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。
// 输入: n = 10 输出: 36 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
var integerBreak = function (n) {
    if (n < 2) return n
    const dp = Array(n + 1).fill(1)
    for (let i = 3; i <= n; i++) {
        for (let j = i - 1; j >= 1; j--) {
            dp[i] = Math.max(dp[i - j] * j, (i - j) * j, dp[i])
        }
    }
    return dp[n]

};
// const res = integerBreak(10)
// console.log(res)

// 542. 01 矩阵
// 给定一个由 0 和 1 组成的矩阵 mat ，请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。
var updateMatrix = function (mat) {
    const [m, n] = [mat.length, mat[0].length]
    const dp = Array(m).fill(Infinity).map(() => Array(n).fill(Infinity))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) dp[i][j] = 0
        }
    }
    // 先遍历左和上
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i - 1 >= 0) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j])
            if (j - 1 >= 0) dp[i][j] = Math.min(dp[i][j - 1] + 1, dp[i][j])
        }
    }
    // 再遍历右和下
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i + 1 < m) dp[i][j] = Math.min(dp[i][j], dp[i + 1][j] + 1)
            if (j + 1 < n) dp[i][j] = Math.min(dp[i][j], dp[i][j + 1] + 1)
        }
    }
    return dp
};

// 输入：mat = [[0,0,0],[0,1,0],[1,1,1]] 输出：[[0,0,0],[0,1,0],[1,2,1]]
// const res = updateMatrix([[0, 0, 0], [0, 1, 0], [1, 1, 1]])
// console.log(res)

// 576. 出界的路径数
// 输入：m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
var findPaths = function (m, n, maxMove, startRow, startColumn) {
    // 放弃
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    while (maxMove) {

    }
    return dp
};
// const res = findPaths(2, 2, 2, 0, 0)
// console.log(res)

// 62. 不同路径
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。问总共有多少条不同的路径？
var uniquePaths = function (m, n) {
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    dp[0][0] = 1
    for (let i = 1; i < m; i++) {
        dp[i][0] = 1
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = 1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
};
// const res = uniquePaths(3, 7) //28
// console.log(res)

// 63. 不同路径 II
// 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]] 输出：2 解释：3x3 网格的正中间有一个障碍物。 从左上角到右下角一共有 2 条不同的路径： 1. 向右 -> 向右 -> 向下 -> 向下 2. 向下 -> 向下 -> 向右 -> 向右
var uniquePathsWithObstacles = function (obstacleGrid) {
    const [m, n] = [obstacleGrid.length, obstacleGrid[0].length]
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    dp[0][0] = obstacleGrid[0][0] ? 0 : 1
    for (let i = 1; i < m; i++) {
        dp[i][0] = obstacleGrid[i][0] ? 0 : dp[i - 1][0]
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = obstacleGrid[0][j] ? 0 : dp[0][j - 1]
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (!obstacleGrid[i][j]) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }

    return dp[m - 1][n - 1]
};
// const res = uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]])
// console.log(res)

// 91. 解码方法
// 输入：s = "226" 输出：3 解释：它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
// 一条包含字母 A-Z 的消息通过以下映射进行了 编码 ： 'A' -> "1"'B' -> "2"'Z' -> "26"
var numDecodings = function (s) {
    const n = s.length
    // 前i个字符的最值 dp[i]=dp[i-1]+dp[i-2]
    // 2个case 1位，1-9可以，2位 10-26可以
    const dp = Array(n + 1).fill(0)
    s = ' ' + s
    dp[0] = 1
    for (let i = 1; i <= n; i++) {
        if (Number(s[i]) >= 1) dp[i] += dp[i - 1]
        if (i > 1) {
            const str = s.slice(i - 1, i + 1)
            const num = Number(str)
            if (`${num}` === str && num >= 10 && num <= 26) {
                dp[i] += dp[i - 2]
            }

        }
    }

    return dp[n]
};
// const res = numDecodings('226') //3
// console.log(res)

// 剑指 Offer 04. 二维数组中的查找

var findNumberIn2DArray = function (matrix, target) {
    if (!matrix.length) return 0
    const [m, n] = [matrix.length, matrix[0].length]
    let [res, i, j] = [false, 0, n - 1]
    while (i < m && j >= 0) {
        const val = matrix[i][j]
        if (val === target) return res = true
        if (target > val) i++
        if (target < val) j--
    }
    return res;
}
// const res = findNumberIn2DArray([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 5)
// console.log(res)

// 剑指 Offer 46. 把数字翻译成字符串
// 给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
// 解释: 12258有5种不同的翻译，分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"
var translateNum = function (num) {
    // f(n)=f(n-1)+f(n-2)
    num = ' ' + num
    const n = num.length
    if (!n) return 1
    const dp = Array(n).fill(0)
    dp[0] = 1
    for (let i = 1; i < n; i++) {
        dp[i] += dp[i - 1]
        if (i > 1) {
            const s = num.slice(i - 1, i + 1)
            console.log(s)

            const tmp = Number(s)
            if (tmp <= 25 && tmp >= 10) {
                dp[i] += dp[i - 2]

            }
        }
    }
    return dp[n - 1]
};
// const res = translateNum('25')//5
// console.log(res)

// 剑指 Offer II 091. 粉刷房子
// 假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。
// 输入: costs = [[17,2,17],[16,16,5],[14,3,19]] 输出: 10 解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。 最少花费: 2 + 5 + 3 = 10。
var minCost = function (costs) {
    if (!costs.length) return 0
    const m = costs.length
    for (let i = 1; i < m; i++) {
        costs[i][0] += Math.min(costs[i - 1][1], costs[i - 1][2])
        costs[i][1] += Math.min(costs[i - 1][0], costs[i - 1][2])
        costs[i][2] += Math.min(costs[i - 1][0], costs[i - 1][1])
    }
    return Math.min(...costs[m - 1])
};
// const res = minCost([[17, 2, 17], [16, 16, 5], [14, 3, 19]])
// console.log(res)

// 剑指 Offer II 098. 路径的数目
// 输入：m = 3, n = 7 输出：28
var uniquePaths = function (m, n) {
    if (!m || !n) return 1
    const dp = Array(m).fill(1).map(i => Array(n).fill(1))
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
};
// const res = uniquePaths(3, 7)
// console.log(res)


// 剑指 Offer II 097. 子序列的数目
// 给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）
// 输入：s = "rabbbit", t = "rabbit"输出：3
// 解释： 如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。 rabbbit rabbbit rabbbit
var numDistinct = function (s, t) {
    // 站在 s 视角的状态转移方程 int dp(s, i, t, j) { if (s[i] == t[j]) { return dp(s, i+1, t, j+1) + dp(s, i+1, t, j); } else { return dp(s, i+1, t, j); } }

    // 看不懂
    const sLen = s.length
    const tLen = t.length
    if (!sLen && !tLen) return 1
    if (!sLen || tLen > sLen) return 0
    const dp = Array(sLen).fill(0).map(i => Array(tLen).fill(0))
    const helper = (i = 0, j = 0) => {
        let res = 0
        if (i > sLen || j > tLen) return 0
        if (j === tLen - 1) return 1
        if (s[i] === t[j]) {
            res += helper(i + 1, j + 1) + helper(i + 1, j)
        } else {
            res += helper(i + 1, j)
        }
        dp[i][j] = res

    }
    return dp

};
// const res = numDistinct('rabbbit', "rabbit")
// console.log(res)

// 剑指 Offer II 003. 前n个数字二进制中1的个数
// 输入: n = 5 输出: [0,1,1,2,1,2]
// 解释: 0 --> 0 1 --> 1 2 --> 10 3 --> 11 4 --> 100 5 --> 101
var countBits = function (n) {
    const dp = Array(n + 1).fill(0)
    for (let i = 1; i <= n; i++) {
        const s = i
        const s2 = s.toString(2)
        dp[i] = s2.split('').filter(i => i === '1').length
    }

    return dp
};
// const res = countBits(5)
// console.log(res)

// 1646 获取生成数组中的最大值
// 给你一个整数 n 。按下述规则生成一个长度为 n + 1 的数组 nums ：
// nums[0] = 0
// nums[1] = 1
// 当 2 <= 2 * i <= n 时，nums[2 * i] = nums[i]
// 当 2 <= 2 * i + 1 <= n 时，nums[2 * i + 1] = nums[i] + nums[i + 1]
// 返回生成数组 nums 中的 最大 值。
var getMaximumGenerated = function (n) {
    if (n === 0) return 0
    if (n === 1) return 1
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    for (let i = 0; i <= n; i++) {
        let val = 2 * i
        if (val >= 2 && val <= n) dp[val] = dp[i]
        if (val + 1 >= 2 && val + 1 <= n) dp[val + 1] = dp[i] + dp[i + 1]
    }
    return Math.max(...dp)
};
// const res = getMaximumGenerated(7) //3
// console.log(res)

// 526
var countArrangement = function (n) {
    if (n <= 2) return n


};
// const res = countArrangement(2)
// console.log(res)

// 688
// 输入: n = 3, k = 2, row = 0, column = 0 输出: 0.0625 解释: 有两步(到(1,2)，(2,1))可以让骑士留在棋盘上。 在每一个位置上，也有两种移动可以让骑士留在棋盘上。 骑士留在棋盘上的总概率是0.0625。
var knightProbability = function (n, k, row, column) {
    // 放弃
    const dir = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [2, -1], [1, 2,], [2, 1]]
    const sum = Math.pow(8, k)
    let [count, i, j] = [0, row, column]

    while (k >= 0) {
        if (i < 0 || j < 0 || i >= n || j >= n) return
        if (k === 0) {
            if (i >= 0 && j >= 0 && i < n && j < n) count++
        }
        dir.map(item => {
            i += item[0]
            j += item[1]
            k++
        })
    }
    console.log(count)
    return sum
};
// const res = knightProbability(3, 2, 0, 0)
// console.log(res)

