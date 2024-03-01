js原始数据类型

- 7个:null/undefined/boolean/string/number/symbol/bigint

js引用数据类型

- 6个object:object/array/date/regexp/function/math

0.1+0.2!==0.3

- 0.1和0.2转成二进制都会无限循环，所有语言都如此，它们有double/float
- 因为浮点数限制，截断了二进制数字，出现了精度丢失s
- 最大是2^53-1,最小是-(2^53-1),超过用bigint，10n代表10倍的最大数

typeof

- 检测基本类型
- typeof null===‘object’ 这个是错误的

instanceof

- 判断是否为类的实例
- 判断引用类型，也可以判断包装object的基本类型
- reduce

```js
const list = [1, [2, [3, [4, 5]]], 6]
const helper = (list, res = []) => {
    const len = list.length
    if (!len) return
    for (let i = 0; i < len; i++) {
        if (Array.isArray(list[i])) {
            helper(list[i], res)
        } else {
            res.push(list[i])
        }
    }
    return res

}
```

- 递归
- 扩展运算符

flat数组

- list.flat(depth=Infinity)
- JSON.stringify(list).replace(/\[|\]/g,'').split(',')

数据存储

- 基本类型 栈
- 引用类型 堆（复制引用地址）
- 闭包 堆

v8垃圾回收gc

- js单线程，垃圾回收内存小，64位1.4g，32位0.7g
- 新生代+老生代
- 新生代
    - 2部分组成：from忙+to闲
    - from忙的scavenger算法顺序复制到to
    - 多次copy还活晋升到老生代
    - 只能用一半内存，性能高
- 晋升（从新到老）：scavenge1次，to>25%，多次在新生代里
- 老生代
    - 标记清除：遍历 使用中+强引用 做标记，删除无标记的。整理内存碎片，向一边靠拢
    - 增量标记：分解多部分，每次执行1小部分

v8执行js过程

- 词法分析和语法分析生成AST树
- AST转换成生成字节码（节约内存）
- 解释器执行字节码，hotspot进行编译，生成机器码
- 解释器和编译器结合叫JIT（即时编译）

event loop

- macrotask宏任务：网络请求/定时器/渲染页面/用户交互/io/js脚本执行
- microtask微任务：process.nextticket/promise.then/reject/mutationObserver