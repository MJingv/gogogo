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
console.log(add5(3));


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
const a = sayName.myapply(p, ['hello'])

// console.log()


// 继承

// 节流/防抖

// 深度克隆
//promise
// event listener