// top100 dp

// 70. Climbing Stairsx
var climbStairs = function (n) {
    if (n <= 3) return n
    let a = 2, b = 3
    for (let i = 4; i <= n; i++) {
        const tmp = a + b
        a = b
        b = tmp
    }
    return b
};
// const res = climbStairs(4)

// 53. Maximum Subarray
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4] 输出：6 解释：连续子数组 [4,-1,2,1] 的和最大，为 6
var maxSubArray = function (nums) {
    const len = nums.length;
    if (len === 1) return nums[0]
    const dp = Array(len).fill(-Infinity) //以i结尾的和最大
    dp[0] = nums[0]
    let res = dp[0]

    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
        res = Math.max(res, dp[i])

    }
    return res
};
// const res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])


// 62. Unique Paths
// 输入：m = 3, n = 7 输出：28
var uniquePaths = function (m, n) {
    const dp = Array(m).fill(0).map(() => Array(n).fill(0))
    for (let i = 0; i < m; i++) dp[i][0] = 1
    for (let j = 0; j < n; j++) dp[0][j] = 1

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }


    return dp[m - 1][n - 1]

};
// const res = uniquePaths(3, 7)

// 63. Unique Paths II
// 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]] 输出：2
var uniquePathsWithObstacles = function (obstacleGrid) {
    if (obstacleGrid[0][0] === 1) return 0
    const [m, n] = [obstacleGrid.length, obstacleGrid[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(0))
    dp[0][0] = 1
    for (let i = 1; i < m; i++) dp[i][0] = (obstacleGrid[i][0] === 0 && dp[i - 1][0] === 1) ? 1 : 0
    for (let j = 1; j < n; j++) dp[0][j] = (obstacleGrid[0][j] === 0 && dp[0][j - 1] === 1) ? 1 : 0

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 0) dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
};
// const res = uniquePathsWithObstacles([[0, 0], [1, 1], [0, 0]])


// 64. Minimum Path Sum
// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]] 输出：7 解释：因为路径 1→3→1→1→1 的总和最小。
// 说明：每次只能向下或者向右移动一步。
var minPathSum = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    const dp = Array(m).fill(Infinity).map(() => Array(n).fill(Infinity))
    dp[0][0] = grid[0][0]
    for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0]
    for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j]
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }
    }

    return dp[m - 1][n - 1]
}
// const res = minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])


// 120. Triangle
// 输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]] 输出：11
var minimumTotal = function (triangle) {
    const m = triangle.length
    const n = triangle[m - 1].length
    const dp = Array(m).fill(Infinity).map(() => Array(n).fill(Infinity))
    dp[0][0] = triangle[0][0]

    for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + triangle[i][0]
    for (let i = 1; i < m; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j]
        }
    }
    return Math.min(...dp[m - 1])
};
// const res = minimumTotal([[-1], [-2, -3]])

// 121. Best Time to Buy and Sell Stock
// 输入：[7,1,5,3,6,4] 输出：5


var maxProfit = function (prices) {
    const len = prices.length
    const dp = Array(len).fill(-Infinity).map(() => Array(2).fill(-Infinity))
    dp[0][0] = 0;
    dp[0][1] = -prices[0];
    for (let i = 1; i < len; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i]) //当天有，只能买一次，所以没有之前的利润

    }
    return dp[len - 1][0]
}
// const res = maxProfit([7, 1, 5, 3, 6, 4])

// 122. Best Time to Buy and Sell Stock II
// 输入：prices = [7,1,5,3,6,4] 输出：7 解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。 随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。 总利润为 4 + 3 = 7 。
var maxProfit = function (prices) {
    const len = prices.length
    const dp = Array(len).fill(0).map(() => Array(2).fill(-Infinity))
    dp[0] = [0, -prices[0]]
    for (let i = 1; i < len; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    }
    return dp[len - 1][0]

};
// const res = maxProfit([7, 1, 5, 3, 6, 4])


// 123. Best Time to Buy and Sell Stock III
// 最多2次交易
// 输入：prices = [3,3,5,0,0,3,1,4] 输出：6 解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。 随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
var maxProfit = function (prices) {
    const len = prices.length
    const max_k = 2
    const dp = Array(len).fill(0).map(() => Array(max_k + 1).fill(0).map(() => Array(2).fill(-Infinity)))

    for (let i = 0; i < len; i++) {
        dp[i][0][0] = 0;
        dp[i][0][1] = -Infinity;
        for (let k = max_k; k > 0; k--) {
            if (i === 0) {
                dp[0][k][0] = 0
                dp[0][k][1] = -prices[0]
            } else {
                dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
                dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
            }

        }
    }
    return dp[len - 1][max_k][0]
}


const res = maxProfit([3, 3, 5, 0, 0, 3, 1, 4])


// 139. Word Break
// 198. House Robber
// 213. House Robber II
// 221. Maximal Square
// 300. Longest Increasing Subsequence
// 322. Coin Change
// 338. Counting Bits
// 343. Integer Break
// 354. Russian Doll Envelopes
// 368. Largest Divisible Subset
// 376. Wiggle Subsequence


console.log(res)