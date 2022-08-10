// 「剑指 Offer 29. 顺时针打印矩阵」
// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]

const spiralOrder = (matrix) => {
    if (!matrix.length) return []
    const [m, n] = [matrix.length, matrix[0].length]
    let [left, right, up, down] = [0, n - 1, 0, m - 1]
    const res = []
    while (1) {
        //从左到右
        for (let j = left; j <= right; j++) {
            res.push(matrix[up][j])
        }
        up++
        if (up > down) break
        // 从上到下
        for (let i = up; i <= down; i++) {
            res.push(matrix[i][right])
        }
        right--
        if (right < left) break

        // 从右到左
        for (let j = right; j >= left; j--) {
            res.push(matrix[down][j])
        }
        down--
        if (up > down) break

        // 从下到上
        for (let i = down; i >= up; i--) {
            res.push(matrix[i][left])
        }
        left++
        if (right < left) break
    }
    return res


}

const res = spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
console.log(res)
