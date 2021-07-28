//coins 找零
const minCoinChange = (array, sum, res = {}) => {
    if (sum <= 0 || !array.length) {
        // console.log(res)
        return res
    }
    const max = array[array.length - 1]
    if (sum < max) {
        minCoinChange(array.slice(0, array.length - 1), sum, res)
    } else {
        if (sum % max === 0) {
            res[max] = sum / max
            minCoinChange(array.slice(0, array.length - 1), 0, res)
        } else {
            const num = Math.floor(sum / max)
            res[max] = num
            const left = sum - num * max
            minCoinChange(array.slice(0, array.length - 1), left, res)
        }
    }
}


const minCoinChange1 = (array, sum) => {
    const res = []
    for (let i = array.length - 1; i >= 0; i--) {
        const max = array[i]
        while (sum >= max) {
            sum = sum - max
            res.push(max)
        }
    }
    return res
}

const list1 = [1, 3, 4]
const res1 = minCoinChange1(list1, 6)

// console.log(res1)

//01背包问题（选0或1）
const bag = (capacity, weights, values) => {
    const res = []

    for (let i = 0; i <= values.length; i++) {
        res[i] = []
        for (let w = 0; w <= capacity; w++) {
            res[i][w] = 0
            if (i === 0 || w === 0) {
            } else if (weights[i - 1] <= w) {
                res[i][w] = Math.max(res[i - 1][w], values[i - 1] + res[i - 1][w - weights[i - 1]])
            } else {
                res[i][w] = res[i - 1][w]
            }
        }
    }
    // console.log(res)
    return res
}

const values = [3, 4, 5]
const weights = [2, 3, 4]
const capacity = 5

// const res = bag(capacity, weights, values)
// console.log(res)


//最长公共子序列(有问题)
const lcs = (a, b) => {
    if (!a || !b) return false
    const listA = a.split('')
    const listB = a.split('')
    let res = []
    for (let i = 0; i <= listA.length; i++) {
        res[i] = []
        for (let j = 0; j <= listB.length; j++) {
            res[i][j] = 0
            if (i === 0 || j === 0) {
            } else if (listA[i - 1] === listB[j - 1]) {
                res[i][j] = res[i - 1][j - 1] + 1
            } else {
                res[i][j] = Math.max(res[i - 1][j], res[i][j - 1])
            }
        }
    }
    // console.log(res)
    // return res.join('')
}

// lcs('acbaed', 'abcadf')

const isSafe = (maze, x, y) => {
    const n = maze.length
    if (x < n && y < n && x >= 0 && y >= 0 && maze[x][y] !== 0) {
        return true
    }
    return false
}


const findPath = (maze = [], res = [], x = 0, y = 0) => {
    const n = maze.length
    if (x === n - 1 && y === n - 1) {
        res[x][y] = 1
        console.log(res)
        return true
    }

    if (isSafe(maze, x, y)) {
        res[x][y] = 1

        if (findPath(maze, res, x + 1, y)) {
            return true
        }
        if (findPath(maze, res, x, y + 1)) {
            return true
        }
        res[x][y] = 0
        return false
    }
    return false
}
//回溯（递归）
const mazeGame = (maze) => {
    if (!maze.length) return false
    const res = []
    const n = maze.length
    //初始化path矩阵
    for (let i = 0; i < n; i++) {
        res[i] = []
        for (let j = 0; j < n; j++) {
            res[i][j] = 0
        }
    }
    findPath(maze, res)
}

const maze = [
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
    [0, 1, 1, 1],
]
mazeGame(maze)
