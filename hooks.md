React hooks
---

- 16.8+
- not a class ,but a function
- lots of useCallback,you can create your own hooks

useCallback
---

- useCallback(fn,dependencies)
- useCallback is a hook lets you *cache* a function definition between re-renders
- function(){} diff from ()=>{},{} diff from object
- [best practice] handles,events,props change,,(in small part)
- *useMemo* caches the result of calling your function,*useCallback* caches the function itself

useContext
---

- useContext is a hook lets you read and subscribe to context form your component
- useContext(someContext)

useEffect
---

- useEffect is a hook lets you synchronize a component with an external system
- ustEffect(setup,dependencies?)
-

ruanyifeng
---

https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html

### class vs function

- 类（class）是数据和逻辑的封装。
- 函数一般来说，只应该做一件事，就是返回一个值。

### side effect

- 函数式编程将和数据计算无关的操作都称为 side effect

### hooks

- hook就是react函数组件的副效应的解决方案，用来为函数组件引入副效应
- 函数组件主体只应该返回组件的html代码，所有其他操作（side effect）都必须用hook引入
    - useState() 保持状态，最通用，找不到对应的hook就用它
    - useContext() 保持上下文
    - useRef() 保存引用

### useEffect()的用法

- useEffect 的作用就是一个side effect函数
- 组件每渲染一次，改函数自动执行一次
- 按条件渲染，不想每次都渲染就加第二个参数（数组）。只有依赖变化，才会重新渲染
- 第二个是空数组，只会渲染一次
- 用途
    - 获取数据
    - 事件监听/订阅
    - 改变dom
    - 输出日志
- 可以返回一个函数，用于清理side effect。是在每次副效应函数重新运行之前，会清理上一次的副效应。
- 如果多个 side effect 要用多个useEffect，不要写一起


https://www.ruanyifeng.com/blog/2019/09/react-hooks.html

### redux作者dan总结组件class的缺点
- 大型组件难拆分和重构，也难测试
- 逻辑分散在各个方法中，导致重复逻辑
- 组件类引入复杂的编程模式，render，props 和高阶组件
