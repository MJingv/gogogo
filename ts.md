ts学习笔记
---
https://wangdoc.com/typescript/intro

- TypeScript 的作用，就是为 JavaScript 引入这种静态类型特征。
- 静态类型优点
    - 静态分析，不运行代码可确定变量类型
    - 发现错误
    - ide的语法提示及自动补全
    - 代码文档&重构
- 静态类型缺点
    - 灵活性降低
    - 兼容性降低
    - 引入独立编译步骤
- 2023年发布ts5.0

### any vs unknown vs never

- any有污染问题
- unknown为严格版any，不能给其他类型变量赋值，运算符少，判断具体类型后使用
- never是空，不包含任何值，保证运算类型的完整性，可以赋值给任何变量

### 类型系统

- js值类型8个：undefined/null/string/number/boolean/symbol/bigint/object
- 联合类型：A|B 其一满足
- 交叉类型：A&B 同时满足

### 数组

- ```let arr:(number|string)[]```
- ```let arr:Array<number|string>```
- 只读 ```const arr:readonly number[]=[0,1]```

### 元组(tuple)

- 特有类型，可以组合
- ```const s:[string,number,boolean]=['a',1,false]```

### 对象

- ```let obj={a:boolean,b:string}```
- interface
- 未知属性 ```let obj={[property:string]:number}```

### interface
