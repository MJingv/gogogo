// // 力扣第 303 题「 区域和检索 - 数组不可变」
// 输入： ["NumArray", "sumRange", "sumRange", "sumRange"] [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]] 输出： [null, 1, -1, -3]

var NumArray = function (nums) {
    const len = nums.length
    const preNum = [0]
    for (let i = 0; i < len + 1; i++) {
        preNum[i + 1] = preNum[0] + nums[i]
    }
    this.preNum = preNum
};

NumArray.prototype.sumRange = function (left, right) {
    return this.preNum[right + 1] - this.preNum[left]
};
// const n = new NumArray([-2, 0, 3, -5, 2, -1])
// console.log(n.sumRange(0, 2))

// 304. 二维区域和检索 -矩阵不可变

//细节魔鬼，不做了
var NumMatrix = function (matrix) {
    const [m, n] = [matrix.length , matrix[0].length ]
    const preSum = new Array(m+1).fill(0).map(i => new Array(n+1).fill(0))
    preSum[0][0] = 0
    for (let i = 1; i <= m; i++) {
        for (let j = 1; i <= n; j++) {
            preSum[i][j] = preSum[i - 1][j] + preSum[i][j - 1] + matrix[i - 1][j - 1] - preSum[i - 1][j - 1]
        }
    }
    this.preSum = matrix
    console.log(preSum)
};

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
    return
};
const m = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]])
const res = m.sumRegion(2, 1, 4, 3)
console.log(res)