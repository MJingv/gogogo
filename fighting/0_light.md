
营销4ps：product、price、place、promotion、strategy
用户分类：新客、老客、潜客
老客：流失、沉默、（成熟、过渡、尝鲜）
用户生命周期：低潜、高潜、引入、成长、成熟、衰退、流失


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

- crash，iOS 13内存写泄漏（jscore的gc比v8差）
    - 上报问题，wx官方处理较慢
    - 画布尺寸调整，缩放比例尺寸
        - 排查发现官方demo没问题，对比其他团队代码，发现画布尺寸不同
        - canvas画布大小决定了可绘制的像素数量，渲染像素和画布大小成正比
        - 选择缩小画布，场景背景等比例放大。dpr对图片/文字进行缩放，对画布像素进行缩放，没有增加像素
- 白屏，iOS 14 引入自定义字体，二分排查
- 过热：帧率、节流，压缩文件

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

技术项目主r

- 前期完成文档与流程：立项、分析调研、项目规划
- 项目管理
    - 节奏管理：明确目标、里程碑拆解、分工排期、阶段性收益
    - 日常管理：周会进度管理和风险把控
- 项目结项&外部对接&技术手册

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
  
