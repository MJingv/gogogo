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

// 416. 分割等和子集
// 剑指 Offer II 101. 分割等和子集

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
const res = findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)
// 494. Target Sum


console.log(res)