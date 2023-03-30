// 力扣第 300 题「 最长递增子序列」
// 输入：nums = [10,9,2,5,3,7,101,18] 输出：4 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
var lengthOfLIS = function (nums) {
    const len = nums.length
    // 以i结尾的最大长度
    let res = 1
    const dp = Array(len).fill(1)
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
                res = Math.max(res, dp[i])
            }
        }
    }
    return res
};
// const res = lengthOfLIS([4, 10, 4, 3, 8, 9])
// console.log(res)

// 1425. 带限制的子序列和 hard

// 368. 最大整除子集
// 给你一个由 无重复 正整数组成的集合 nums ，请你找出并返回其中最大的整除子集 answer ，子集中每一元素对 (answer[i], answer[j]) 都应当满足：
// answer[i] % answer[j] == 0 或 answer[j] % answer[i] == 0
// 输入：nums = [1,2,3] 输出：[1,2] 解释：[1,3] 也会被视为正确答案。
var largestDivisibleSubset = function (nums) {
    // a了少一半 max对，list不对
    const len = nums.length
    if (len === 1) return nums
    const dp = Array(len).fill(1)
    let max = 1
    list[0] = [nums[0]]
    nums.sort((a, b) => a - b)
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0) {
                list[i].push(nums[i])
                dp[i] = Math.max(dp[j] + 1, dp[i - 1])
                max = Math.max(dp[i], max)
                if (dp[i - 1] > dp[j] + 1) {
                    list[i] = list[i - 1]
                } else {
                    list[i] = [...list[j], nums[i]]
                }
            } else {
                if (j === i - 1 && list[i].length === 0) {
                    list[i] = list[i - 1]
                }
            }
        }
    }
    console.log(max, list)
    const res = list.find(item => item.length === max)
    return res
};
// const res = largestDivisibleSubset([1, 2, 4, 8, 16])
// console.log(res)


// 剑指 Offer II 091. 粉刷房子
// 假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。
// 输入: costs = [[17,2,17],[16,16,5],[14,3,19]] 输出: 10 解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。 最少花费: 2 + 5 + 3 = 10。
var minCost = function (costs) {

    const len = costs.length
    if (!len) return 0
    for (let i = 1; i < len; i++) {
        costs[i][0] += Math.min(costs[i - 1][1], costs[i - 1][2])
        costs[i][1] += Math.min(costs[i - 1][0], costs[i - 1][2])
        costs[i][2] += Math.min(costs[i - 1][0], costs[i - 1][1])
    }
    return Math.min(...costs[len - 1])
};
// const res = minCost([[17, 2, 17], [16, 16, 5], [14, 3, 19]])
// console.log(res)


// 返回 两栋 颜色 不同 房子之间的 最大 距离。
// 2078 两栋颜色不同且距离最远的房子
// 输入：colors = [1,1,1,6,1,1,1] 输出：3
// 输入：colors = [1,8,3,8,3] 输出：4
var maxDistance = function (colors) {
    // 暴力法
    const len = colors.length
    if (len === 2 && colors[0] !== colors[1]) return 1
    const n = Math.ceil(len / 2)
    let max = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < len; j++) {
            if (colors[i] !== colors[j]) {
                max = Math.max(max, Math.abs(i - j))
            }
        }
    }
    return max
};
// const res = maxDistance([1, 8, 3, 8, 3])
// console.log(res)


// 115. 不同的子序列 hard

// 139. 单词拆分
// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
var wordBreak = function (s, wordDict) {
    const n = s.length
    const dp = Array(n + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            const str = s.slice(j, i)
            if (dp[j] && wordDict.includes((str))) dp[i] = true
        }

    }
    return dp[n]
};
// const res = wordBreak('applepenapple', ["apple", "pen"])
// console.log(res)
// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"] 输出: false


