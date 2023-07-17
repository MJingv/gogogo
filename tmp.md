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

- 宏任务&微任务（microtask&macrotask）
    - 宏任务：main script、setTimeout、setInterval、setImmediate(nodejs)、i/o(mouse/keyboard/netwrok event)、ui rendering(html
      parse)、message channel
    - 微任务：promise.then(new promise是同步)、process.nextTicket(nodejs)、MutationObserver
    - 优先级
        - 宏任务>微任务
        - <script/>是第一个宏任务
        - process.nextTicket>promise.then

- Node环境
    - Node事件循环实现是依靠*libuv*引擎，Node选择ChromeV8引擎作为javascript的解释器
    - 流程
        - incoming(外部输入):data,etc
        - poll(轮训)：
        - check
        - timer(定时器检测阶段)
        - I/O Callbacks,几乎所有回调
        - Idle Prepare(闲置阶段)

- JavaScript is a single-threaded asynchronous programming language. 