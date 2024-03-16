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

# react 更新

reconciliation 是 react核心算法，用于比较vdom差异并更新实际dom

- diff算法：对比新旧vdom，找出差异
- 更新差异：根据差异类型，操作实际dom，增删改dom或节点
- 递归处理：处理子节点差异

fiber是react16新协调机制，实现增量更新和优先级调度，是对reconciliation的一种实现方式，之前用stack实现

# react的children diff算法

对比新旧dom，确定更新的部分

- 列表遍历，新旧vdom的孩子列表，对比key和type
- diff策略
    - 新旧key和type同，对比&更新属性
    - 新旧type或type不同，用新
- diff优化
    - 尽可能复用，减少dom操作
    - 使用key跟踪和标识

# react和vue的diff对比

- 算法不同
    - vue：双端比较算法
    - react：fiber增量渲染和调度

# rn

virtual dom 最重要的是是*平台无关性*

3个线程：

- js线程：负责逻辑处理，打包js bundle给js引擎执行
- shadow线程：布局&ui。创建shadowtree模拟react结构树，rn的flex布局native不支持，需要yoga转换
- ui线程/主线程/native线程：原生渲染和原生能力

渲染：

- js线程把js代码序列化成json
- 通过bridge给到shadow线程
- 反序列化生成shadowtree
- 给yoga生成原生布局信息
- bridge给ui线程，反序列化，布局，绘制
