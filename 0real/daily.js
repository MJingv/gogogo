function Father(name) {
    this.name = name || 'father'
    this.money = 1000
}

Father.prototype.house = 10

function Child(name) {
    Father.call(this)
    this.name = name || 'child'
}

Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Child

const f = new Father('f')
const c = new Child('c')
// console.log(c, c.house,c.__proto__,Child.prototype)


const list = [2, 9, 0, 11, 29, 1, 3, 2]

const quickSort = (list = []) => {
    const len = list.length
    if (!len) return []
    const left = [], right = [], equal = []
    const p = Math.floor(len / 2)
    const mid = list[p]
    list.forEach(item => {
        if (item === mid) {
            equal.push(item)
        } else if (item > mid) {
            right.push(item)

        } else if (item < mid) {
            left.push(item)
        }
    })
    return [...quickSort(left), ...equal, ...quickSort(right)]
}
// const res = quickSort(list)
console.log(res)


const throttle = (fn, delay) => {
    let pre = null

    return (...args) => {
        let now = Date.now()
        if (now - pre > delay) {
            fn.apply(this, args)
            pre = now
        }


    }


}
const debounce = function (fn, delay) {
    let timer = null
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }

}
