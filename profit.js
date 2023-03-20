// 买卖股票专题

// 63
// 121. 买卖股票的最佳时机
// 输入：prices = [7,1,5,3,6,4] 输出：7 解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。 随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。 总利润为 4 + 3 = 7 。
var maxProfit = function (prices) {
    const n = prices.length
    const dp = Array(n).fill(0).map(i => Array(2).fill(0))
    // 第i天卖了
    // dp[i][0] =Math.max(dp[i-1][0],dp[i-1][1]+prices[i])
    // 第i天买了
    // dp[i][1] =Math.max(dp[i-1][1],-prices[i])
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for (let i = 1; i < n; i++) {
        // 现在没有股票
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        // 现在有股票
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i])

    }
    return dp[n - 1][0]
};
// const res = maxProfit([7, 6, 4, 3, 1])
// console.log(res)

// 剑指 Offer 63. 股票的最大利润
// 只能交易1次
// 输出: 5 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。 注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
var maxProfit63 = function (prices) {
    const len = prices.length
    if (!len) return 0
    const dp = Array(len).fill(0)
    let min = prices[0]
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(dp[i - 1], prices[i] - min)
        min = Math.min(min, prices[i])
    }
    return dp[len - 1]
};
// const res = maxProfit63([7, 1, 5, 3, 6, 4])
// console.log(res)

// 122. 买卖股票的最佳时机 II
// 可以交易多次
var maxProfit122 = function (prices) {
    const len = prices.length
    const dp = Array(len).fill(0).map(i => Array(2).fill(0))
    // 没有股票
    // dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    // 有股票
    // dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])

    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for (let i = 1; i < len; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    }
    return dp[len - 1][0]

};
// const res = maxProfit122([7, 1, 5, 3, 6, 4]) //7
// console.log(res)

// 309. 最佳买卖股票时机含冷冻期
// 可以多次交易，冷冻期为 1 天
// 输入: prices = [1,2,3,0,2] 输出: 3 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
var maxProfit309 = function (prices) {
    const len = prices.length
    const dp = Array(len).fill(0).map(() => Array(2).fill(0))

    for (let i = 0; i < len; i++) {
        if (i === 0) {
            dp[0][0] = 0
            dp[0][1] = -prices[0]
            continue
        }
        if (i === 1) {
            dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[1])
            dp[1][1] = Math.max(dp[i - 1][1], -prices[1])
            continue

        }
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i])
    }

    return dp[len - 1][0]
};
// const res = maxProfit309([1, 2, 3, 0, 2])
// console.log(res)

// 714 买卖股票的最佳时机含手续费
// 可以多次交易，有手续费
// 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
// 输入：prices = [1, 3, 2, 8, 4, 9], fee = 2 输出：8
var maxProfit714 = function (prices, fee) {
    const len = prices.length
    const dp = Array(len).fill(0).map(() => Array(2).fill(0))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for (let i = 1; i < len; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee)
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    }
    return dp[len - 1][0]
};
// const res = maxProfit714([1, 3, 2, 8, 4, 9], 2)
// console.log(res)

// 123. 买卖股票的最佳时机 III hard
// 最多2次交易
var maxProfit123 = function (prices) {
    const len = prices.length
    if (!len) return 0
    const max_k = 2
    const dp = Array(len).fill(0).map(i => Array(max_k + 1).fill(0).map(j => Array(2).fill(0)))
    // dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
    // dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
    for (let i = 0; i < len; i++) {
        for (let k = max_k; k > 0; k--) {
            if (i === 0) {
                dp[i][k][0] = 0
                dp[i][k][1] = -prices[i]
                continue
            }
            dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
            dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]) //买的时候做限制
        }
    }
    return dp[len - 1][max_k][0]
};
// const res = maxProfit123([3, 3, 5, 0, 0, 3, 1, 4])
// console.log(res)

// 188. 买卖股票的最佳时机 IV hard
// 最多k次交易
// 给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
var maxProfit188 = function (k, prices) {
    const len = prices.length
    if (!len) return 0
    const dp = Array(len).fill(0).map(i => Array(k + 1).fill(0).map(j => Array(2).fill(0)))

    for (let i = 0; i < len; i++) {
        for (let j = k; j > 0; j--) {
            if (i === 0) {
                dp[i][j][0] = 0
                dp[i][j][1] = -prices[i]
                continue
            }
            dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
            dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i])
        }
    }
    return dp[len - 1][k][0]

};
// const res = maxProfit188(2, [3, 2, 6, 5, 0, 3])
// console.log(res)


// 输入股票价格数组 prices，你最多进行 max_k 次交易，每次交易需要额外消耗 fee 的手续费，而且每次交易之后需要经过 cooldown 天的冷冻期才能进行下一次交易，请你计算并返回可以获得的最大利润。
const maxProfit_all_in_one = (max_k, prices, cooldown, fee) => {
    const len = prices.length
    const dp = Array(len).fill(0).map(i => Array(max_k + 1).fill(0).map(j => Array(2).fill(0)))
    for (let i = 0; i < len; i++) {
        for (let k = max_k; k > 0; k--) {
            if (i === 0) {
                dp[i][k][0] = 0
                dp[i][k][1] = -prices[i]
                continue
            }
            if (i === 1) {
                dp[1][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i] - fee)
                dp[1][k][1] = Math.max(dp[i - 1][k][1], -prices[i])
                continue
            }
            dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i] - fee)
            dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 2][k - 1][0] - prices[i])
        }
    }


    return dp

}

const res = maxProfit_all_in_one(2, [3, 2, 6, 5, 0, 3], 2, 2)
console.log(res)