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
    console.log(arg);
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
    // 入参list，返回promise
    // 全res才res，一个rej全部rej
    return new Promise((res, rej) => {
        const len = list.length
        const resList = []
        let n = 0
        if (!len) res([])
        for (let i = 0; i < len; i++) {
            list[i].then(r => {
                resList[i] = r
                if (n === len - 1) res(resList)
                n++
            }).catch(err => rej(err))
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

const promiseRace = (list = []) => {
    return new Promise((res, rej) => {
        const len = list.length
        if (!len) res(null)
        for (let i = 0; i < len; i++) {
            list[i].then(r => res(r)).catch(e => rej(e))
        }
    })

}
// promiseAll(list).then(res => console.log(res)).catch(err => console.log(err))
// promiseRace(list).then(res => console.log(res + 'race')).catch(err => console.log(err))


// 实现promise
// class实现，state/value/resCblist/rejCblist
// then/catch
// then(res,rej) 链式调用

class myPromise {
    constructor(executor) {
        this.value = undefined
        this.state = 'pending'
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        const resolve = (val) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = val
                this.onResolvedCallbacks.forEach(item => item())
            }

        }
        const reject = (val) => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.value = val
                this.onRejectedCallbacks.forEach(item => item())
            }

        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
        onRejected = typeof onRejected === 'function' ? onRejected : (e) => {
            throw e
        }
        return new myPromise((resolve, reject) => {
            const handleResolved = () => {
                setTimeout(() => {
                    try {
                        const res = onFulfilled(this.value, resolve, reject)
                        resolvePromise(res, resolve)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            }
            const handleRejected = () => {
                try {
                    setTimeout(() => {
                        const res = onRejected(this.value, resolve, reject)
                        resolvePromise(res, resolve, reject)
                    }, 0)
                } catch (e) {
                    reject(e)
                }
            }
            if (this.state === 'fulfilled') {
                handleResolved()
            } else if (this.state === 'rejected') {
                handleRejected()
            } else {
                this.onRejectedCallbacks.push(onRejected)
                this.onResolvedCallbacks.push(onFulfilled)
            }
        })

    }

    catch(e) {
        return this.then(undefined, e)
    }
}

const resolvePromise = (result, resolve, reject) => {
    if (result instanceof myPromise) {
        result.then(resolve, reject)
    } else {
        resolve(result)
    }

}

// 删除老的&没人访问的数据
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.cache = new Map()
    }

    get(key) {
        // 返回val，将val前置
        if (this.cache.has(key)) {
            const res = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, res)
            return res
        }
        return -1
    }

    put(key, val) {
        // 满了，前置+删最后的
        // 没满，放最前面

        if (this.cache.has(key)) {
            this.cache.delete(key)
        }

        if (this.cache.size === this.capacity) {
            const oldest = this.cache.keys().next().value
            this.cache.delete(oldest)
        }
        this.cache.set(key, val)
    }
}

const c = new LRUCache(3)
