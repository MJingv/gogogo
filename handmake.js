//节流
const throttle = (fn, delay) => {
    let last = null
    return () => {
        let now = new Date()
        if (now - last > delay) {
            fn()
            last = now
        }
    }
}

//防抖
const debounce = (fn, delay) => {
    let timer = null
    return () => {
        clearTimeout(timer)
        timer = setTimeout(fn, delay)
    }

}
//手写call apply bind
Function.prototype.mycall = function (ctx, ...res) {
    ctx.foo = this
    ctx.foo(res)
    delete ctx.foo
}
const k = {
    name: 'kk'
}
const getname = function () {
    console.log(this.name, '----')
}
// getname.mycall(k, '999')

Function.prototype.mybind = function (ctx, ...res) {
    ctx.foo = this
    return () => {
        ctx.foo(res)
        delete ctx.foo
    }
}

//手写new
const myNew = function (Foo, ...res) {
    const obj = {}
    obj.__proto__ = Foo.prototype
    Foo.call(obj, ...res)
    return obj
}

function Foo(name) {
    this.name = name + '999'
}

// const kk = myNew(Foo, 'kkkk')
// console.log(kk.name)

//继承

function Parent() {
    this.name = 'p'

}

Parent.prototype.say = function () {
    console.log(this.name, '---p')
}


function Child() {
    Parent.call(this)
    this.name = 'c'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const c = new Child()
console.log(c.say())
