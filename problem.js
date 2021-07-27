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
const list1 = [1, 3, 4]
const res1 = minCoinChange(list1, 6)
console.log(res1)

//背包问题
