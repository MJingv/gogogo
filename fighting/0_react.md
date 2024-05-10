react渲染流程

- 初始化：React 会创建一个虚拟 DOM 树（Virtual DOM Tree），用于描述组件的结构和属性。
- 更新：当组件的状态或属性发生变化时，React 会触发更新过程。React 会比较前后两次渲染的虚拟 DOM 树的差异，找出需要更新的部分。
- 调和（Reconciliation）：React 使用一种称为调和（Reconciliation）的算法，将需要更新的部分映射到实际的 DOM 节点上。这个过程会尽量复用已有的
  DOM 节点，减少对实际 DOM 的操作。
- 渲染：React 将更新后的虚拟 DOM 树映射到实际的 DOM 节点上，完成渲染过程。React 使用一种称为批量更新（Batching）的机制，将多次更新合并为一次，以提高性能。
- 生命周期方法：在渲染过程中，React 会调用组件的生命周期方法，例如 componentDidMount、componentDidUpdate
  等，允许开发者在特定的时机执行自定义的逻辑。
- 需要注意的是，React 使用虚拟 DOM 来进行高效的渲染，通过比较差异来减少对实际 DOM
  的操作。这种方式可以提高性能，但也需要开发者编写高效的组件，避免不必要的渲染和更新。另外，React 还提供了一些优化技术，例如
  shouldComponentUpdate 方法和 React.memo，用于控制组件的更新过程。


- react的scheduler主要用于调度fiber节点的生成和更新任务
- 当组件更新时，reconciler执行组件的render方法生成一个fiber节点，再递归生成fiber子节点
- 每个fiber节点生成都是一个单独的任务，会以回调的形式交给scheduler执行调度处理，再scheduler根据任务的优先级执行任务
- 任务的优先级是根据车道模型，将任务进行分类，每一类拥有不同的优先级，所有的分类和优先级都是在react进行枚举
- scheduler按照优先级执行任务时，会异步执行。每一个任务执行完成后，会通过*requestIdleCallback*判断下一个任务是否能在当前渲染帧的剩余时间内完成
- 如果不能完成就中断，把线 程的控制权交给浏览器，剩下的任务则在下一个渲染帧内执行
- 整个reconciler和scheduler的任务执行完后，会生成一个新的 workinprogressfiber
  的新的节点树，之后reconciler触发commit阶段通知render渲染器去进行diff操作，这就是patch
- commit是更新实际dom的操作

单节点diff算法

- 判断老fiber树有没有对应的fiber节点，无则新增并更新dom
- 有老fiber，判断key是否相同，不同则删除老节点并新增新节点
- 若key相同，判断type是否相同，不同则删除老节点并新增新节点
- 若type和key都相同，直接返回老节点

多节点diff算法（新增/删除/移动节点）使用双重遍历,map

- 第一轮遍历将children[i]和currentFiber和child[i++]和currentFiber.sibing进行对比，不可复用就结束
- 当第一轮遍历没有提前结束说明所有节点可以复用，直接返回老节点
- 若新的children遍历完成，currentfiber未完成，说明删除，对未完成的currentfiber兄弟节点标记删除
- 若新的children未完成，currentfiber完成，说明新增，需要生成新的workinprogressfiber节点
- 若children和currentfiber都未完成，说明节点位置发生变更，对剩余currentfiber遍历，通过key找到每一个节点在children中对应的老节点，老节点中的位置替换为新节点的

批处理：将多次更新操作合并成一次更新，减少不必要的重绘和重排，提高性能和效率。

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

react hooks hooks好处

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

useeffect触发时机

- 组件挂载后
- 依赖变化时
- 组件卸载前

usememo和usecallback

- 入参，函数+依赖项，根据依赖项数组的编号判断是否重新计算or返回新的函数
- usememo用于缓存计算结果
- usecallback缓存回调函数
- 都可以避免不必要的重复计算和函数创建，提高函数组件的性能

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

store state reduce：纯函数 (action,state)=>state action：变更 dispatch effects(saga)

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

react合成事件 在事件处理方面的一种优化机制。底层实现了一套事件系统，用于处理浏览器原生事件的跨浏览器兼容性和性能问题

- 抹平不同浏览器间的差异
- 性能优化，使用了事件委托，绑定在最外层dom，减少事件监听数量，提高性能
- 事件池，处理完事件后，将事件对象重置并放回事件池里，以便下次使用。减少内存分配及垃圾回收，提高性能
- 提供统一的api使用体验。合成事件属性，提供了额外的属性和方法，event.target 获取出发事件的dom，event.preventDefault
  阻止默认事件，stoppropagation停止事件

react合成事件的绑定和分发

- react启动在页面渲染根元素绑定原生dom事件
- 在组件渲染时，会通过jsx解析的元素绑定事件，并将这些事件与原生事件一一映射
- 用户点击元素，事件冒泡到根元素，dispatchEvent进行事件派发
- dispatchEvent根据事件的映射关系以及dom找到react中与之对应的fiber节点
- 找到fiber节点后，将其绑定的合成事件函数加到函数执行队列
- 依次执行队列中的函数完成事件的触发流程

原生dom事件

- dom level0 html元素直接绑定事件，onclick、onmouseover
- dom level1 使用addEventListener/removeEventListener 绑定多个事件
- dom level2 addEventListener 增加冒泡/捕获
- dom level3 增加自定义事件
- dom level4 增加inputevent、mutationevent、touchevent等，增加once（一次）、passive（不阻止默认行为）、capture（捕获）

react新特性

- Service Component ：在 React 中，Service Component 是一种特殊的组件类型，用于处理业务逻辑和数据操作，而不负责渲染UI。Service
  Component 通常用于封装与后端 API 交互、数据处理、状态管理等功能。
- React 的 Suspense 是一个用于处理异步加载的组件，它可以在等待异步操作完成时显示一个加载状态，以及在异步操作完成后显示异步内容。
  Suspense 组件的主要作用是在异步加载的组件树中，为等待异步操作的组件提供一个占位符，以便在异步操作完成之前显示一些加载状态或备用内容。