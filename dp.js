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
const res = fib(5)
console.log(res)
