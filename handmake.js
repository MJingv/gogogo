//节流
const throttle = (fn, delay) => {
    let last = null
    return () => {
        const now = new Date()
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
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}
//手写call apply bind

Function.prototype.mycall = function (ctx, ...res) {
    ctx.foo = this
    ctx.foo(res)
    delete ctx.foo
}

Function.prototype.mybind = function (ctx, ...res) {
    ctx.foo = this

    return () => {
        ctx.foo(res)
        delete ctx.foo
    }
}

const k = {
    name: 'kk'
}
const sayname = function () {
    console.log(this.name, '---myname')
}
// sayname.mycall(k, 'wo是参数')
const a = sayname.mybind(k, 'wo是参数')
a()


//手写new
