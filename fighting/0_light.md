https://mp.weixin.qq.com/s?__biz=MzI4OTU0NTU1NA==&amp;mid=2247484851&amp;idx=1&amp;sn=0d79797b86e27f6694a23a1ee0289a79&amp;scene=21#wechat_redirect
---
营销4ps：product、price、place、promotion、strategy
用户分类：新客、老客、潜客
老客：流失、沉默、（成熟、过渡、尝鲜）
用户生命周期：低潜、高潜、引入、成长、成熟、衰退、流失

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

# machpro：quickjs+preact+yoga布局

- rn渲染机制
    - js-》vdom-》fiberdom -桥通信- shadowtree-》yoga layout-》 viewtree
    - 桥通信：异步、耗时大、一批一批执行（fiber）

- rn问题：
    - 现象：首屏时间长、交互动效卡顿、长列表白屏。
        - 首屏时间长：mrn提前初始化js引擎和bundle
        - 交互动效卡顿：
            - 因为交互是异步的js和native不同线程需要切换，每次手势2次通信（native->js,js ->native）
            - 解决：阿里bingingx预置表达式（兼容性差）
        - 长列表白屏
            - 因为rn是异步渲染、桥通信
            - 无法从根本上解决
    - 原因：js引擎执行慢、react框架执行慢、native和js通信慢/切换慢（ui主线程，js单独线程）
- machpro如何解决rn问额
    - js引擎慢：用quickjs，没用jit，用c编写，编译时lexer、parse、字节码，runtime直接run字节码,.qbc文件保存字节码
    - react执行慢，preact快30%
    - 通信慢：js在主线程，不通信，不切换
    - 为高达设计多线程
- 提供给js2个内容：dom api+module api

## preact

目前前端框架的更新粒度：

- 应用级更新：state更新会由reconciliation后触发应用的渲染。如react
- 组件级更新：state更新只会引起该state的组件更新，vue2
- 节点级更新：state更新直接绑定的节点，指向型更新，solidjs，svelte

不是vdom影响了框架，而是更新策略决定了是否需要vdom

- 之前的方式是solidjs+自建react，无vdom，响应式更新
- 新方案preact直接操作dom

# quickJs

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

jit功能：js转机器码

v8 jit:baseline jit、turbofan、ignition

- baseline jit 负责快速生成可执行代码
- turbofan高度优化机器码
- ignition解析生成中间表示

jscore jit：llint、dfg jit

- llint解析执行js
- dfg转为高效机器码

# 小程序：jscore定制引擎+kbone

vue2用Object.defineProperty实现响应式

- list改长度和直接索引改值无法检测
- 无法检测obj的新增和删除

vue3用es6的proxy

- 只支持es6，无法polyfill

---
动画实现

- css3：animation/translate
- js：setinterval/requestAnimationFrame，操作的是元素
- canvas
    - js提供api，canvas渲染，操作的是像素，html5的新元素
    - 渲染流程
        - 获取context
        - 绘制指令（fillrect、filltext、drawimage）
        - 浏览器优化指令，生成实际像素绘制
        - 渲染引擎绘制到内存的画布，像素计算、颜色填充、图像贴图等
        - 显示更新：绘制好的像素信息发给显示设备，完成渲染
- webgl（graphic library）
    - 基于opengl es嵌入式系统图形渲染

threejs
渲染方式

- webglrenderer
- css3renderer
- svgrenderer
- canvasrenderer
- raytracingrenderer

立方体全景图实现

- 创建场景scene和相机camera
- 创建立方体boxgeometry
- 立方体贴图材质material和网格mesh
- 反转立方体的面，x=-1
- 创建渲染器 css3renderer
- 渲染场景和动画
- 点击tag的实现
    - 创建tag的dom，获取点击的第一个tag
    - 更好的办法是拾取，获取第一个

---

小程序动画选型：lottie+pixi+dom

目的：选择一个动画播放器来提高开发效率

动画播放器选型：svga+lottie

- svga直播动画、stars多、支持ae属性少、数据维度是帧
- lottie页面动画多、Airbnb、支持ae属性多，数据维度是层

lottie小程序选型：

- lottie-web，h5，复杂场景，整个画布，官方解释器
- lottie-miniprogram ，ae属性少，小程序，简单场景，部分画布，单个动画
- pixi-lottie，复杂场景，ae属性多，小程序canvas

