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
    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
    dp[0][0] = grid[0][0]
    for (let i = 1; i < m; i++) { //第一列只能向下走
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = grid[i][j] + Math.max(dp[i - 1][j], dp[i][j - 1])
        }
    }
    return dp[m - 1][n - 1]
}
// const res = maxValue([
//     [1, 3, 1],
//     [1, 5, 1],
//     [4, 2, 1]
// ])
// console.log(res)


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
// const res = translateNum(12258)
// console.log(res)


// 杨辉三角
// 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
//
// 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
// 输入: numRows = 5
// 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

const generate = (numRows) => {
    if (!numRows) return []
    const dp = Array(numRows).fill(0).map((i, index) => Array(index + 1).fill(1))
    for (let i = 2; i < numRows; i++) {
        for (let j = 1; j < dp[i].length - 1; j++) {
            dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
        }
    }
    return dp
};
// const res = generate(5)
// console.log(res)

// 64. 最小路径和
// 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
// 说明：每次只能向下或者向右移动一步。
// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
// 输出：7
// 解释：因为路径 1→3→1→1→1 的总和最小。

const minPathSum = (grid) => {
    if (!grid.length) return
    const [m, n] = [grid.length, grid[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(0))
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
}
// const res = minPathSum([
//     [1, 3, 1],
//     [1, 5, 1],
//     [4, 2, 1]
// ])
// console.log(res)

// 42. 接雨水
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

const trap1 = (height) => {
    if (!height.length) return
    const res = Array(height.length).fill(0)
    res[0] = 0
    for (let i = 1; i < height.length; i++) {
        //关注当前i的接水量
        //取左边最高与右边最高的较小者
        //如果当前墙高度小于较小者则可以接到水
        const leftMax = Math.max(...height.slice(0, i))
        const rightMax = Math.max(...height.slice(i + 1))
        const min = Math.min(leftMax, rightMax)
        if (height[i] < min) {
            const diff = Math.abs(min - height[i])
            res[i] = diff
        }
    }
    const sum = res.reduce((i, p) => i + p)
    return sum
}


const trap2 = (height) => {
    if (!height.length) return
    const len = height.length
    const res = Array(len).fill(0)
    res[0] = 0
    const leftMax = Array(len).fill(0)
    const rightMax = Array(len).fill(0)

    for (let i = 1; i < height.length; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i - 1])
    }
    for (let i = height.length - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i + 1])
    }
    for (let i = 1; i < height.length; i++) {
        const min = Math.min(leftMax[i], rightMax[i])
        if (height[i] < min) {
            const diff = Math.abs(min - height[i])
            res[i] = diff
        }
    }
    const sum = res.reduce((i, p) => i + p)
    return sum
}
// const res = trap2([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
// console.log(res)


// 53. 最大子数组和

// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 子数组 是数组中的一个连续部分。
const maxSubArray = (nums) => {
    if (!nums.length) return
    const dp = [nums[0]]
    let cur = [nums[0]]
    for (let i = 1; i < nums.length; i++) {
        const sum = dp[i - 1] + nums[i]
        if (sum > nums[i]) {
            cur.push(nums[i])
            dp[i] = sum
        } else {
            cur = [nums[i]]
            dp[i] = nums[i]
        }
    }
    return Math.max(...dp)
};
// const res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// console.log(res)


// 62. 不同路径
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
//
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
//
// 问总共有多少条不同的路径？

// 输入：m = 3, n = 2
// 输出：3
const uniquePaths = (m, n) => {
    if (!m || !n) return
    const dp = Array(m).fill(0).map(() => Array(n).fill(0))
    dp[0][0] = 1
    for (let i = 1; i < m; i++) {//只能向下走
        dp[i][0] = 1
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = 1
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
};
// const res = uniquePaths(3, 2)
// console.log(res)


const trap3 = (height) => {
    //每日接雨水
    const len = height.length
    if (!len) return
    const res = Array(len).fill(0)
    const leftMax = Array(len).fill(0)
    const rightMax = Array(len).fill(0)
    for (let i = 1; i < len; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i])
    }
    for (let i = len - 2; i > 0; i--) { //len-2注意
        rightMax[i] = Math.max(rightMax[i + 1], height[i])
    }

    for (let i = 1; i < len; i++) {
        const min = Math.min(leftMax[i - 1], rightMax[i + 1])
        if (height[i] < min) {
            res[i] = min - height[i]
        }
    }
    const sum = res.reduce((i, p) => i + p)
    return sum

}
// const res = trap3([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
// console.log(res)


// 63. 不同路径 II
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
// 网格中的障碍物和空位置分别用 1 和 0 来表示。


// 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// 输出：2
// 解释：3x3 网格的正中间有一个障碍物。
// 从左上角到右下角一共有 2 条不同的路径：
// 1. 向右 -> 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右 -> 向右

const uniquePathsWithObstacles = function (obstacleGrid) {
    if (!obstacleGrid.length) return
    const [m, n] = [obstacleGrid.length, obstacleGrid[0].length]
    const dp = Array(m).fill(0).map(() => Array(n).fill(0))
    dp[0][0] = obstacleGrid[0][0] ? 0 : 1
    for (let i = 1; i < m; i++) {
        dp[i][0] = obstacleGrid[i][0] ? 0 : dp[i - 1][0]
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = obstacleGrid[0][j] ? 0 : dp[0][j - 1]
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (!obstacleGrid[i][j]) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }
    return dp[m - 1][n - 1]
};

// const res = uniquePathsWithObstacles([
//     [1, 0]
// ])
// console.log(res)

// 718. 最长重复子数组
// 给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。
// 输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
// 输出：3
// 解释：长度最长的公共子数组是 [3,2,1] 。
const findLength = (nums1, nums2) => {
    //二维数组dp
    if (!nums2.length || !nums1.length) return 0
    const [m, n] = [nums1.length, nums2.length]
    // 状态转移方程：上个对角线的值+1
    const dp = Array(m).fill(0).map(() => Array(n).fill(0))
    let max = 0
    dp[0][0] = nums1[0] === nums2[0] ? 1 : 0
    for (let i = 1; i < m; i++) {
        dp[i][0] = nums1[i] === nums2[0] ? 1 : 0
        max = Math.max(dp[i][0], max)

    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = nums1[0] === nums2[j] ? 1 : 0
        max = Math.max(dp[0][j], max)
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (nums1[i] === nums2[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
                max = Math.max(dp[i][j], max)
            }
        }
    }
    return max
}

const findLength2 = (nums1, nums2) => {
    //一维数组dp，保存对角线的值
    if (!nums1.length || !nums2.length) return 0
    const [m, n] = [nums1.length, nums2.length]
    const dp = Array(n).fill(0)
    let max = 0
    for (let i = 0; i < m; i++) {
        for (let j = n - 1; j >= 0; j--) {
            if (nums1[i] === nums2[j]) {
                dp[j] = (dp[j - 1] || 0) + 1
                max = Math.max(max, dp[j])
            } else {
                dp[j] = 0 //我只要右上角的值，不是这一列最大的值（重要）
            }
        }
    }
    return dp
}

const res = findLength2([1, 0, 0, 0, 1], [1, 0, 0, 1, 1])
console.log(res)
