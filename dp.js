// 剑指 Offer 10- I. 斐波那契数列
// F(0) = 0,   F(1) = 1
// F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
const fib = (n) => {
    const dp = [0, 1]
    for (let i = 2; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % (1e9 + 7) // % 1000000007 循环求余法
    }
    return dp[n]
};
// const res = fib(5)

// 「剑指 Offer 10- II. 青蛙跳台阶问题」
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
const numWays = (n) => {
    if (n === 0) return 1 // 为了通过，强行加的条件
    const dp = [null, 1, 2]
    for (let i = 3; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007
    }
    return dp[n]
}

// const res = numWays(3)


// 剑指 Offer 14- I. 剪绳子
// 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

// dp=max(dp[i],dp[i-j]*j,(i-j)*j)
const cuttingRope = (n) => {
    if (n <= 0) return
    const dp = [null, null, 1]
    for (let i = 3; i <= n; i++) {//长i的绳子
        dp[i] = 0
        for (let j = 1; j <= i - 1; j++) {//剪j米
            dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
        }
    }
    return dp[n]
}
// const res = cuttingRope(10)


// 「剑指 Offer 47. 礼物的最大价值」
// 在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

// 输入:
//     [
//         [1,3,1],
//         [1,5,1],
//         [4,2,1]
//     ]
// 输出: 12
// 解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物


const maxValue = (grid) => {
    if (!grid.length) return
    const [m, n] = [grid.length, grid[0].length]
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    dp[0][0] = grid[0][0]
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0] //第一列，只能向下走
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j] //第一行，只能向右走
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
        }
    }
    return dp[m - 1][n - 1]
}
// const res = maxValue([
//     [1, 3, 1],
//     [1, 5, 1],
//     [4, 2, 1]
// ])


// 「剑指 Offer 63. 股票的最大利润」
// 假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？

// 输入: [7,1,5,3,6,4]
// 输出: 5
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
const maxProfit = (prices) => {
    let min = prices[0]
    const dp = [0]//第i天的利润
    for (let i = 1; i < prices.length; i++) {//买卖不能同一天
        if (prices[i] < min) min = prices[i]
        dp[i] = Math.max(dp[i - 1], prices[i] - min) //利润最大：前一天的利润 or 当前价格-min
    }
    return dp[dp.length - 1]
}
// const res = maxProfit([7, 1, 5, 3, 6, 4])


// 剑指 Offer 46. 把数字翻译成字符串
// 给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
// 输入: 12258
// 输出: 5
// 解释: 12258有5种不同的翻译，分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"

const translateNum = (num) => {
    const str = `${num}` //转化成string
    const dp = [1, 1] //第i个最大可能
    const len = str.length
    for (let i = 2; i < len + 1; i++) {
        const preNum = parseInt(str[i - 2] + str[i - 1]) //之前的数字能不能成组
        if (preNum >= 10 && preNum <= 25) {
            dp[i] = dp[i - 1] + dp[i - 2] //能成组，之前分别之和
        } else {
            dp[i] = dp[i - 1] //不能成组之前算过，直接拿之前的值
        }
    }
    return dp[dp.length - 1]
}
const res = translateNum(12258)
console.log(res)
