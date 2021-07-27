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

console.log(res1)

//背包问题
