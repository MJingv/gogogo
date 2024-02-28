https://mp.weixin.qq.com/s?__biz=MzI4OTU0NTU1NA==&amp;mid=2247484851&amp;idx=1&amp;sn=0d79797b86e27f6694a23a1ee0289a79&amp;scene=21#wechat_redirect

# 前端做三件事

- fetch data获取数据
- manage state管理状态
- render page页面渲染

# 跨端核心：虚拟机+渲染引擎

## 网页：js engine + webkit

## 网页+：js engine+webkit+native能力

- jsbridge
- https://juejin.cn/post/6844903585268891662

## 小程序：js engine+webkit

- 阉割版的网页

## rn：js engine+native renderpipeline

- vdom 映射到native布局，跨平台开发
- 只能画ui

## flutter：dart vm+flutter renderpipeline

- dart vm 支持jit+aot，保证开发效率
- 视图数据给skia，再给openg/metal 图形api，最后给gpu渲染

## 浏览器的webkit/blink渲染流程

- 解析html生成dom-tree
- 解析css与dom-tree生成render-tree
- 给render-tree布局，重排
- 绘制render-tree，重绘
- 执行js，可以更改dom

## rn渲染流程

- 当state变化，react的组件tree（vdom）会计算新的组件tree
- diff，比较新旧tree，计算最小更新操作
- conciliation，生成一系列更新指令
- 发送指令到native，通过bridge让native接受信息并改变组件
- native执行更新。

## flutter渲染流程

## 绘制painting流程

- 遍历渲染树，从root开发，层序遍历
- 创建图层，对于css动画的节点会创建新的图层
- 绘制内容，根据属性（颜色、边框、背景色等）绘制
- 合成，将所有图层按正确顺序合并

## 合成图层流程

- 创建图层tree，根据rendertree创建一个图层tree
- 计算图层属性，大小，位置，透明度等
- 创建绘制列表，包含所有绘制命令
- gpu合成

## flutter渲染

- 创建widget-tree，state变化会创建新的widget-tree
- 布局layout，遍历widget-tree，root开始从上到下
- 绘制plaint，从下向上遍历
- 合成到layer tree，遍历layertree并绘制

# machpro：quickjs+preact+组件+样式+bridge

## preact

目前前端框架的更新粒度：

- 应用级更新：state更新会由reconciliation后触发应用的渲染。如react
- 组件级更新：state更新只会引起该state的组件更新，vue2
- 节点级更新：state更新直接绑定的节点，指向型更新，solidjs，svelte

不是vdom影响了框架，而是更新策略决定了是否需要vdom

- 之前的方式是solidjs+自建react，无vdom，响应式更新
- 新方案preact直接操作dom

#

## js引擎

https://cloud.tencent.com/developer/article/1801742

定义：解析执行js代码，转化成低级语言（机器语言/汇编）
工作流程：

- 词法分析，分解code为token
- 语法分析，抽象成ast
- 创建字节码
- 字节码优化（长短指令优化、指令合并、label优化）
-


- 解释or编译，ast转换成字节码/机器码
- 执行，运行字节码/机器吗，内容分配，垃圾回收

### v8

- Google开发的，用于chrome和nodejs。
- 最流行的。
- JIT即时编译。

### spiderMonkey

- mozilla开发的，用于firefox
- 世界第一个

### jscore

- apple开发的，用于Safari
- nitro即时编译

### quickjs

- 小型js引擎
- 用于嵌入式和脚本工具

## 编译时vs运行时vsJIT

js是解释型语言。

- compile time。code转为机器码/字节码。进行语法/类型等检查
- runtime。编译型语言会生成字节码，解释型语言会执行代码
- just in time。编译同时发生在编译和运行。提高程序效率。

# 小程序：jscore定制引擎+kbone

vue2用Object.defineProperty实现响应式

- list改长度和直接索引改值无法检测
- 无法检测obj的新增和删除

vue3用es6的proxy

- 只支持es6，无法polyfill 







