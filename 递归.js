// let res = 0

//********* 阶乘 *********
const fn = (n) => {
    //终止条件
    if (n === 1) return 1
    //按当前计算
    return fn(n - 1) * n
}
// res = fn(5)//120
// console.log(res)

//优化--尾递归
const fn1 = (n, sum = 1) => {
    if (n === 1) return sum
    return fn1(n - 1, n * sum)
}
// res = fn1(5)//120
// console.log(res)


//********* 斐波那契 *********
const fn2 = (n) => {
    if (n === 0) return 0
    if (n === 1 || n === 2) return 1
    return fn2(n - 1) + fn2(n - 2)
}
// res = fn2(9)
// console.log(res, 'fn2')

//优化--记忆memo
const list = [0, 1, 1]
const fn3 = (n) => {
    if (list[n]) return list[n]
    return fn3(n - 1) + fn3(n - 2)
}
// res = fn3(9)
// console.log(res, 'fn3')


//********* 二分查找 *********

const findOne = (list, k, start = 0, end = list.length - 1) => {
    if (start > end) return -1

    let mid = Math.floor(start + (end - start) / 2)
    if (k === list[mid]) {
        return mid
    } else if (k < list[mid]) {
        return findOne(list, k, start, mid)
    } else if (k > list[mid]) {
        return findOne(list, k, mid + 1, end)
    }
}

// const list1 = [1, 3, 5, 7, 100]
// const res1 = findOne(list1, 3)
// console.log(res1)

//********* 扁平化 *********
//[1, [2, [3, [4, 5]]], 6] -> [1, 2, 3, 4, 5, 6]
const myFlat = (list = [], res = []) => {
    if (list.length) {
        list.map(i => {
            typeof i == "number" ? res.push(i) : myFlat(i, res)
        })
    }
    return res
}
const l = [1, [2, [3, [4, 5]]], 6]
// const res2 = myFlat(l)
// console.log(res2)

//********* 有效括号 *********
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
const quoteFn = (list = []) => {
    const tmpList = []
    const array = ['(', '{', '[']
    let res = true
    if (!list.length) return res = false
    list.map(i => array.includes(i) ? tmpList.push(i) : null)
    if (!tmpList.length) return res = false

    tmpList.map(i => {
        let ch = list.pop()
        if (i === '[' && ch !== ']' || i === '(' && ch !== ')' || i === '{' && ch !== '}') {
            return res = false
        }
    })
    return res

}
// console.log(quoteFn(['[', '(', ')', ']']))


var multiply = function (A, B) {
    if (!A || !B) return 0

    const helper = (num, n) => {
        if (!n) return 0
        return num + helper(num, --n)
    }
    return helper(A > B ? A : B, A > B ? B : A)
};
// const res = multiply(4, 3)
// console.log(res)


var kthGrammar = function (n, k) {
    // 内存溢出 没有a
    if (!n || !k) return 0
    const helper = (row, lastStr) => {
        if (row === n) return lastStr[k - 1]
        let tmp = ''
        while (lastStr.length) {
            const val = lastStr[0]
            lastStr = lastStr.slice(1)
            if (val === '0') tmp += '01'
            if (val === '1') tmp += '10'
        }

        return helper(row + 1, tmp)
    }

    return helper(1, '0')
};
const res = kthGrammar(2, 2)
console.log(res)