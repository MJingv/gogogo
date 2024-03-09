react生命周期

mount阶段-4

- constructor
- getderivedstatefromprops(props,state)
- render
- componentdidmount

update阶段-5

- getderivedstatefromprops(props,state)
- shouldcomponentupdate(nextProps,nextState)
- render
- getsnapshotbeforeupdate(prevProps,prevState)
- didupdate

unmount阶段

- componentwillunmount

error阶段

- getderivedstatefromerror(error)
- componentdidcatch(error,info)

react hooks
hooks好处

- 简化代码、副作用、状态管理，可读性好
- 代码复用、函数式编程
- 适合大部分简单场景

常用的hooks

- usestate 函数声明&更新状态
- useeffect 处理副作用，请求，操作dom，异步
- usecontext 全局上下文
- usereduce(state,action) 不同组件间状态管理
- usememo 缓存计算结果（性能优化）
- usecallback 缓存函数click等（性能优化）
- useref 获取dom引用，多次渲染只有一个，ref会有多个

规则：

- hooks不能在循环/嵌套/条件里使用
- 执行顺序和依赖关系保持一致

react复用方法

- mixin
- hoc
- render props
- 自定义hooks

redux
https://juejin.cn/post/6844903870246699022

store
state
reduce：纯函数 (action,state)=>state
action：变更
dispatch
effects(saga)

原则

- 单一数据源
- state只读
- 纯函数修改
- 异步需要saga

dispatch一个action