// string转int
const f1 = (s) => {
    const num = Number(s)
    if (isNaN(num)) {
        throw new Error('invalid input')
    }
    if (num > Number.MAX_SAFE_INTEGER) {
        throw new Error('overflow')
    }
    if (num < Number.MIN_SAFE_INTEGER) {
        throw new Error('underflow')
    }
    return num
}
const res = f1('fjaljf002=,.z1jf0?]J03')

// 输入一个int数组，找到和最小的子数组，输出子数组的开始，结束、和


// 输入n，构造一个n叉树，随机性


// 抢红包

console.log(res)