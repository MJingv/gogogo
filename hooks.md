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

### hook 的含义

- 组件尽量是纯函数，如果需要外部功能和副作用，用 hooks
- 钩子用 use 前缀，usexxx

useState

- 状态钩子
- 定义 ```const [btnText,setBtnText] = useState(defaultValue)```
- 使用 ```setBtnText(newValue)```

useContext

- 共享组件间状态钩子
- ```const AppContext = React.createContext({})```
- ```<AppContext.Provider value={{}}><div>xxxxx</dive></AppContext.Provider>```
- ```const {username}=useContext(AppContext)```

useReduce

- action 钩子 ```(state,action)=>newState```
- ```const [state,dispatch]=useReducer(reducer,initialState)```
- 此 hooks 可以提供共享状态和 reducer 函数，但没有 redux 的 middleware 和 time travel

useEffect

- 副作用钩子，向服务器请求数据，`componentDidMount` 代码可以放在 useEffect 中
- ``` useEffect(()=>{},[dependencies])```
- 每当 dependencies 变化时，useEffect 会执行。
- 第一次渲染时，useEffect 也会执行

自定义hooks

- 上面的 hooks 可以封装成自定义 hook，便于共享

``` 
const usePerson=(personId)=>{
  const [loading,setLoading]=useState(true)
  const [person,setPerson]=useState({})
  useEffect(()=>{
    setLoading(true)
    fetch('xxx')
      .then(response=>response.json())
      .then(data=>{
        setPerson(data)
        setLoading(false)  
      })
  },[personId])
  return [loading,person]
}
```

以上就是一个自定义钩子，可以封装引用：

```
const Person=({personId})=>{
  const [loading,person]=usePerson(personId)
  if(loading === true) return <p> loading... </p>
  return <dive>{person.name}</dive>
}
```

react 的自定义 hooks 和 vue 的 mixin 有什么异同？

- 同：解决组件间的逻辑复用问题
- 异：react 的 hooks 在代码组织，重名冲突解决，状态共享等方面有优势
    1. 逻辑复用和组织：React的自定义Hook允许你在不改变组件结构的情况下复用状态逻辑，而Vue的Mixin则是通过混入方法、生命周期钩子等到Vue组件中来实现逻辑复用。
    2. 冲突解决：在使用Mixin时，如果不同的Mixin包含同名的方法或生命周期钩子，可能会导致命名冲突，而React的自定义Hook则不存在这个问题，因为每个Hook都是独立的函数。
    3. 代码可读性：React的自定义Hook可以更好地保持代码的可读性和可维护性。因为Hook直接在组件中使用，可以清楚地看到其依赖关系和执行时机。而Vue的Mixin则可能会降低代码的可读性，
       因为Mixin的内容在其他文件中定义，可能需要在多个文件之间跳转才能理解完整的逻辑。
    4. 状态共享：React的自定义Hook可以共享状态，而Vue的Mixin则无法做到这一点。这意味着使用React
       Hook，你可以在不同的组件之间共享和同步状态，而在Vue中，你可能需要使用Vuex或其他状态管理库来实现这一功能。

