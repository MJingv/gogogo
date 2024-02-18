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


// const res = maxProfit([3, 3, 5, 0, 0, 3, 1, 4])


// todo 这个重点复习，以第i结尾string，记得 &&dp[j]
// 139. Word Break
// 输入: s = "leetcode", wordDict = ["leet", "code"]
var wordBreak = function (s, wordDict) {
    const [n, len] = [s.length, wordDict.length]
    const dp = Array(n + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = s.slice(j, i)
            if (wordDict.includes(tmp) && dp[j]) dp[i] = true
        }
    }
    return dp[n]
};
// const res = wordBreak('leetcode', ["leet", "code"])


// 198. House Robber
// 输入：[1,2,3,1] 输出：4 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。 偷窃到的最高金额 = 1 + 3 = 4 。
var rob = function (nums) {
    const len = nums.length
    if (!len) return 0
    if (len === 1) return nums[0]
    const dp = Array(len).fill(0)
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    }

    return Math.max(...dp)

};
// const res = rob([1, 2, 3, 1])


// 213. House Robber II
// 环形输入：nums = [2,3,2] 输出：3
var rob = function (nums) {
    const len = nums.length
    if (!len) return 0
    if (len === 1) return nums[0]
    if (len === 2) return Math.max(nums[0], nums[1])
    const helper = (list = []) => {
        const n = list.length
        const dp = Array(n).fill(0)
        dp[0] = list[0]
        dp[1] = Math.max(list[0], list[1])
        for (let i = 2; i < n; i++) {
            dp[i] = Math.max(list[i], dp[i - 1], dp[i - 2] + list[i])
        }
        return dp[n - 1]

    }
    return Math.max(helper(nums.slice(1)), helper(nums.slice(0, len - 1)))
};
// const res = rob([2, 3, 2])

// 221. Maximal Square

var maximalSquare = function (matrix) {
    const [m, n] = [matrix.length, matrix[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(0))
    let res = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0) {
                dp[0][j] = Number(matrix[0][j])
                res = Math.max(res, dp[0][j])
            } else if (j === 0) {
                dp[i][0] = Number(matrix[i][0])
                res = Math.max(res, dp[i][0])

            } else {
                if (matrix[i][j] === '1') {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1 // todo 这个是关键，取min
                    res = Math.max(res, dp[i][j])
                }
            }
        }
    }
    return res * res

};
// const res = maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]])

// 300. Longest Increasing Subsequence
// todo  多练
var lengthOfLIS = function (nums) {
    const len = nums.length
    const dp = Array(len).fill(1)// 以i结尾最大
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1)
        }
    }
    return Math.max(...dp)
};
// 输入：nums = [10,9,2,5,3,7,101,18] 输出：4 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4
// const res = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])

// 322. Coin Change
// 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
var coinChange = function (coins, amount) {
    const len = coins.length
    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
};
// const res = coinChange([1, 2, 5], 11)

// 338. Counting Bits
// 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。
var countBits = function (n) {
    if (!n) return 0
    const dp = Array(n + 1).fill(0)
    for (let i = 1; i <= n; i++) {
        dp[i] = Number(i).toString(2).split('').filter(k => k === '1').length
    }
    return dp

};
// const res = countBits(2)

// 343. Integer Break
// 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。返回 你可以获得的最大乘积 。
// 输入: n = 10 输出: 36 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
var integerBreak = function (n) {
    if (n <= 1) return
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    for (let i = 2; i <= n; i++) {
        for (let j = i - 1; j >= 1; j--) {
            dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
        }
    }
    return dp[n]

};
// const res = integerBreak(10)


// 354. Russian Doll Envelopes
// 给你一个二维整数数组 envelopes ，其中 envelopes[i] = [wi, hi] ，表示第 i 个信封的宽度和高度。
// 请计算 最多能有多少个 信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。
// 输入：envelopes = [[5,4],[6,4],[6,7],[2,3]]输出：3解释：最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
var maxEnvelopes = function (envelopes) {
    // timeout
    // 重新排序后求最长递增子序列
    const [m, n] = [envelopes.length, envelopes[0].length]
    envelopes.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1]
        } else {
            return a[0] - b[0]
        }
    })


    const dp = Array(m).fill(1)
    dp[0] = 1
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < i; j++) {
            if (envelopes[j][1] < envelopes[i][1]) {
                dp[i] = Math.max(dp[j] + 1, dp[i])
            }
        }
    }
    return Math.max(...dp)
};
var maxEnvelopes1 = function (envelopes) {
    if (!envelopes.length) return 0
    envelopes.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1]
        } else {
            return a[0] - b[0]
        }
    })
    const height = envelopes.map(i => i[1])
    const dp = [height[0]]
    for (let i = 1; i < height.length; i++) {
        // 二分求最长子序列，看不懂
    }
    return height
}
// const res = maxEnvelopes1([[5, 4], [6, 4], [2, 3], [6, 7]])

// 368. Largest Divisible Subset
// 输入：nums = [1,2,4,8] 输出：[1,2,4,8]
var largestDivisibleSubset = function (nums) {
    const len = nums.length
    nums.sort((a, b) => a - b)
    const list = Array(len).fill(0).map(() => Array(1).fill(0))
    for (let i = 0; i < len; i++) {
        list[i] = [nums[i]]
    }

    const dp = Array(len).fill(1)
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0 && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1
                list[i] = [...list[j], nums[i]];
            }
        }
    }
    list.sort((a, b) => a.length - b.length)
    return list[len - 1]

};
// 测试用例:[4,8,10,240] 	期望结果:[4,8,240]
// const res = largestDivisibleSubset([4, 8, 10, 240])

// 376. Wiggle Subsequence
// 输入：nums = [1,7,4,9,2,5] 输出：6 解释：整个序列均为摆动序列，各元素之间的差值为 (6, -3, 5, -7, 3) 。
var wiggleMaxLength = function (nums) {
    // 最长子序列的长度
    const len = nums.length
    if (len <= 2) return len
    const up = Array(len).fill(1)
    const down = Array(len).fill(1)
    for (let i = 1; i < len; i++) {
        if (nums[i] > nums[i - 1]) {
            up[i] = Math.max(up[i], down[i - 1] + 1)
            down[i] = down[i - 1]

        } else if (nums[i < nums[i - 1]]) {
            down[i] = Math.max(down[i], up[i - 1] + 1)
            up[i] = up[i - 1]

        } else {
            up[i] = up[i - 1]
            down[i] = down[i - 1]
        }
    }
    return Math.max(up[len - 1], down[len - 1])

};
const res = wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9])

console.log(res)