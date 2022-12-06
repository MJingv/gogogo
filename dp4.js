// 322 题「 零钱兑换」
var coinChange = function (coins, amount) {
    if (amount === 0) return 0
    const len = coins.length
    if (!len) return -1
    const dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0

    for (let i = 1; i < amount + 1; i++) {

        for (let j = 0; j < len; j++) {
            if (coins[j] <= i) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
            }
        }
    }


    return dp[amount]

};
// const res = coinChange(coins = [1, 2, 5], amount = 11)
// console.log(res)

// 221. 最大正方形
var maximalSquare = function (matrix) {

    const [m, n] = [matrix.length, matrix[0].length]
    if (!m || !n) return 0
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    let max = 0

    for (let i = 0; i < m; i++) {
        dp[i][0] = matrix[i][0]
        if (dp[i][0] === '1') max = 1
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = matrix[0][j]
        if (dp[0][j] === '1') max = 1

    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === '1') {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1 //求最小边长
                max = Math.max(max, dp[i][j])
            }
        }
    }

    return max * max

};
// const res = maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]])
// console.log(res)

// 139. 单词拆分
var wordBreak = function (s, wordDict) {
    const len = s.length
    const dp = Array(len + 1).fill(false)
    dp[0] = true

    for (let i = 1; i <= len; i++) {

        for (let j = 0; j < i; j++) {
            const str = s.slice(j, i)
            if (dp[j] && wordDict.includes(str)) {
                dp[i] = true
            }
        }
    }
    return dp[len]
};
// const res = wordBreak(s = "applepenapple", wordDict = ["apple", "pen"])
// console.log(res)

// 97. 交错字符串
var isInterleave = function (s1, s2, s3) {
    const [l1, l2, l3] = [s1.length, s2.length, s3.length]
    if (!l1 && !l2 && !l3) return true
    if (l1 + l2 !== l3) return false
    const memo = Array(l1 + 1).fill(-1).map(i => Array(l2 + 1).fill(-1))


    const dp = (s1, i, s2, j, s3) => {
        const k = i + j
        let res = false
        if (k === l3) return true

        if (memo[i][j] !== -1) return memo[i][j] === 1

        if (i < l1 && s1[i] === s3[k]) {
            res = dp(s1, i + 1, s2, j, s3)
        }
        if (j < l2 && s2[j] === s3[k]) {
            res = res || dp(s1, i, s2, j + 1, s3)
        }
        memo[i][j] = res ? 1 : 0
        return res


    }
    return dp(s1, 0, s2, 0, s3)


};
// const res = isInterleave(s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac")
// console.log(res)


var reverseStr = function (s, k) {
    const list = []
    const len = s.length
    const r = s => s.split('').reverse().join('')
    for (let i = 0; i < len; i += 2 * k) {
        const str = s.slice(i, i + k)
        list.push(r(str))
        list.push(s.slice(i + k, i + 2 * k))
    }
    return list.join('')

};
// const res = reverseStr('abcdefg', 3)//cbadefg
// console.log(res)


// 264. 丑数 II
var nthUglyNumber = function (n) {
    if (n === 1) return n
    let [a, b, c] = [0, 0, 0]
    const dp = []
    dp[0] = 1
    for (let i = 1; i < n; i++) {
        dp[i] = Math.min(dp[a] * 2, dp[b] * 3, dp[c] * 5)
        if (dp[i] === dp[a] * 2) a++
        if (dp[i] === dp[b] * 3) b++
        if (dp[i] === dp[c] * 5) c++
    }

    return dp[n - 1]

};
// [1, 2, 3, 4, 5, 6, 8, 9, 10, 12]
// const res = nthUglyNumber(10)//12
// console.log(res)


