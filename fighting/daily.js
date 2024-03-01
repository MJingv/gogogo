const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]]
const arr = [3, 0, 5, 2, 4, 1, 1, 4, 99];

const quickSort = (list = []) => {
    const len = list.length
    if (!len || len === 1) return list

    const left = [], right = [], equal = []
    const index = Math.floor(len / 2)
    const mid = list[index]

    for (let i = 0; i < len; i++) {
        const cur = list[i]
        if (mid === cur) equal.push(cur)
        if (mid < cur) right.push(cur)
        if (mid > cur) left.push(cur)
    }

    return [...quickSort(left), ...equal, ...quickSort(right)]

}
// const res = quickSort(arr)

const binarySearch = (list, key, i = 0, j = list.length - 1) => {
    if (i > j) return -1
    const mid = Math.floor((i + j) / 2)

    if (list[mid] === key) {
        return mid
    } else if (list[mid] < key) {
        return binarySearch(list, key, mid + 1, j)
    } else if (list[mid] > key) return binarySearch(list, key, i, mid - 1)

}

const binarySearch1 = (list, key) => {
    const len = list.length
    let i = 0, j = len - 1
    while (i <= j) {
        const mid = Math.floor((i + j) / 2)
        if (list[mid] === key) {
            return mid
        } else if (list[mid] < key) {
            i = mid + 1
        } else if (list[mid] > key) j = mid - 1

    }
    return -1
}
// const res = binarySearch1([1, 3, 8, 9, 14, 99], 14)

const quickSort1 = (arr = []) => {
    const len = arr.length
    if (!len) return []
    const [left, right, equal] = [[], [], []]
    const q = Math.floor(len / 2)
    const cur = arr[q]
    for (let i = 0; i < len; i++) {
        if (cur === arr[i]) equal.push(arr[i])
        if (cur < arr[i]) right.push(arr[i])
        if (cur > arr[i]) left.push(arr[i])
    }
    return [...quickSort1(left), ...equal, ...quickSort1(right)]


}
// const res = quickSort1(arr)


const merge = (left = [], right = []) => {
    const [l1, l2] = [left.length, right.length]
    let [i, j] = [0, 0]
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

const mergeSort = (arr = []) => {
    const len = arr.length
    if (len <= 1) return arr
    const mid = Math.floor(len / 2)
    return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)))

}
// const res = mergeSort(arr)

Function.prototype.mybind = function (context, ...arg1) {
    let t = this
    return function (...arg2) {
        return t.apply(context, [...arg1, ...arg2])

    }

}
const add = function (a, b) {
    return a + b
}
// const b = add.mybind(this, 3)
// console.log(b(2))


Function.prototype.mycall = function (context, ...arg) {
    // 改变this指向
    const func = Symbol('func')
    context[func] = this
    const res = context[func](...arg)
    delete context[func]
    return res


}

const p = {name: 'ppp'}
const sayHi = function (greeting) {
    console.log(greeting + this.name)
}

// sayHi.mycall(p, ['hello'])


// throttle
const throttle = (fn, delay) => {
    let pre = 0
    return (...arg) => {
        const now = Date.now()
        if (now - pre > delay) {
            fn.apply(this, arg)
            pre = now
        }
    }


}
// debounce

const debounce = (fn, delay) => {
    let timer = null
    return (...arg) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, delay)
    }
}

// deepclone


const deepClone = (obj, map = new Map()) => {
    // bad case
    if (!obj || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (map.has(obj)) return map.get(obj)

    let cloneObj = obj.constructor
    map.set(obj, cloneObj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key])
        }
    }
    return cloneObj
}

// inheritance

function Parent() {
    this.name = 'parent'
    this.money = 1000
}

Parent.prototype.house = 10

function Child() {
    Parent.call(this)
    this.name = 'child'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const c = new Child()

// console.log(c.money, c.house, c.constructor)


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


const reverse = (head) => {
    if (!head) return
    let cur = head, pre = null
    while (cur) {
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
}

// 前n个
const reverseN1 = (head, i) => {
    if (!head || !i) return head
    let cur = head, pre = null, next = cur.next

    while (cur.next && i >= 0) {
        next = cur.next
        cur.next = pre
        pre = cur
        cur = next
        i--
    }
    head.next = next
    return pre
}
const reverseN = (head, n) => {
    let pre = null, cur
    const helper = (cur, n) => {
        if (n === 0) {


        }


        cur.next = helper(cur.next, n - 1)
        cur.next.next = cur
        cur.next = pre


    }

    const res = helper(head, n)
    head.next = res
    return res

}

// const res = JSON.stringify(reverseN(l1, 2))
// console.log(res)


const list = [1, [2, [3, [4, 5]]], 6]
const helper = (list, res = []) => {
    const len = list.length
    if (!len) return
    for (let i = 0; i < len; i++) {
        if (Array.isArray(list[i])) {
            helper(list[i], res)
        } else {
            res.push(list[i])
        }
    }
    return res

}

console.log(res)