页面实现方式

- 盆+树 lottie，一直在动
- 气泡+宝箱 pixi，可以手写
- 列表 dom

遇到的问题：

- 白屏/闪退：内存泄漏（iOS的jscore的gc比v8差）
- 过热：帧率、节流

工具-》全部dom+css3

生成帧的方式：重排、重绘、合成

动画优化方式3个：刷新&帧率、合成层、gpu硬件加速

刷新&帧率

- requestanimationframe（小程序没有）代替setinterval

合成层：

- 作用：
    - 独立绘制&渲染：独立的合成层，减少其他元素变化的影响
    - 图层分离：减少重绘&重排
    - 开启gpu硬件加速，提高动画流畅度和响应性能
    - 硬件优化

- 方法：
    - 小程序触发合成层：wx.createAnimation
    - 浏览器触发合成层:will-change/opacity/translate/filter

开启gpu硬件加速：

- 方法
    - 开启合成层 opacity/will-change/opacity/filter
    - 3d变换 translate3d/rotate3d/scale3d
    - canvas/webgl

- 硬件加速可以提高动画性能：
    - 并行处理：硬件加速利用了GPU（图形处理单元）的并行处理能力。GPU是专门用于图形渲染的硬件，具有大量的并行计算单元。通过将动画的计算和渲染任务交给GPU处理，可以充分利用GPU的并行计算能力，加速动画的绘制和渲染过程。
    - 硬件优化：GPU通常会针对图形渲染进行硬件优化，例如使用专门的纹理缓存、顶点缓存等技术，以提高图形渲染的效率和性能。这些硬件优化可以使动画的绘制和渲染更加高效，减少CPU的负载，提高动画的流畅度。
    -
  减少主线程压力：在硬件加速中，动画的计算和渲染任务通常会在GPU上进行，而不是在主线程上进行。这样可以减轻主线程的压力，使主线程能够更好地处理其他任务，例如用户输入响应、布局计算等。通过减少主线程的负载，可以提高动画的响应性能和流畅度。
    - 帧率匹配：硬件加速可以帮助动画的帧率与显示设备的刷新率匹配。显示设备通常有固定的刷新率（例如60Hz），而硬件加速可以确保动画的帧率与刷新率保持一致。这样可以避免动画的撕裂和卡顿现象，提供更流畅的视觉效果。

综上所述，硬件加速通过利用GPU的并行处理能力、硬件优化和减轻主线程压力等方式，可以提高动画的绘制和渲染效率，提供更好的动画性能和流畅度。在前端开发中，合理地使用硬件加速技术，可以改善用户体验，提升应用的质量和性能。

# gc

- 算法：jscore引用计数法（弱引用+周期检测处理循环引用），v8分代gc，scavenger，quick标记清除法
- 并发：v8并发垃圾回收，js可以执行。jscore停止-复制，垃圾回收的时候js停止执行
- 内存管理：v8使用了堆内存管理，将内存分为新生代和老生代两个堆。jscore也是堆内存管理

# 性能优化

关注指标

- fcp-first content paint
- fmp-first meaning paint
- ttl-time to interactive

方向：加载资源、请求数据、渲染页面、交互&动效

加载资源

- bundle体积优化：减少包体积、拆包、预加载
- 懒加载：不常用的bundle首页后再加载
- 图片：宽高限定、提前加载、缓存、

接口请求：

- 预请求、
- 精简请求,减少头及无关的内容
- https，有条件的http3

页面渲染：

- 分步渲染
- 按需加载
- 减少重绘/重排

交互

- 动画：合成层/开启gpu硬件加速
- 长列表：虚拟列表、按需加载
- 点击，滚动：防抖节流
- 减少一帧的产生时间
    - 避免频繁gc：小颗粒对象产生
    - 减少js执行时间，每次任务不要太久，webworker

小程序特殊
数据和ui双线程

优势：

- 数据驱动
- 跨平台
- 并行计算
- 响应性能

  问题：
- 通信耗时，线程竞争，资源占用。
- 最佳实践
    - setdata控制大小和更新频率
    - nextticket和requestanimationframe优化数据更新和渲染时机
    - createworke创建worker进行耗时计算
  
