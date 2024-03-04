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
const res = deepClone({
    a: 1, b: [{pp: {val: 1111}}, 3, 99, 'ss'], d: {c: false}, kk: 0, d1d: {}
})


console.log(res)