const arr = [{name: '张三', age: 20}, {name: '李四', age: 18}, {name: '王五', age: 25}];

const ageSort = arr.sort((a, b) => a.age - b.age)
const nameSort = arr.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
console.log(nameSort);