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
    return false
}

const fn1 = (arr) => {
    let left = 0, right = arr.length - 1, mid = Math.floor((left + right) / 2)
    if(arr[mid-1]<arr[mid]){
        //[mid,right]

    }else {
      //  [left,mid]
    }


}


const arr = [24, 69, 100, 99, 79, 78, 67, 36, 26, 19]
const res = fn(arr)
console.log(res)


