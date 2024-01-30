const deepClone = (obj, hash = new WeakMap()) => {
    if (obj === null) return obj
    if (typeof obj !== 'object') return obj

    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)


    if (hash.has(obj)) return hash.get(obj)
    let cloneObj = new obj.constructor
    hash.set(obj, cloneObj)

    for (let key in obj) { //遍历【可枚举】属性，可能是自身和原型链上的属性
        if (obj.hasOwnProperty(key)) {//自身的属性
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj
}

const res = deepClone({a: 2, b: {c: 3}})
console.log(res)