const fn = (num) => {
    let lo = 0, hi = num, mid
    while (lo <= hi) {
        mid = Math.floor((lo + hi) / 2)
        if (mid * mid === num) return mid
        if (mid * mid > num) {
            hi = mid - 1
        } else {
            lo = mid + 1
        }
    }
    return  false
}

const res = fn(100)
console.log(res)
