# webpack

- 热更新
- 原理

# http

https://juejin.cn/post/6844904100035821575

- 状态码
- get/post区别，参数/幂等/编码/安全/请求次数
- 请求头：accept
- 定长content-length定值 ，不定长chunk，大文件range+boundary
- 表单form-data（常用）、form-urlencode
- 队头阻塞，单域名有并发限制（Chrome最多6个并发接口）-> 增加二级域名
- cookie
    - 服务端setcookie
    - 有效期：max-age/expire
    - secure只能https
    - httponly只能接口访问，js不行。预防xss
    - samesite跨站设置strict/lax/none。预防csrf
    - 缺点：容量4kb，设置domain+path，不让所有domain都带cookie
    - 安全，要用httponly才能改
- http代理，缓存、安全限流、负载均衡（LRU）

http缓存：强缓存、协商缓存

- cache-control验证强缓存能不能用
- 协商缓存，if-modified-since，
- 协商缓存，if-none-match，etag来协商缓存

缓存代理

- private/public
- 客户端max-stale、min-fresh

跨域

- schema、host、port3同则同域
- 不同domain：不能读改对方dom、不对对方cookie/indexdb/localstorage、限制xhr请求
- 浏览器拦截

安全
xss(cross site scripting) 跨站脚本攻击

- ```<script >document.cookie='我是攻击者'</script>```
- 注入恶意脚本，eg：可在评论中使用html

csrf（cross site request forgery） 跨站请求伪造

- 钓鱼网站，点击它的链接就可以获取个人信息
- ```<a href="http://...../delete"></a>``` 删除
