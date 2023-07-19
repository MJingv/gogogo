// https://www.clloz.com/programming/front-end/js/2022/05/07/lazyman/

// 实现一个LazyMan，可以按照以下方式调用：
// LazyMan('Hank')，输出：
// Hi, This is Hank!

// LazyMan('Hank').sleep(5).eat('dinner')，输出：
// Hi, This is Hank!
// // 等待5秒
//     Weak up after 10
// Eat dinner ~
//
//     LazyMan('Hank').eat('dinner').eat('supper')，输出
//
// Hi, this is Hank!
//     Eat dinner ~
//     Eat supper ~
//
//     LazyMan('Hank').sleepFirst(5).eat('supper')，输出
//
// // 等待5秒
// Wake up after 5
// Hi, this is Hank!
//     Eat supper
//
// 以此类推
//
// 题目解析
// 需要封装一个对象，并且这个对象提供不同的方法，比如eat
// 能进行链式调用，那么每个调用方法，都必须返回当前对象
// sleep、sleepFirst方法需要时异步的

class _LazyMan {
    constructor(name) {
        this.name = name
    }

    eat(food) {
        return console.log(`Eat ${food}`)
    }
}

const LazyMan = (name) => {

    const man = new _LazyMan(name)
    console.log(`Hi, This is ${name}!`)

}


LazyMan('Hank').eat('dinner')