// 120. 三角形最小路径和
// 输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]] 输出：11
var minimumTotal = function (triangle) {
    const len = triangle.length
    if (len === 1) return triangle[0]
    const dp = Array(len).fill(Infinity).map(i => Array(len).fill(Infinity))
    dp[0][0] = triangle[0][0]
    let min = Infinity
    for (let i = 1; i < len; i++) {
        dp[i][0] = dp[i - 1][0] + triangle[i][0]
    }

    for (let i = 1; i < len; i++) {
        for (let j = 1; j < i + 1; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j]
            if (i === len - 1) {
                min = Math.min(dp[i][j], min)
            }

        }
    }
    return min

};
// const res = minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])
// console.log(res)

// 343. 整数拆分
// 输入: n = 10 输出: 36 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
var integerBreak = function (n) {
    const dp = Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        for (let j = i - 1; j >= 1; j--) {
            dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
        }

    }
    return dp[n]
};
// const res = integerBreak(10)
// console.log(res)

// 698. 划分为k个相等的子集
// 输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4 输出： True 说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
// 输入: nums = [1,2,3,4], k = 3 输出: false
var canPartitionKSubsets = function (nums, k) {
    const len = nums.length
    const sum = nums.reduce((a, b) => a + b)
    if (sum % k) return false
    const target = sum / k
    nums.sort((a, b) => b - a)
    if (nums[0] > target) return false
    const bucket = Array(k).fill(0)


    const backtrack = (index = 0) => {
        if (index === len) return true
        for (let i = 0; i < k; i++) {
            //第几个桶
            if (bucket[i] + nums[index] > target) continue
            if (bucket[i] === bucket[i - 1]) continue
            bucket[i] += nums[index]
            if (backtrack(index + 1)) return true
            bucket[i] -= nums[index]
        }
        return false
    }
    return backtrack() //第几个求

};
// const res = canPartitionKSubsets([2, 2, 2, 2, 3, 4, 5], 4)
// console.log(res)

// 面试题 08.11. 硬币
// 输入: n = 10 输出：4 解释: 有四种方式可以凑成总金额: 10=10 10=5+5 10=5+1+1+1+1+1 10=1+1+1+1+1+1+1+1+1+1
var waysToChange = function (n) {
    const coins = [1, 5, 10, 25]
    const len = coins.length
    const dp = Array(n + 1).fill(0)// i元多少种方式
    dp[0] = 1
    for (let j = 0; j < len; j++) {
        for (let i = 1; i <= n; i++) {
            if (i >= coins[j]) {
                dp[i] = (dp[i] + dp[i - coins[j]]) % 1000000007;
            }
        }
    }
    return dp[n]
};
// const res = waysToChange(10)
// console.log(res)

// 746. 使用最小花费爬楼梯
// 输入：cost = [1,100,1,1,1,100,1,1,100,1] 输出：6
// 输入：cost = [10,15,20] 输出：15
var minCostClimbingStairs = function (cost) {
    const len = cost.length
    const dp = Array(len + 1).fill(Infinity)
    dp[0] = dp[1] = 0
    for (let i = 2; i <= len; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    }
    return dp[len]
};
// const res = minCostClimbingStairs([10, 15, 20])//15
// console.log(res)


//338. 比特位计数
// 输入：n = 2
// 输出：[0,1,1]
// 解释：0 --> 0 1 --> 1 2 --> 10
var countBits = function (n) {
    const dp = Array(n + 1).fill(0)
    for (let i = 1; i <= n; i++) {
        dp[i] = Number(i).toString(2).split('').filter(i => i === '1').length
    }
    return dp

};
var countBits1 = function (n) {
    const dp = Array(n + 1).fill(0)
    for (let i = 1; i <= n; i++) {
        if (i % 2) {
            dp[i] = dp[(i - 1) / 2] + 1
        } else {
            dp[i] = dp[i / 2]
        }
    }
    return dp

};
// const res = countBits1(5)
// console.log(res)

