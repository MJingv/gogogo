# webpack

热更新 hot replacement
https://juejin.cn/post/7021729340945596424
保持页面的状态下动态替换资源

简单原理

- webpack监听文件变化通过websocket发送change
- 浏览器通过module.hot.accept接口告诉webpack如何替换


详细