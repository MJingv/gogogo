// 背包问题
// 给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。
// 其中第 i 个物品的重量为 wt[i]，价值为 val[i]。
// 现在让你用这个背包装物品，每个物品只能用一次，在不超过被包容量的前提下，最多能装的价值是多少？
const backpack = (n, w, wt, val) => {
    const dp = Array(n + 1).fill(0).map(() => Array(w + 1).fill(0))
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= w; j++) {
            if (j >= wt[i - 1]) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - wt[i - 1]] + val[i - 1])
            }
        }
    }
    return dp[n][w]
}
// const res = backpack(N = 3, W = 4, wt = [2, 1, 3], val = [4, 2, 3]) //6

// 518零钱兑换
var change = function (amount, coins) {
    const len = coins.length
    const dp = Array(amount + 1).fill(0)
    dp[0] = 1

    for (let i = 0; i < len; i++) { //重复计算
        for (let j = 1; j < amount + 1; j++) {
            if (j >= coins[i]) {
                dp[j] += dp[j - coins[i]]
            }
        }
    }
    return dp[amount]
};
// const res = change(5, [1, 2, 5])


// 474. Ones and Zeroes
// 输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3 输出：4
var findMaxForm = function (strs, m, n) {
    const len = strs.length
    if (!len) return 0
    let res = 0
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0))
    const list = Array(len).fill(0).map(() => Array(2).fill(0))
    strs.map((i, index) => {
        list[index][0] = i.split('').filter(k => k === '0').length
        list[index][1] = i.split('').filter(k => k === '1').length
    })

    for (let k = 0; k < len; k++) {
        const zero = list[k][0]
        const one = list[k][1]
        for (let i = m; i >= zero; i--) {
            for (let j = n; j >= one; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zero][j - one] + 1)

            }
        }
    }


    return dp[m][n]
};
// const res = findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)


// 494. Target Sum
// 输入：nums = [1,1,1,1,1], target = 3 输出：5
var findTargetSumWays = function (nums, target) {
    // 正数和p，负数和n
    // p+n=sum
    // p-n=target
    // p= (sum+target)/2
    const len = nums.length
    if (!len) return 0
    const sum = nums.reduce((a, b) => a + b)
    if (sum < Math.abs(target) || (sum + target) % 2) return 0
    const aim = (sum + target) / 2
    const dp = Array(aim + 1).fill(0) //目标是n的个数
    dp[0] = 1

    for (let i = 0; i < len; i++) {
        const cur = nums[i]
        for (let j = aim; j >= cur; j--) {
            dp[j] += dp[j - cur]
        }
    }

    return dp[aim] || 0

};

var findTargetSumWays1 = function (nums, target) {
    const len = nums.length
    let res = 0
    const helper = (i = 0, s = 0) => {
        if (i === len) {
            if (s === target) res++
            return
        }
        s += nums[i]
        helper(i + 1, s)
        s -= nums[i]

        s -= nums[i]
        helper(i + 1, s)
        s += nums[i]
    }
    helper()
    return res
}

// const res = findTargetSumWays1([1, 1, 1, 1, 1], 3)//5


// 416. 分割等和子集
// 剑指 Offer II 101. 分割等和子集
var canPartition = function (nums) {
    const len = nums.length
    if (!len) return false
    const sum = nums.reduce((a, b) => a + b)
    if (sum % 2) return false
    const target = sum / 2
    const dp = Array(target + 1).fill(false)
    dp[0] = true
    for (let i = 0; i < len; i++) {
        for (let j = target; j >= nums[i]; j--) {
            dp[j] = dp[j] || dp[j - nums[i]]
        }
    }


    return dp[target]
};
const res = canPartition([1, 2, 3, 5])
// 输入：nums = [1,5,11,5] 输出：true 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
// game


// 64. 最小路径和
// 剑指 Offer II 099. 最小路径之和
// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]] 输出：7


var minPathSum = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(Infinity))
    dp[0][0] = grid[0][0]
    for (let j = 1; j < n; j++) {
        dp[0][j] = grid[0][j] + dp[0][j - 1]
    }
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }

    }

    return dp[m - 1][n - 1]

};
// const res = minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])

// 力扣第 174 题「地下城游戏」
var calculateMinimumHP = function (dungeon) {
    const [m, n] = [dungeon.length, dungeon[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(-Infinity))
    // 不太懂


};
// const res = calculateMinimumHP([[-2, -3, 3], [-5, -10, 1], [10, 30, -5]])//7


// 787. K 站中转内最便宜的航班
var findCheapestPrice = function (n, flights, src, dst, k) {
    const len = flights.length
    const dp = Array(n).fill(0).map(() => Array(k + 2).fill(Infinity))
    for (let i = 0; i <= k + 1; i++) {
        dp[src][i] = 0;
    }

    for (let i = 1; i <= k + 1; i++) {
        for (let [u, v, cost] of flights) {
            dp[v][i] = Math.min(dp[v][i], dp[u][i - 1] + cost)

        }
    }
    return dp[dst][k + 1] === Infinity ? -1 : dp[dst][k + 1]

};
// const res = findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1)







console.log(res)