// 983. 最低票价
// 输入：days = [1,4,6,7,8,20], costs = [2,7,15] // 1 7 30
// 输出：11
var mincostTickets = function (days, costs) {
    const [len, min, max] = [days.length, days[0], days[days.length - 1]]
    const dp = Array(366 + 30).fill(0) // 从i到end花的最少钱
    dp[1] = costs[0]
    for (let i = len - 1, d = max; d >= min; d--) {
        if (d === days[i]) {
            // 出门
            dp[d] = Math.min(dp[d + 1] + costs[0], dp[d + 7] + costs[1], dp[d + 30] + costs[2])
            i--
        } else {
            // 不出门
            dp[d] = dp[d + 1]
        }

    }
    return dp[min]
};
// const res = mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15])
// console.log(res)

// 1277. 统计全为 1 的正方形子矩阵
var countSquares = function (matrix) {
    const [m, n] = [matrix.length, matrix[0].length]
    const dp = Array(m).fill(0).map(i => Array(n).fill(0)) // 以0-i为边长的正方形
    let res = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = matrix[i][j]
            } else if (matrix[i][j] === 0) {
                dp[i][j] = 0
            } else if (matrix[i][j] === 1) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
            }
            res += dp[i][j]
        }
    }
    return res
};
// const res = countSquares([
//     [0, 1, 1, 1],
//     [1, 1, 1, 1],
//     [0, 1, 1, 1]
// ]) //15
// console.log(res)


var largest1BorderedSquare = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    const dp = Array(m).fill(0).map(i => Array(n).fill(0))
    let res = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = grid[i][j]

            } else if (dp[i - 1][j] || dp[i][j - 1] || grid[i][j]) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + 1
            }
            res = Math.max(dp[i][j], res)
        }
    }
    console.log(dp)

    return res * res
};
// const res = largest1BorderedSquare([
//         [1, 1, 1],
//         [1, 0, 1],
//         [1, 1, 1]
//     ]
// )
// console.log(res)

// 1314. 矩阵区域和
var matrixBlockSum = function (mat, k) {

};
// const res = matrixBlockSum([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1)
// console.log(res)

// 688. 骑士在棋盘上的概率
var knightProbability = function (n, k, row, column) {

};
// const res = knightProbability(3, 2, 0, 0)
// console.log(res)

var combinationSum4 = function (nums, target) {
    const len = nums.length
    const dp = Array(target + 1).fill(0)
    dp[0] = 1
    for (let i = 1; i <= target; i++) {
        for (let j = 0; j < len; j++) {
            if (i >= nums[j]) {
                dp[i] += dp[i - nums[j]]
            }
        }
    }
    return dp[target]

};
// const res = combinationSum4([1, 2, 3], 4)
// console.log(res)

// 1262. 可被三整除的最大和
var maxSumDivThree = function (nums) {
    // 放弃
    // 数组和为sum,被删数字和为del,则需del %3 == sum % 3;
    // 若sum %3 == 1 ,则可以删除一个余数为1的数或2个余数为2的数;
    // 若sum %3 == 2 ,则可以删除一个余数为2的数或2个余数为1的数;
    // 故分别记录余数为1和2的最小两数;
    const len = nums.length
    let sum = nums.reduce((a, b) => a + b)
    if (sum % 3 === 0) return sum
    const a1 = nums.filter(a => a % 3 === 1).sort((a, b) => a - b)
    const a2 = nums.filter(a => a % 3 === 2).sort((a, b) => a - b)
    if (sum % 3 === 1) sum = Math.max(sum - a1[0], sum - a2[0] - a2[1] || 0)
    if (sum % 3 === 2) sum = Math.max(sum - a2[0], sum - a1[0] - a1[1] || 0)
    return sum
};
// const res = maxSumDivThree([3, 6, 5, 1, 8])//18
// console.log(res)

// 873. 最长的斐波那契子序列的长度
var lenLongestFibSubseq = function (arr) {
    // arr单调递增
    const len = arr.length
    if (len < 3) return 0
    const dp = Array(len).fill(0).map(i => Array(len).fill(2)) // [i,j] 为fib的长度
    const map = new Map()
    for (let i = 0; i < len; i++) {
        map.set(arr[i], i)
    }
    let res = 0
    for (let i = 0; i < len; i++) { //第二个数
        for (let j = i + 1; j < len; j++) {  //第三个数
            const first = arr[j] - arr[i]
            if (first < arr[i] && map.has(first)) {
                dp[i][j] = Math.max(dp[i][j], dp[map.get(first)][i] + 1)
                res = Math.max(res, dp[i][j])
            }
        }
    }
    return res
};
// const res = lenLongestFibSubseq([1, 2, 3, 4, 5, 6, 7, 8]) //5
// console.log(res)

