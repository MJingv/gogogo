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
const res = mySqrt(24)
console.log(res)
