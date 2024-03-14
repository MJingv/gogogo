// 继承
// 我是函数，我妈是构造函数，妈妈.prototype增加属性给我，我.constructor找到妈妈

// this指向
// 在构造函数，指向new的obj
// 在普通函数，指向调用方
// 在箭头函数，指向定义方
// default，global/window(lax),undefined(strict)

function Parent() {
    this.name = 'parent'
    this.money = 1000
}

Parent.prototype.house = 10

function Child() {
    Parent.call(this) // 用父亲的
    this.name = 'child'
}

Child.prototype = Object.create(Parent.prototype) //继承祖父的
Child.prototype.constructor = Child // 你的父亲是我，不是祖父

const c = new Child()

// console.log(c.money, c.house, c.constructor)

// 手写new
function Person(name, age) {
    this.name = name
    this.age = age
}

function myNew(fn, ...arg) {
//     创建新obj
//     执行fn
//     改变this指向到新obj
//     return obj
    const obj = Object.create(fn.prototype) // 创建一个新obj，他的原型是
    fn.apply(obj, arg)
    return obj
}

// const person = new Person('kk', 18)
const person = myNew(Person, ['kk', 18])
console.log(person.name, person.age)

// const obj = new Object({a: 1})
// const obj = myNew({a: 1})

// console.log(obj.a)

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


// JSON.Stringify(obj) 环不行、特殊对象不行
// _.cloneDeep(obj) 包太大，单clone压缩后5.3k
// js native way: structuredClone 兼容性不行

// 深度克隆
const deepClone = (obj, map = new WeakMap()) => {
    if (!obj || typeof obj !== 'object') return obj

    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    if (map.has(obj)) return map.get(obj)

    let cloneObj = new obj.constructor()  // obj可以是数组/对象/函数
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
// console.log(res)


// 不同对象创建的区别
// {} 原型是Obeject.prototype
// new Foo() 构造函数，继承Foo的prototype
// Object.create(p) 继承p的proto


//promise
// event listener



