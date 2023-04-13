// 139. 单词拆分
var wordBreak = function (s, wordDict) {
    const [n, len] = [s.length, wordDict.length]
    const dp = Array(n + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = s.slice(j, i)
            if (dp[j] && wordDict.includes(tmp)) dp[i] = true
        }
    }
    return dp[n]
};
// const res = wordBreak('catsandog', ["cats", "dog", "sand", "and", "cat"])
// console.log(res)

// 935 骑士拨号器
// 你可以将骑士放置在任何数字单元格上，然后你应该执行 n - 1 次移动来获得长度为 n 的号码。所有的跳跃应该是有效的骑士跳跃。
var knightDialer = function (n) {
    // backtrace-timeout
    const mat = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [-1, 0, -1]
    ]
    const ad = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]
    const res = new Set()
    const path = []
    const helper = (left, i, j) => {
        if (path.length === n) res.add(path.slice().join(''))
        if (left === 0) return res
        if (i >= 0 && i <= 3 && j >= 0 && j <= 2 && mat[i][j] >= 0) {
            ad.map(item => {
                const [p, q] = item
                path.push(mat[i][j])
                helper(left - 1, i + p, j + q)
                path.pop()
            })
        }
    }
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 2; j++) {
            helper(n, i, j)
        }
    }
    return res.size
};
// [04, 06, 16, 18, 27, 29, 34, 38, 40, 43, 49, 60, 61, 67, 72, 76, 81, 83, 92, 94]

// 你可以将骑士放置在任何数字单元格上，然后你应该执行 n - 1 次移动来获得长度为 n 的号码。所有的跳跃应该是有效的骑士跳跃。
var knightDialer1 = function (n) {
    const dp = Array(10).fill(1)
    const MOD = 1000000007
    const tmp = []
    for (let i = 0; i < n - 1; i++) {
        tmp[0] = (dp[4] + dp[6]) % MOD
        tmp[1] = (dp[6] + dp[8]) % MOD
        tmp[2] = (dp[7] + dp[9]) % MOD
        tmp[3] = (dp[4] + dp[8]) % MOD
        tmp[4] = (dp[3] + dp[9] + dp[0]) % MOD
        tmp[5] = 0
        tmp[6] = (dp[1] + dp[7] + dp[0]) % MOD
        tmp[7] = (dp[2] + dp[6]) % MOD
        tmp[8] = (dp[1] + dp[3]) % MOD
        tmp[9] = (dp[4] + dp[2]) % MOD
        for (let j = 0; j < 10; j++) {
            dp[j] = tmp[j]
        }
    }
    const res = dp.reduce((i, p) => (i + p) % MOD)
    return res
}
// const res = knightDialer1(2)//20
// console.log(res)

// 72. Edit Distance hard
// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数 。
// 插入一个字符,删除一个字符,替换一个字符
var minDistance = function (word1, word2) {
    // 递归 timeout
    const [m, n] = [word1.length, word2.length]
    const helper = (i, j) => {
        if (i === -1) return j + 1
        if (j === -1) return i + 1
        if (word1[i] === word2[j]) {
            return helper(i - 1, j - 1)
        }

        return Math.min(
            helper(i - 1, j),
            helper(i, j - 1),
            helper(i - 1, j - 1)
        ) + 1
    }
    return helper(m - 1, n - 1)
};
var minDistance1 = function (word1, word2) {
    const [m, n] = [word1.length, word2.length]
    const memo = Array(m).fill(0).map(i => Array(n).fill(0))
    const helper = (i, j) => {
        if (i === -1) return j + 1
        if (j === -1) return i + 1
        if (memo[i][j]) return memo[i][j]
        if (word1[i] === word2[j]) {
            memo[i][j] = helper(i - 1, j - 1)
            return memo[i][j]
        }
        memo[i][j] = Math.min(
            helper(i - 1, j),
            helper(i, j - 1),
            helper(i - 1, j - 1)
        ) + 1
        return memo[i][j]
    }
    return helper(m - 1, n - 1)
}
var minDistance1 = function (word1, word2) {
    // dp
    const [m, n] = [word1.length, word2.length]
    const dp = Array(m + 1).fill(0).map(i => Array(n + 1).fill(0))
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
            }
        }
    }

    return dp[m][n]
}
// horse -> rorse (将 'h' 替换为 'r') rorse -> rose (删除 'r') rose -> ros (删除 'e')

