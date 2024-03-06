const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]]
const arr = [3, 0, 5, 2, 4, 1, 1, 4, 99];

class ListNode {
    constructor(val, next = null) {
        this.val = val
        this.next = next
    }
}

const l5 = new ListNode(5)
const l4 = new ListNode(4, l5)
const l3 = new ListNode(3, l4)
const l2 = new ListNode(2, l3)
const l1 = new ListNode(1, l2)


class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right

    }
}

const t1 = new TreeNode(1)
const t0 = new TreeNode(0)
t1.left = t0
// t0.left = new TreeNode(0)
const t3 = new TreeNode(3)
t3.left = new TreeNode(2)
t3.right = new TreeNode(4)
t1.right = t3


const reverse = (head) => {
    if (!head) return null
    let cur = head, pre = null
    while (cur) {
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next

    }
    return pre

}
const reverseN = (head, n) => {
    if (!head) return null
    let cur = head, next = null
    const helper = (head, n) => {
        if (n === 1) {
            next = head.next
            return head

        }
        const h = helper(head.next, n - 1)
        head.next.next = head
        head.next = next
        return h
    }
    return helper(head, n)
}

//92
const reverseBetween = (head, m, n) => {
    if (!head || !head.next) return head
    if (m === 1) return reverseN(head, n)
    head.next = reverseBetween(head.next, m - 1, n - 1)
    return head
}
// const res = JSON.stringify(reverseBetween(l1, 2, 5))


Function.prototype.mybind = function (ctx, ...arg1) {
    // return 函数，改变this
    let t = this
    return function (...arg2) {
        t.call(ctx, ...arg1, ...arg2)
    }
}


Function.prototype.mycall = function (ctx, ...arg1) {
    // 改变this指向，执行函数
    const func = Symbol('func')
    ctx[func] = this
    const res = ctx[func](...arg1)
    delete ctx[func]
    return res

}

const P = function (val) {
    console.log('name is ' + this.name + val)
}
const p = {name: 'a'}
// P.mybind(p, {a: '1111'})('222')
// P.mycall(p, 111)


const Parent = function () {
    this.name = 'parent'
    this.money = 1000
}
Parent.prototype.house = 10
const Child = function (age) {
    Parent.call(this)
    this.name = 'child'
    this.age = age
}

Child.prototype = Object.create(Parent.prototype) // 不要用new Object,还要手动绑定属性，没有继承指定对象的属性和方法
Child.prototype.constructor = Child // 记住吧

// const c = new Child(18)
// console.log(c.name, c.house, c.constructor)


const throttle = function (fn, delay) {
    // 1s一个
    let pre = null
    return (...arg) => {
        const now = Date.now()
        if (now - pre > delay) {
            fn.apply(this, arg)
            pre = now
        }
    }
}
const debounce = function (fn, delay) {
    // 1s最后一个
    let timer = null
    return function (...arg) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, delay)
    }

}

function example(...arg) {
    // console.log(arg);
}

example(1, 2, 3);


const deepClone = (obj, map = new WeakMap()) => {
    if (!obj || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    if (map.has(obj)) return map.get(obj)

    let cloneObj = new obj.constructor()
    map.set(obj, cloneObj)

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { //忘记了
            cloneObj[key] = deepClone(obj[key], map)
        }

    }
    return cloneObj

}
// const res = deepClone({
//     a: 1, b: [{pp: {val: 1111}}, 3, 99, 'ss'], d: {c: false}, kk: 0, d1d: {}
// })
//


const quickSort = (list = []) => {
    const len = list.length
    if (!len) return []
    const left = [], right = [], equal = []
    const mid = Math.floor(len / 2)
    for (let i = 0; i < len; i++) {
        const cur = list[i]
        if (cur === list[mid]) {
            equal.push(cur)
        } else if (cur < list[mid]) {
            left.push(cur)
        } else if (cur > list[mid]) {
            right.push(cur)
        }
    }
    return [...quickSort(left), ...equal, ...quickSort(right)]
}

const binarySearch = (list, target) => {
    const len = list.length
    if (!len) return -1
    let i = 0, j = len - 1
    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        const cur = list[mid]
        if (cur === target) {
            return mid
        } else if (cur < target) {
            i = mid + 1
        } else if (cur > target) {
            j = mid - 1
        }
    }
    return -1
}
// const sortedList = quickSort(arr)
// const res = binarySearch(sortedList, 4)

const merge = (left = [], right = []) => {
    const l1 = left.length, l2 = right.length
    let i = 0, j = 0
    const res = []

    while (i < l1 && j < l2) {
        if (left[i] < right[j]) {
            res.push(left[i++])
        } else {
            res.push(right[j++])
        }
    }

    while (i < l1) res.push(left[i++])
    while (j < l2) res.push(right[j++])

    return res
}
const mergeSort = (list = []) => {
    const len = list.length
    if (len <= 1) return list //keypoint
    const mid = Math.floor(len / 2)
    return merge(mergeSort(list.slice(0, mid)), mergeSort(list.slice(mid)))
}
// const res = mergeSort(arr)


// promise.all

const promiseAll = (list = []) => {
    // 入参是数组，return一个promise
    // 等所有结果都返回再res
    // 一个rej全部rej
    return new Promise((res, rej) => {
        const len = list.length
        if (!len) res([])
        let n = 0
        const resList = []


        for (let i = 0; i < len; i++) {
            list[i].then((r) => {
                resList[n] = r
                if (n === len - 1) res(resList)
                n++
            }).catch(err => {
                rej(err)
            })
        }

    })

}

const p1 = new Promise((res, rej) => {
    setTimeout(() => {
        res('111')
    }, 10)
})
const p2 = new Promise((res, rej) => {
    setTimeout(() => {
        res('222')
    }, 100)
})
const list = [p1, p2]
promiseAll(list).then(res => console.log(res)).catch(err => console.log(err))

