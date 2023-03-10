// 动态规划一般就是求最值，核心是穷举
// bad case 状态 选择 定义dp


// 509. 斐波那契数
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
const res = fib1(5)
console.log(res)

// 322. 零钱兑换
// 剑指 Offer II 103. 最少的硬币数目