// const res = minDistance1("horse", "ros")
// console.log(res)

// 97. 交错字符串
var isInterleave = function (s1, s2, s3) {
    // timeout 递归
    const [l1, l2, l3] = [s1.length, s2.length, s3.length]
    if (l1 + l2 !== l3) return false
    const helper = (i, j) => {
        const k = i + j
        if (k === l3) return true
        let res = false
        if (i < l1 && s1[i] === s3[k]) res = helper(i + 1, j)
        if (j < l2 && s2[j] === s3[k]) res = res || helper(i, j + 1)
        return res
    }
    return helper(0, 0)
};
var isInterleave1 = function (s1, s2, s3) {
    const [l1, l2, l3] = [s1.length, s2.length, s3.length]
    if (l1 + l2 !== l3) return false
    const memo = Array(l1 + 1).fill(0).map(i => Array(l2 + 1).fill(-1))
    const helper = (i, j) => {
        const k = i + j
        if (k === l3) return true
        if (memo[i][j] !== -1) return memo[i][j]
        let res = false
        if (i < l1 && s1[i] === s3[k]) res = helper(i + 1, j)
        if (j < l2 && s2[j] === s3[k]) res = res || helper(i, j + 1)
        memo[i][j] = res
        return res

    }
    return helper(0, 0)

}
// 输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
// const res = isInterleave1('aabcc', 'dbbca', 'aadbbcbcac')
// console.log(res)

// 787. K 站中转内最便宜的航班
// 你的任务是找到出一条最多经过 k 站中转的路线，使得从 src 到 dst 的 价格最便宜 ，并返回该价格。 如果不存在这样的路线，则输出 -1。
// n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]] src = 0, dst = 2, k = 1 输出: 200
var findCheapestPrice = function (n, flights, src, dst, k) {
    // timeout
    if (!n) return 0
    const map = new Map()
    flights.map(item => {
        const [to, from, price] = [item[1], item[0], item[2]]
        if (!map.has(to)) {
            map.set(to, [])
        }
        map.set(to, [...map.get(to), [from, price]])
    })
    // 定义：从 src 出发，k 步之内到达 s 的最短路径权重
    const helper = (s, k) => {
        if (s === src) return 0
        if (k === 0) return -1
        let res = Infinity
        if (map.has(s)) {
            const list = map.get(s)
            list.map(item => {
                const [from, price] = item
                const sub = helper(from, k - 1)
                if (sub !== -1) {
                    res = Math.min(res, sub + price)
                }
            })

        }
        return res === Infinity ? -1 : res
    }
    return helper(dst, k + 1)
};
var findCheapestPrice1 = function (n, flights, src, dst, k) {
    const len = flights.length
    if (!len || !n) return -1
    const map = new Map()
    flights.map(item => {
        const [from, to, price] = item
        if (!map.has(to)) map.set(to, [])
        map.get(to).push([from, price])
    })
    const memo = Array(n).fill(0).map(i => Array(k + 2).fill(666))

    const helper = (s, k) => {
        if (s === src) return 0
        if (k === 0) return -1
        let res = Infinity
        if (memo[s][k] !== 666) return memo[s][k]
        if (map.has(s)) {
            const list = map.get(s)
            list.map(item => {
                const [from, price] = item
                const sub = helper(from, k - 1)
                if (sub !== -1) {
                    res = Math.min(sub + price, res)
                }
            })
        }
        memo[s][k] = res === Infinity ? -1 : res
        return memo[s][k]
    }
    return helper(dst, k + 1)
}
// const res = findCheapestPrice1(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1)
// console.log(res)

