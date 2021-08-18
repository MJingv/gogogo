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
