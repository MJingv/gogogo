# css的100%相对谁

- 相对于其父元素
- 父元素尺寸相对于其*包含块* containing block
- 普通流，包含块是最近块级祖先元素
- 绝对定位，最近具有定位属性的祖先
- 固定定位，包含块是视口

css 100%相对自己的

- translate

# canvas优化

- 减少绘制操作
- 使用图像缓存
- 避免频繁属性设置
- 合适的图像算法，裁剪算法、凸包算法
- 硬件加速，trasform/opacity
- requestanimationframe 保持绘制帧率稳定

# css动画为什么比js高效？分层与合成

如何渲染一帧：合成、重排、重绘

浏览器如何展示图像：

- 显示器1s读60次前缓冲区的图像展示到显示器上
- 显卡合成新图像放在后缓存区
- 前缓存区与后缓冲区交换展示图像

浏览器如何实现合成：
分层：将素材分成多个图层
合成：以上图层合并。合成操作在合成线程完成，不会影响主线程。
分块：在首次合成图块时使用分辨率较低的图片，之后替换。

css比js动画块

- 渲染引擎将willchange/transform/opacity属性的图层单独图层，不会涉及到主线程
- 单独图层占内存，合理使用

# css水平垂直居中

- flex，align-item/justify-content：center
- absolute+left/right50%+translate（-50%，-50%）
- absolute+left/right50%+margin top/left(-50%)

# 响应式

- 媒体查询
- 百分比
- vw/vh
- rem







