// 买卖股票专题

// 63
// 121. 买卖股票的最佳时机
// 输入：prices = [7,1,5,3,6,4] 输出：7 解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。 随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。 总利润为 4 + 3 = 7 。
var maxProfit = function (prices) {
    const n = prices.length
    const dp = Array(n).fill(0)
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            dp[i] = Math.max(dp[i], prices[j] - prices[i])
        }
    }
    return dp
};
const res = maxProfit([7, 6, 4, 3, 1])
console.log(res)
// 剑指 Offer 63. 股票的最大利润


// 122. 买卖股票的最佳时机 II

// 309. 最佳买卖股票时机含冷冻期


// 714 买卖股票的最佳时机含手续费
// 输入：prices = [1, 3, 2, 8, 4, 9], fee = 2 输出：8
var maxProfit1 = function (prices, fee) {
    const n = prices.length
    const dp = Array(n).fill(0).map(i => Array(n).fill(0))

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            dp[i][j] = Math.max(dp[i][j], prices[j] - prices[i],)
        }
    }
    return dp
};
// const res = maxProfit1([1, 3, 2, 8, 4, 9], 2)
// console.log(res)


// 123. 买卖股票的最佳时机 III hard


// 188. 买卖股票的最佳时机 IV hard
// 给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
var maxProfit5 = function (k, prices) {

};
// const res = maxProfit5()
// console.log(res)