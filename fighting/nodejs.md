# eggjs初始化

eggjs是一个基于nodejs企业级应用开发，提供了一套最佳实践，快速开发可拓展、可维护的应用程序
初始化步骤如下：

- 创建项目：命令行生成项目基本目录结构和配置文件
- 配置文件：config配置端口号、数据库连接等
- 插件，开关插件，数据库、日志、身份校验等
- 路由，app/router.js里将url映射到controller和aciton里
- controller和action：处理并响应请求。动作是某个方法。
- service封装业务逻辑，model数据库交互
- 中间件：到controller之前做什么
- 启动：加载配置文件、插件、路由、监听端口

