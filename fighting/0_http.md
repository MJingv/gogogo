http1:mac+ip+tcp+http
https:mac+ip+tcp+ssl/tls+http
http2:mac+ip+tcp+tls1.2+(hpack/stream)+http
http3:mac+ip+udp+quic+http

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

请求方法

- xhr:xmlhttprequest，只是页面不刷新的异步*http请求能力*
- ajax:async js and xml，更新部分网页的技术，包含html、css、xml、xhr等
- fetch用promise，替代xhr，兼容性差。
- axios用promise，兼容性好，请求代理，自动json，有设置超时
- 请求中止：客户端/浏览器去中止or不处理。

xhr请求demo

```js

const xhr = new XMLHttpRequest()
xhr.open('post', 'url', true)//异步请求
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.onreadystatechange(() => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = xhr.responseText
        console.log(data)
    }
})
xhr.onerror = (e) => {

}
xhr.send(data)

xhr.abort() //中止
const data = {a: 1, b: 2}



```

fetch请求demo

```js
const controller = new AbortController()
const signal = controller.signal

fetch('url', {
    signal,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        a: 1, b: 2
    })
}).then(res => {
    // 第一个then没有body，有响应头、状态码等
    res.json()
}).then(data => {
    // 第二个then有body，body是个stream，需要第一步json☺然后异步读取
    console.log(data)
}).catch(e => {

})
controller.abort() //中止

```

axios请求demo

```js
import axios from 'axios'

res = axios('url', {key: 1}, {
    cancelToken: source,
    timeout: 5000,
    proxy: {
        host: 'xxx', prot: 9000
    }

}).then(res => {
}).catch(e => {

})

```

简单请求vs非简单请求

- 简单请求：
    - get、post、head
    - accept：text/plain、multiple/form-data、application/x-www-form-urlencoded
    - 浏览器自动+origin，服务器+access-control-allow-origin，浏览器check是否拦截
- 非简单请求：
    - 需预请求options，不成功触发error方法

浏览器多进程

- 浏览器主进程：界面展示、交互等
- 渲染进程：1个tab1个渲染进程
- 插件进程
- gpu进程
- 网络进程

跨域

- schema+host+port,3同则同域
- 不同domain：不能读改对方dom、不对对方cookie/indexdb/localstorage、*限制xhr请求*
- 浏览器拦截，和前端代码没关系

解决跨域方法：cors、jsonp、nginx

cors：cross origin resource sharing

- w3c标准，需要浏览器+服务器共同支持,低版本不支持
- access-control-allow-orgin：*

jsonp

- *get*请求利用script的scr无限制，兼容性好

```js
const jsonp = ({url, params, callbackName}) => {
    let path = url + '?'
    for (let key in params) {
        path += `${key}=${params[key]}&`
    }
    path += `callback=${callbackName}`
    return new Promise((res) => {
        const ele = document.createElement('script')
        ele.src = path
        document.body.appendChild(ele)
        window[callbackName] = (data) => {
            res(data)
            document.body.removeChild(ele)
        }
    })
}
jsonp({url: 'xxx', params: {a: 1}}).then(res => {
    console.log(res)
})
```

```js
// 后端

app.get('/', (req, res) => {
    const {callback} = req.query
    res(`${callback}(data)`)
})
app.listen(3000)
```

nginx

- 反向代理，跳板机

安全
xss(cross site scripting) 跨站脚本攻击

- ```<script >document.cookie='我是攻击者'</script>```
- 注入恶意脚本，eg：可在评论中使用html

csrf（cross site request forgery） 跨站请求伪造

- 钓鱼网站，点击它的链接就可以获取个人信息
- ```<a href="http://...../delete"></a>``` 删除

# https

mac+ip+tcp+ssl/tls+http

rsa，

- 传统rsa，建议长度加大，非对称加密

tls1.2

- 精简加密算法
- 使用*ecdhe*，椭圆取一点做私钥，算公钥，交换公钥，点乘计算秘密值，用秘密值加密

tls1.3+

- *前向*保密
- 废除rsa，rsa可能会之前都被破解

# http2

- 提升点：头部压缩（用hash+哈夫曼编码压缩）、多路复用（二进制）
- 新功能：设置请求优先级、服务器push
