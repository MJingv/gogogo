https://mp.weixin.qq.com/s?__biz=MzI4OTU0NTU1NA==&amp;mid=2247484851&amp;idx=1&amp;sn=0d79797b86e27f6694a23a1ee0289a79&amp;scene=21#wechat_redirect
---

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

https://mp.weixin.qq.com/s?__biz=MzI4OTU0NTU1NA==&mid=2247484460&idx=1&sn=73efbdc3a3877d3ac0acc36a9ef60471&scene=21#wechat_redirect

- rn渲染机制
    - js-》vdom-》fiberdom -桥通信- shadowtree-》yoga layout-》 viewtree
    - 桥通信：异步、耗时大、一批一批执行（fiber）

- rn问题：
    - 现象：首屏时间长、交互动效卡顿、长列表白屏。
        - 首屏时间长：mrn提前初始化js引擎和bundle
        - 交互动效卡顿：
            - 因为交互是异步的js和native不同线程需要切换，每次手势2次通信（native->js,js ->native）
            - 解决：阿里bindingx预置表达式（兼容性差）
            - bingdingx,将交互行为以表达式的方式描述，提前预置到native，避免在行为触发时js和native频繁通信
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
  ¬

---

https://cloud.tencent.com/developer/article/1801742
---

# v8/jscore/hermes/quickjs 跨段开发的js引擎怎么选？

背景：

- native语言在开发效率存在不足，从app版本更新，应用市场审核发布，用户下载更新，总存在时间差，这导致新的功能无法及时覆盖全量用户
- 为解决这问题，开发者一般会在项目里引入一个脚本语言，提速app研发流程
- 移动端常用lua（游戏领域多）、js

js引擎选型要点

- 性能
- 体积
- 内存占用
- js语法支持程度
- 调试便捷性，，是否支持debug
- 应用市场平台规范，iOS平台禁止集成待jit的vm

jscore-iOS的最佳选择

- 项目里引用jsc，包体积0开销

v8

- 性能好，开启jit内存占用高，v8体积大
- v8 = ignition interpreter解释器 + turbofan编译器 + snapshot快照加速 + orinoco垃圾回收 + parser 解析器
- ignition负责执行冷启动和热启动代码，turbofan负责将热点代码（hot code）编译成高效机器码，以提高执行性能
- 调试需要第三方库

hermes

- 专门给rn的js引擎，不支持jit，直接生成/加载字节码，cpu密集计算（矩阵变换、参数加密）放native做，算好了给js
- android里用可以，支持调试

quickjs

- 高度支持语法，内存占用少，嵌入式系统友好，和hermes跑分差不多
- quickjs生成字节码拼到.c文件里，跑起来需要再编译一次生成二进制文件
- 目前不支持调试

选型思路

- 单引擎
- 双引擎
    - ios-jsc，android-v8，eg. weex,nativescript
    - ios-jsc,android-hermes,eg.rn
    - ios-jsc,android-quickjs,eg.hummer
- 调试
    - 不带调试的可以 remote js debugging：把js通过websocket传入chrome的web worker里，用v8调试

# 跨端方案选型思路

h5:外链
rn：千人千面展示页面、一般动画（弹窗、轮播图等）、通用业务组件
native：原生组件（地图、图片选择）、精细动画、强交互（跟随）、高性能模块（加购）

# 前端vs跨端

https://mp.weixin.qq.com/s?__biz=MzI4OTU0NTU1NA==&mid=2247485122&idx=1&sn=5c4c2249a43e741029108c491a29e7bc&chksm=ec2ccaffdb5b43e903a5a68ac97c5ed8403955a071c9befc8b96dc2814c55e3ec6c860b58d32&cur_album_id=1623026943430361089&scene=189#wechat_redirect
指定标准规范协议流程

- 版本号、兼容性、提测流程等

bundle优化

缩、延、拆

- 缩，缩小bundle总体积，减少js加载和解析时间
    - 使用analyze插件查看依赖
    - lodash/moment.js等
- 延，动态导入，懒加载，按需加载，延迟执行
- 拆，拆分公共模块和业务模块，避免公共模块重复引入
    - 公共库common，业务business，抽象复用逻辑

推动新增worker

开发注意

- 精细化管理，避免过渡绘制（android）：减少背景色重复设置，避免半透明颜色、圆角、阴影
- 减少通信，减少js线程计算，减少js和ui线程间异步通信
- 编码规范
    - 减少渲染耗时
        - 渲染过程
            - vdom计算，复杂度高，js计算耗时长
            - 通信，js计算结果json通过bridge给native，复杂高，json大，通信慢
            - native渲染，递归解析render tree，布局复杂，耗时长
        - 如何做
            - 降低ui嵌套
            - 减少re-render，js截断重绘，减少bridge通信频率和数据量
            - 首屏native view
    - 其他细节
        - 代码抽象&复用
        - 删除无效逻辑/冗余样式

bug调试/分享弹窗


