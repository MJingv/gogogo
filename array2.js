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
    const [m, n] = [matrix.length, matrix[0].length]
    const preSum = new Array(m + 1).fill(0).map(i => new Array(n + 1).fill(0))
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
// const m = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]])
// const res = m.sumRegion(2, 1, 4, 3)
// console.log(res)

// 48。旋转图像
// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]] 输出：[[7,4,1],[8,5,2],[9,6,3]]
var rotate = function (matrix) {
    const [m, n] = [matrix.length, matrix[0].length]
    const reverse = (list = []) => {
        const len = list.length
        if (!len) return
        let [i, j] = [0, len - 1]
        while (i <= j) {
            [list[i++], list[j--]] = [list[j], list[i]]
        }
    }
    //镜像对称
    for (let i = 0; i < m; i++) {
        for (let j = i; j < n; j++) {
            const tmp = matrix[i][j]
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = tmp
        }
        reverse(matrix[i])
    }
    return matrix
};
// const res = rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
// console.log(res)

// 力扣第 54 题「 螺旋矩阵」
// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]] 输出：[1,2,3,6,9,8,7,4,5]
var spiralOrder = function (matrix) {
    const res = []
    const [m, n] = [matrix.length, matrix[0].length]
    let [up, down, left, right] = [0, matrix.length - 1, 0, matrix[0].length - 1]
    while (res.length < m * n) {
        if (left <= right) {
            for (let j = left; j <= right; j++) {
                res.push(matrix[up][j])
            }
            up++
        }
        if (up <= down) {
            for (let i = up; i <= down; i++) {
                res.push(matrix[i][right])
            }
            right--
        }

        if (left <= right) {
            for (let j = right; j >= left; j--) {
                res.push(matrix[down][j])
            }
            down--
        }
        if (up <= down) {
            for (let i = down; i >= up; i--) {
                res.push(matrix[i][left])
            }
            left++
        }
    }
    return res
};
const res = spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
console.log(res)