// 312. 戳气球 hard
// 输入：nums = [3,1,5,8] 输出：167 求所能获得硬币的最大数量。
// 转化子问题，倒着思考，如果就剩一个气球反推
var maxCoins = function (nums) {
    const n = nums.length
    nums.push(1)
    nums.unshift(1)
    // 戳i到j之间气球得最高分，求dp[0][n+1]的值
    const dp = Array(n + 2).fill(0).map(i => Array(n + 2).fill(0))

    for (let i = n; i >= 0; i--) {
        for (let j = i + 1; j < n + 2; j++) {
            for (let k = i + 1; k < j; k++) {
                dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + nums[i] * nums[j] * nums[k])
            }
        }
    }
    return dp[0][n + 1]
};
// const res = maxCoins([3, 1, 5, 8])
// console.log(res)


// 486. 预测赢家
// 877. 石子游戏
var PredictTheWinner = function (nums) {
    const n = nums.length
    // [i...j] 先后 的最大值
    // 求 [0,n-1] 的最大值
    const dp = Array(n).fill(0).map(i => Array(n).fill(0).map(i => Array(2).fill(0)))
    for (let i = 0; i < n; i++) {
        dp[i][i][0] = nums[i]
    }
    // i从n-1...0，j从i...n-1
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            const left = nums[i] + dp[i + 1][j][1]   // 先手选左边,
            const right = nums[j] + dp[i][j - 1][1]// 先手选右边,
            if (left >= right) {
                // 先手选左边，后手
                dp[i][j][0] = left
                dp[i][j][1] = dp[i + 1][j][0]
            } else {
                dp[i][j][0] = right
                dp[i][j][1] = dp[i][j - 1][0]

            }
        }
    }
    const [f, s] = dp[0][n - 1]
    return f >= s
};
// const res = PredictTheWinner([2, 8, 3, 5])//false
// console.log(res)


// 64. 最小路径
// 剑指 Offer II 099. 最小路径之和
// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]] 输出：7
var minPathSum = function (grid) {
    const [m, n] = [grid.length, grid[0].length]
    const dp = Array(m).fill(0).map(i => Array(n).fill(Infinity))
    dp[0][0] = grid[0][0]
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }

    }
    return dp[m - 1][n - 1]
};
// const res = minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])
// console.log(res)


// 174. 地下城游戏 hard
var calculateMinimumHP = function (dungeon) {
    // 递归
    const [m, n] = [dungeon.length, dungeon[0].length]
    const memo = Array(m).fill(0).map(i => Array(n).fill(Infinity))
    const helper = (i = 0, j = 0) => {
        if (i === m - 1 && j === n - 1) return dungeon[i][j] >= 0 ? 1 : 1 - dungeon[i][j]
        if (i >= m || j >= n) return Infinity
        if (memo[i][j] !== Infinity) return memo[i][j]
        const tmp = Math.min(helper(i + 1, j), helper(i, j + 1)) - dungeon[i][j]
        memo[i][j] = tmp <= 0 ? 1 : tmp
        return memo[i][j]
    }
    return helper()
};
var calculateMinimumHP1 = function (dungeon) {
    // dp
    const [m, n] = [dungeon.length, dungeon[0].length]
    // 走到[i,j]时需要的最少血量时dp[i][j]
    const dp = Array(m).fill(0).map(i => Array(n).fill(Infinity))
    dp[0][0] = dungeon[0][0] > 0 ? 1 : 1 - dungeon[0][0]
    for (let i = 1; i < m; i++) {
        const tmp = dp[i - 1][0] - dungeon[i][0]
        dp[i][0] = tmp <= 0 ? 1 : tmp
    }
    for (let j = 1; j < n; j++) {
        const tmp = dp[0][j - 1] - dungeon[0][j]
        dp[0][j] = tmp <= 0 ? 1 : tmp
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            const tmp = Math.min(dp[i - 1][0], dp[i][j - 1]) - dungeon[i][j]
            dp[i][j] = tmp <= 0 ? 1 : tmp
        }
    }


    return dp
}
const res = calculateMinimumHP1([[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]) //7
console.log(res)