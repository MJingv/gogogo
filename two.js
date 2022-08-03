const mySqrt = (x) => {
    if (x < 0) return null
    if (x === 1 || x === 2 || x === 3) return 1
    let low = 1, high = Math.floor(x / 2) + 1//可能不需要+1
    let res = -1
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2)
        if (mid * mid <= x) {
            low = mid + 1
            res = mid
        } else {
            high = mid - 1
        }
    }
    return res
};
const res1 = mySqrt(24)

const searchInsert = (nums, target) => {
    if (!nums.length || !target) return -1
    let low = 0, high = nums.length - 1, res = nums.length
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2)
        let cur = nums[mid]
        if (cur === target) {
            res = mid
        } else if (cur < target) {
            low = mid + 1
        } else {
            high = low - 1
        }
    }
    return res
};
const res2 = searchInsert([1, 3, 5, 6, 9, 12], 19)


// 二维数组中的查找
const findNumberIn2DArray = (matrix, target) => {
    //右上角
    if (!matrix.length || !target) return null
    let res = false, j = matrix.length - 1, i = 0
    while (j >= 0) {
        if (matrix[0][j] === target) {
            return res = true
        } else if (matrix[0][j] > target) {
            j--
        } else {
            break
        }
    }
    while (i < matrix.length) {
        if (matrix[i][j] === target) {
            return res = true
        } else if (matrix[i][j] < target) {
            i++
        } else {
            break
        }
    }
    return res

};
const matrix = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
]

const res = findNumberIn2DArray(matrix, -1)


const quickSort = () => {

}


console.log(res)
