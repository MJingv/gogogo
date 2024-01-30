// typeof obj ==='object' 有 null, {},[],//,,new Date()
// instanceof主要检测构造函数的prototype是否在原型连上 aka 一个实例是否是某个类型

const deepClone = (obj, hash = new WeakMap()) => {
    if (obj === null) return obj
    if (typeof obj !== 'object') return obj

    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    if (hash.has(obj)) return hash.get(obj)
    let cloneObj = new obj.constructor
    hash.set(obj, cloneObj)

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj

}
const res = deepClone({a: 2, b: {c: 3}})
console.log(res)