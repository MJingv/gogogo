//coins 找零
const minCoinChange = (array, sum, res = {}) => {
    if (sum <= 0 || !array.length) {
        console.log(res)
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

    console.log(res)
    return res
}
const values = [3, 4, 5]
const weights = [2, 3, 4]
const capacity = 5

const res = bag(capacity, weights, values)
// console.log(res)