// 221. 最大正方形
// 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
var maximalSquare = function (matrix) {
    // 不能从左上角开始，因为可能会变大，但是左上角不再变
    const [m, n] = [matrix.length, matrix[0].length]
    let max = 0
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))

    for (let i = 0; i < m; i++) {
        dp[i][0] = Number(matrix[i][0])
        if (matrix[i][0] === '1') max = 1
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = Number(matrix[0][j])
        if (matrix[0][j] === '1') max = 1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === '1') {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
                max = Math.max(max, dp[i][j])
            }
        }
    }

    return max * max

};
// const res = maximalSquare([
//     ["1", "1", "1", "1", "0"],
//     ["1", "1", "1", "1", "0"],
//     ["1", "1", "1", "1", "1"],
//     ["1", "1", "1", "1", "1"],
//     ["0", "0", "1", "1", "1"]])
// console.log(res)

// 343. 整数拆分


// 576. 出界的路径数
// 给你一个大小为 m x n 的网格和一个球。球的起始坐标为 [startRow, startColumn] 。你可以将球移到在四个方向上相邻的单元格内（可以穿过网格边界到达网格之外）。你 最多 可以移动 maxMove 次球。
// 给你五个整数 m、n、maxMove、startRow 以及 startColumn ，找出并返回可以将球移出边界的路径数量。因为答案可能非常大，返回对 109 + 7 取余 后的结果。
// 输入：m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0 输出：6
var findPaths = function (m, n, maxMove, startRow, startColumn) {
    // time out
    if (!maxMove) return 0
    const helper = (left, row, col) => {
        if (row >= m || col >= n || row < 0 || col < 0) return 1
        if (left === 0) return 0
        return helper(left - 1, row + 1, col) + helper(left - 1, row - 1, col) + helper(left - 1, row, col + 1) + helper(left - 1, row, col - 1)
    }
    return helper(maxMove, startRow, startColumn)
};
const findPaths1 = function (m, n, maxMove, startRow, startColumn) {
    if (!maxMove) return 0
    const memo = Array(m).fill(0).map(i => Array(n).fill(0).map((j) => Array(maxMove + 1).fill(0)))
    const helper = (left = maxMove, i = startRow, j = startColumn) => {
        if (i < 0 || j < 0 || i >= m || j >= n) return 1 //从这里累加
        if (!left) return 0
        if (memo[i][j][left]) return memo[i][j][left]
        const res = helper(left - 1, i - 1, j) + helper(left - 1, i + 1, j) + helper(left - 1, i, j - 1) + helper(left - 1, i, j + 1)
        memo[i][j][left] = res % 1000000007
        return memo[i][j][left]
    }
    return helper()
}
// const res = findPaths1(1, 3, 3, 0, 1)
// console.log(res)


// 剑指 Offer II 100. 三角形中最小路径之和
// 给定一个三角形 triangle ，找出自顶向下的最小路径和。
// 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
// 输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
// 输出：11
// 解释：如下面简图所示：
//    2
//   3 4
//  6 5 7
// 4 1 8 3
// 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
var minimumTotal = function (triangle) {
    const len = triangle.length
    const dp = Array(len).fill(Infinity).map(i => Array(len).fill(Infinity))

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < triangle[i].length; j++) {
            if (i === 0) {
                dp[0][0] = triangle[0][0]
                continue
            }
            if (j === 0) {
                dp[i][j] = dp[i - 1][j] + triangle[i][j]
                continue
            }
            dp[i][j] = Math.min(dp[i][j], Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j])
        }
    }
    return Math.min(...dp[len - 1])
};
var minimumTotal1 = function (triangle) {
    // 看不懂
    const len = triangle.length
    const dp = Array(len).fill(Infinity)
    dp[0] = triangle[0][0]
    for (let i = 1; i < len; i++) {
        dp[i] = dp[i - 1] + triangle[i][i]
        for (let j = i - 1; j >= 1; j--) {
            dp[j] = Math.min(dp[i], dp[j - 1] + triangle[i][j])
        }
    }
    return dp[len - 1]
}

// const res = minimumTotal1([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])
// console.log(res)

