// bind
Function.prototype.mybind = function (ctx, ...arg1) {
    // 改变this，return 函数
    let self = this
    return function (...arg2) {
        return self.apply(ctx, [...arg1, ...arg2])
    }

}

function add(x, y) {
    return x + y;
}

var add5 = add.mybind(this, 5);
// console.log(add5(3));


// call/apply 立刻执行

Function.prototype.mycall = function (context, ...arg) {
    // 改变this指向，立刻执行本函数
    const fn = Symbol('fn')
    context[fn] = this
    const res = context[fn](...arg)
    delete context[fn]
    return res

}
Function.prototype.myapply = function (context, arg) {
    // 改变this，立刻执行
    const fn = Symbol('fn')
    context[fn] = this
    const res = context[fn](...arg)
    delete context[fn]
    return res

}

const sayName = function (greeting) {
    console.log(greeting + this.name)
}
let p = {name: 'k'}
// const a = sayName.myapply(p, ['hello'])


// 节流/防抖

const throttle = (fn, delay) => {
    // 一秒一个
    let pre = 0
    return (...arg) => {
        let now = Date.now()
        if (now - pre > delay) {
            fn.apply(this, arg)
            pre = now
        }
    }

}


const debounce = (fn, delay) => {
    // 只执行最后一个
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }

}

// const f1 = console.log(111)
// throttle(f1, 100)


// 深度克隆
const deepClone = (obj, map = new WeakMap()) => {
    if (!obj || typeof obj !== 'object') return obj

    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    if (map.has(obj)) return map.get(obj)

    let cloneObj = new obj.constructor
    map.set(obj, cloneObj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key])
        }
    }
    return cloneObj
}
const res = deepClone({
    a: 1, b: [{pp: {val: 1111}}, 3, 99, 'ss'], d: {c: false}, kk: 0, d1d: {}
})
console.log(res)


//promise
// event listener

// 继承