var lastStoneWeightII = function (stones) {
    const len = stones.length
    if (len === 1) return stones[0]
    if (len === 2) return Math.abs(stones[0] - stones[1])
    const sum = stones.reduce((a, b) => a + b)
    const back = Math.floor(sm / 2)
    const dp = Array(back + 1).fill(0)

    for (let i = 0; i < len; i++) {
        for (let j = back; j >= stones[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i])
        }
    }
    return sum - 2 * dp[back]
};
// const res = lastStoneWeightII([2, 7, 4, 1, 8, 1])
// console.log(res)

// 1155. 掷骰子的N种方法
var numRollsToTarget = function (n, k, target) {
    const mod = 1e9 + 7;
    const [max, min] = [n * k, n]
    if (target > max || target < min) return 0
    if (target === max || target === min) return 1
    const dp = Array(target + 1).fill(0)
    dp[0] = 1

    for (let i = 1; i <= n; i++) {
        for (let j = target; j >= 0; j--) {
            dp[j] = 0;
            for (let l = 1; l <= k; l++) {
                if (l <= j) {
                    dp[j] = (dp[j] + dp[j - l]) % mod

                }
            }
        }
    }
    return dp[target]
};
// const res = numRollsToTarget(1, 6, 3)
// console.log(res)

// 474. 一和零
var findMaxForm = function (strs, m, n) {
    const len = strs.length
    const nums = Array(len).fill(0).map(i => Array(2).fill(0))
    strs.map((i, index) => {
        nums[index][0] = i.split('').filter(i => i === '0').length
        nums[index][1] = i.split('').filter(i => i === '1').length
    })
    const dp = Array(m + 1).fill(0).map(i => Array(n + 1).fill(0))
    let tmp1 = 0, tmp2 = 0
    for (let i = 0; i <= m; i++) { // 没有1
        for (let k = 0; k < len; k++) {
            if (nums[k][1] === 0 && nums[k][0] === i) {
                tmp1++
                dp[i][0] = tmp1
            }
        }
    }
    for (let j = 0; j <= n; j++) { //没有0
        for (let k = 0; k < len; k++) {
            if (nums[k][0] === 0 && nums[k][1] === j) {
                tmp2++
                dp[0][j] = tmp2
            }
        }
    }
    for (let i = 1; i <= m; i++) {  // i个0
        for (let j = 1; j <= n; j++) { // j个1
            for (let k = 0; k < len; k++) {
                if (nums[k][0] === i && nums[k][1] === j) {
                    dp[i][j] += 1
                }
            }
        }
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // dp[i][j] += dp[i - 1][j] * dp[i][j - 1]
        }
    }


    // /dp[i][j] = dp[i - 1][j] * dp[i][j - 1]
    let res = 0
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (dp[i][j] !== 0) {
                res += dp[i][j]
            }
        }
    }
    console.log(dp)

    return res
};
var findMaxForm1 = function (strs, m, n) {
    const len = strs.length
    const nums = Array(len).fill(0).map(i => Array(2).fill(0))
    strs.map((i, index) => {
        nums[index][0] = i.split('').filter(i => i === '0').length
        nums[index][1] = i.split('').filter(i => i === '1').length
    })
    const dp = Array(m + 1).fill(0).map(i => Array(n + 1).fill(0))
    for (let k = 0; k < len; k++) {
        const zero = nums[k][0]
        const one = nums[k][1]
        for (let i = m; i >= zero; i--) {
            for (let j = n; j >= one; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zero][j - one] + 1)

            }
        }

    }
    return dp[m][n]
}
const res = findMaxForm1(["10", "0", "1"], 1, 1)//4
console.log(res)