// 63. 不同路径 II
// 只能向下或者向右移动一步
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
var uniquePathsWithObstacles = function (obstacleGrid) {
    const [m, n] = [obstacleGrid.length, obstacleGrid[0].length]
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    dp[0][0] = obstacleGrid[0][0] === 1 ? 0 : 1
    for (let i = 0; i < m; i++) {
        dp[i][0] = obstacleGrid[i][0] === 1 ? 0 : 1
        if (obstacleGrid[i][0] === 1) break
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = obstacleGrid[0][j] === 1 ? 0 : 1
        if (obstacleGrid[0][j] === 1) break
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

            }
        }
    }
    return dp[m - 1][n - 1]
};
// const res = uniquePathsWithObstacles([[0,1],[0,0]])//2
// console.log(res)

// 剑指 Offer II 097. 子序列的数目 hard

// 输入：nums = [1,7,3,6,5,6] 输出：3 解释：
var pivotIndex = function (nums) {
    // 没通过

};
// const res = pivotIndex([-1, -1, -1, -1, -1, 0])
// console.log(res)

//119 杨辉三角
// 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。在「杨辉三角」中，每个数是它左上方和右上方的数的和。
// 输入: rowIndex = 3 输出: [1,3,3,1]
var getRow = function (rowIndex) {
    if (rowIndex === 0) return [1]
    const dp = Array(rowIndex + 1).fill(1).map((i, index) => Array(index + 1).fill(1))
    dp[0] = [1]
    dp[1] = [1, 1]
    for (let i = 2; i <= rowIndex; i++) {
        for (let j = 1; j < dp[i].length - 1; j++) {
            dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
        }
    }
    return dp[rowIndex]

};
// const res = getRow(3)
// console.log(res)

//1137
// T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2
// T_4 = 1 + 1 + 2 = 4
var tribonacci = function (n) {
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
    }
    return dp[n]
};
var tribonacci1 = function (n) {
    if (n === 0) return 0
    if (n === 1) return 1
    if (n === 2) return 1
    let [a, b, c] = [0, 1, 1]
    for (let i = 3; i <= n; i++) {
        const tmp = a + b + c
        a = b
        b = c
        c = tmp
    }
    return c
}
// const res = tribonacci1(4)
// console.log(res)

// 17.16 按摩师
// 一个有名的按摩师会收到源源不断的预约请求，每个预约都可以选择接或不接。在每次预约服务之间要有休息时间，因此她不能接受相邻的预约。给定一个预约请求序列，替按摩师找到最优的预约集合（总预约时间最长），返回总的分钟数。
// 输入： [2,7,9,3,1] 输出： 12 解释： 选择 1 号预约、 3 号预约和 5 号预约，总时长 = 2 + 9 + 1 = 12。
var massage = function (nums) {
    const len = nums.length
    if (!len) return 0
    const dp = Array(len).fill(Infinity)
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    }
    return dp[len - 1]
};
// const res = massage([2, 7, 9, 3, 1])
// console.log(res)

// 05.03
var reverseBits = function (num) {
    let r = num
    if (num < 0) {
        num = (parseInt(num) >>> 0).toString(2)
    } else {
        num = num.toString(2)
    }
    if (!String(num).includes('0')) {
        if (r > 0) return num.length + 1
        return num.length
    }
    const list = String(num).split('0')
    const len = list.length
    if (!len) return 0
    let max = 0
    for (let i = 0; i < len - 1; i++) {
        max = Math.max(list[i].length + list[i + 1].length + 1, max)
    }
    return max
};
// const res = reverseBits(-1)
// console.log(res)

// 91. 解码方法
// 给你一个只含数字的 非空 字符串 s ，请计算并返回 解码 方法的 总数 。
var numDecodings = function (s) {
    // 还是要想明白为什么 dp[i]=dp[i-1]+dp[i-2]
    if (!s) return 0
    s = ' ' + s // 为什么要加一个空，可能dp[1]的时候不好算
    const len = s.length
    if (!len) return 0
    const dp = Array(len).fill(0)
    dp[0] = 1
    for (let i = 1; i < len; i++) {
        if (Number(s[i]) >= 1) dp[i] += dp[i - 1]
        if (i > 1) {
            const tmp = `${s[i - 1]}${s[i]}`
            const n = Number(tmp)
            if (n >= 10 && n <= 26) {
                dp[i] += dp[i - 2]
            }
        }
    }
    return dp[len-1]
};
const res = numDecodings('2101')
console.log(res)