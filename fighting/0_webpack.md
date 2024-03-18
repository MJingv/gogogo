# webpack

Vite 适用于快速的开发体验，Rollup 适用于构建库或按需加载的应用，Webpack 适用于构建复杂的应用，esbuild 适用于追求极致性能的项目

热更新 hot replacement
https://juejin.cn/post/7021729340945596424
保持页面的状态下动态替换资源

简单原理

- webpack监听文件变化通过websocket发送change
- 浏览器通过module.hot.accept接口告诉webpack如何替换

webpack4和5区别
- 5引入持久化缓存，提高增量构建速度。引入federation特性，实现跨项目共享模块，减少重复打包
- tree shaking优化，引入sideeffects，更精准的判断哪些模块有副作用
- 支持es模块






