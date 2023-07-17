事件循环
---

- https://tsejx.github.io/javascript-guidebook/core-modules/executable-code-and-execution-contexts/concurrency-model/event-loop/
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Event_loop

## event loop

- 场景：ui渲染、网络请求、用户交互、脚本、协调事件、用户代理
- 宿主环境决定循环机制
    - 浏览器：浏览器内核引擎决定
    - node：libuv引擎决定
- 运行机制
    - 栈、堆、队列
    - 所有同步任务(sync task)都在主线程完成，形成一个执行栈（execution context stack）
    - 主线程外，存在任务队列（task queue）异步任务放入,异步任务有了结果，就在任务队列里放个事件
    - 执行栈里任务全部完成，系统读取任务队列。异步任务结束等待，进去执行栈，开始执行
    - 主线程重复以上三步