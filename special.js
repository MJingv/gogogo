//奇奇怪怪得题目
//A instanceof B (A是否为B的实例)
//A的__proto__指向B的prototype
const a = 123 instanceof Number //false
const b = new Number(123) instanceof Number //true
const c = Number(123) instanceof Number //false
console.log(a, b, c)
