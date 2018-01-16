# Web API接口设计

>成钞公司印钞管理部 李宾

- - - - -
# http 常见请求类型
**GET** / **POST** / **PUT** / **DELETE** / **OPTIONS**
> GET与POST的区别？

- - - - -
# RESTful API
> REST: URL定位资源，用HTTP动词（GET,POST,DELETE...）描述操作。

- api.cdyc.cbpm/v1/articles - GET - 获取文章列表
- api.cdyc.cbpm/v1/article/:id - GET - 获取文章详情
- api.cdyc.cbpm/v1/article/:id - POST - 添加文章
- api.cdyc.cbpm/v1/article/:id - PUT - 更新文章信息
- api.cdyc.cbpm/v1/article/:id - DELETE - 删除文章

推荐阅读:[RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- - - - -
# [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)
```json
{
    "list": [{
            "path": "bs架构开发的发展历程",
            "homepage": "https://github.com/realeve",
            "weibo": "http://weibo.com/realeve"
        },
        {
            "path": "JS的模块化发展",
            "homepage": "https://github.com/realeve",
            "weibo": "http://weibo.com/realeve"
        },
        {
            "path": "ES6 基础",
            "homepage": "https://github.com/realeve",
            "weibo": "http://weibo.com/realeve"
        },
        {
            "path": "如何不间断部署前端代码",
            "homepage": "https://github.com/realeve",
            "weibo": "http://weibo.com/realeve"
        },
        {
            "path": "Egg.js基础(上)",
            "homepage": "https://github.com/realeve",
            "weibo": "http://weibo.com/realeve"
        }
    ]
}
```
- - - - -
```json
{
    "status"":200,
    "data":[]
}
```
```json
{
    "rows":15,
    "data":[[1,2,3],[1,2,3],[1,33,3],[1,3,4],[11,22,43]]
    "header":["轴号","好品率","缺陷条数"],
    "source":"本数据来自XX系统"，
    "cache":6000
}
```
- - - - -
# 按API接口输出规则生成以上数据
```json
{
    "rows":15,
    "data":[{
        "reel_no":"2820011A",
        "good_rate":"85.3",
        "pic_count":300    
    }],
    "header":["轴号","好品率","缺陷条数"],
    "source":"本数据来自XX系统"，
    "cache":6000
}
```
- - - - -
# render a table
```js
let table = {
    "rows":15,
    "data":[[1,2,3],[1,2,3],[1,33,3],[1,3,4],[11,22,43]]
    "header":["轴号","好品率","缺陷条数"],
    "source":"本数据来自XX系统"，
    "cache":6000
};
$('table thead tr').html(table.header.map(item=>`<th>${item}<th>`).join(''));
$('table tbody').html(table.data.map(tr=>{
    return '<tr>' + tr.map(td=>`<td>${td}</td>`) +'</tr>';    
}));
```
```html
<table>
    <thead>
        <tr><tr>    
    </thead>
    <tbody></tbody>
</table>
```
- - - - -
# cross origin
```js
$.ajax('https://y.qq.com/download/download.js?jsonpCallback=MusicJsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0')
```
![](./_image/2018-01-13-22-20-39.jpg)
- - - - -
# jsonp 解决跨域
```js
let url = 'http://cbpc540.applinzi.com/index.php?s=/addon/Api/Api/countVoteInfo&sid=1';
$.ajax({
    url,
   dataType: "jsonp",
   callback: "JsonCallback"
}).done(res=>{
    console.log(res);
});
```
```php
public function outputJSON($data)
{
    $callback = I('callback');
    if (!empty($callback)) {
        echo $callback . "(" . json_encode($data) . ")";
    } else {
        echo json_encode($data);
    }
}
```
- - - - -
# JSONP的安全性问题
```html
<script src="http://www.example.com/api?param=1823&callback=JsonCallback" type="text/javascript">
</script>
// 返回：
<script>
    parseResponse({"Name": "Cheeso", "Id" : 1823, "Rank": 7});
</script>
``` 
jsonp的实质是在html中插入script，script对资源的引用不受跨域的限制，获取资源后执行回调函数并载入数据。
- - - - -
# jsonp劫持
> JSONP存在一定的安全问题，但在行业内部的使用足够。

jsonp请求可以用jQuery发起。

推荐阅读:[JSONP hijacking](https://haacked.com/archive/2009/06/25/json-hijacking.aspx/) 、[JSONP安全攻防](http://blog.knownsec.com/2015/03/jsonp_security_technic/)
- - - - -
# CORS
> Cross-Origin Resource Sharing 跨域资源共享


![](./_image/CORS_principle.png)

CORS是目前应用较为普遍的一种方式，同样也需要服务端和客户端同时支持。
推荐阅读 [MDN | CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- - - - -
# CORS中的GET请求

![](./_image/simple_req.png)
> CORS中的GET请求仅检查服务端Response的首部，Access-Control-Allow-Origin字段要与请求头的域名保持一致。由于GET仅表示取数据，不作写入或更新，相对安全，所以不会发起预检请求。 

- - - - -
# POST/DELETE/UPDATE
> 需要对数据操作时，会先发起Options 预检请求

![](./_image/prelight.png)

- - - - -
> header('Access-Control-Allow-Origin:*'); 

```php
protected function setCORS()
{
    $origin = $this->header['host'];
    $reqType = isset($_SERVER['HTTP_X_CLIENT_SCHEME']) ? $_SERVER['HTTP_X_CLIENT_SCHEME'] : 'http';
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : "$reqType://$origin";
    // 此处可加入域名白名单的判定逻辑
    // cors
    header('Access-Control-Allow-Origin:' . $origin);
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
}
```
- - - - -
# 总结
通过以下处理，满足了Web API接口开发中的基本功能。
> 统一数据规范
> cross-origin

目前还缺少以下必要的信息:
> Authorization
> Cache

- - - - -
# 安全校验/身份校验
最常见的方式:Session/Cookies
> session是存储于服务端的，每次请求都需要发送用户身份信息并在服务端查找和校验，[具体可以查看这篇文章](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)。

session身份认证流程:
![](./_image/2018-01-16-13-08-51.jpg)
- - - - -
# 弊端
> 1.占用服务器内存。当用户人数过多时服务端有存储压力。对于较大型应用而言可能还要保存许多状态，这时还需要借助一些KV数据库(Redis等)和一系列缓存机制来实现Session的存储。
> 2.单点登录。如果应用服务采用分布式服务器，各服务节点之间需要做session同步。

- - - - -
# JWT
> Json Web Token，[点击这里查看JWT规范](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html)。


![](./_image/2018-01-16-13-21-33.jpg)

推荐阅读: [JSON Web Token - 在Web应用间安全地传递信息](http://blog.leapoahead.com/2015/09/06/understanding-jwt/)、[使用JSON Web Token设计单点登录系统](http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/)
- - - - -
# JWT的结构
```js
// 客户端解析JWT;
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lcyIsImFkbWluIjp0cnVlfQ.dJzotVKpBL-lIMraDHzp7AX6i0vLmBFZcZ4mA9vbCq8';
var header,playload,signature;
[header,playload,signature] = token.split('.');
[header,playload] = [JSON.parse(atob(header)),JSON.parse(atob(playload))];
console.log(header,playload);
```
header
```JSON
{"alg":"HS256","typ":"JWT"}
```
playload
```JSON
{"sub":"1234567890","name":"John Does","admin":true}
```
**header**.**playload**.**signature**三部分组成

推荐阅读:[jwt.io认证示例](https://jwt.io/)
- - - - -
# playload的标准中注册的声明 
- iss: jwt签发者
- sub: jwt所面向的用户
- aud: 接收jwt的一方
- exp: jwt的过期时间，这个过期时间必须要大于签发时间
- nbf: 定义在什么时间之前，该jwt都是不可用的.
- iat: jwt的签发时间
- jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。

> 以上仅是标准中的建议，不强制使用

- - - - -
# playload中存储哪些内容？
在标准中注册的字段以外，jwt身份认证中还需要在playload中存放相关的用户身份信息。
```json
{
    "exp": 1516081558274,
    "iat": 1516081258274,
    "extra": {
        "ip": "10.8.18.66",
        "user": {
            "id": 23,
            "name": "libin",
            "fullname": "李宾",
            "type_id": 3
        }
    }
}
```
> 注意:由于playload传输至浏览器端后可以用base64解码，所以不要在playload中存储用户密码信息。

- - - - -
# 在服务器端生成JWT Token
```js
const jws = require('jws');
const header = {"alg":"HS256","typ":"JWT"};
const playload = {"sub":"1234567890","name":"John Does","admin":true};
const privateKey = 'IHsic3ViIjoiMTIzNDU2Nzg5MCIsIm';

jws.createSign({ header, privateKey, payload})
.on('done', function(signature) {
  const token = signature;
});
```
在jws中签名的具体算法[可以参考这里](https://github.com/brianloveswords/node-jws/blob/c2f94b0afad6a3150856f026d14cf838a1a99fc8/lib/sign-stream.js)。
```js
let crypto = require('crypto');
function createSign({header,privateKey,playload}){
    const encodedString = base64UrlEncode(header) + '.' + base64UrlEncode(payload);
    const hmac = crypto.createHmac('sha256' , privateKey);
    return hmac.update(encodedString).digest().toString('base64');
}
```
- - - - -
# JWT在前端的使用
```js
import axios from 'axios';

let token = axios({
url:'login.json',
params:{
    username,
    password    
}
}).then(res=>res.data.token);

let data = axios({
    url,
    params:{
      param1,
      param2
    },
    headers: {
        Authorization: token
      }
  }).then(res=>res.data);
```
推荐阅读:[AXIOS](https://www.kancloud.cn/yunye/axios/234845)
- - - - -
# 服务端增加对authorization的响应
```php
protected function setCORS()
{
    $origin = $this->header['host'];
    $reqType = isset($_SERVER['HTTP_X_CLIENT_SCHEME']) ? $_SERVER['HTTP_X_CLIENT_SCHEME'] : 'http';
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : "$reqType://$origin";
    // 此处可加入域名白名单的判定逻辑
    // cors
    header('Access-Control-Allow-Origin:' . $origin);
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    // jwt 支持
    header("Access-Control-Allow-Headers:Content-Type, authorization");
    header('Access-Control-Allow-Credentials:true');
}
```
> 除此之外，还需在服务端增加对JWT的有效性校验，防止内容被恶意篡改以及控制登录的有效期。

- - - - -
# axios+jwt 应用实例

![](./_image/2018-01-16-14-40-17.jpg)
- - - - -
# JWT实际应用过程中的问题
##1.token的存储
由于jwt是无状态的，当页面刷新的时候，上一次登录的token会丢失，此时可考虑将token存储在LocalStorage中。
> 关于session,cookies,LocalStorage,SessionStorage的区别
> session 存储在服务端，无法跨服务器
> cookies 有4kb大小的存储限制
> LocalStorage是html5中引入的存储机制，最大存储5M的内容；
> SessionStorage与LocalStorage相似，区别是本次会话结束后内容消失。

```js
    let store = window.localStorage;
    store.getItem('yourKey');
    store.setItem('yourKey',newData);
    store.removeItem('yourKey');
```
推荐阅读:[LocalStorage介绍及用法](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
- - - - -
```js
function getToken({user,psw}){
    let token = Reflect.get(window.localStorage,'token');
    if(token == undefined){
        token = login(user,psw);        
        window.localStorage.setItem('token',token);
    }
    return token;
}
```
- - - - -
## 2.token的续期
实际应用中token有过期时间，例如在用户提交表单时如果token过期并拒绝数据请求，此时将带来不友好的用户体验。

此时服务端可考虑 为该token续期并接受用户请求，返回的字段中带上token字段，然后在前端刷新LocalStorage数据，下次请求时将自动采用续期后新的token。
- - - - -
# 反爬虫
```
http://localhost:90/api.json?id=3&data_start=20180101&date_end=20180121
```
```json
{
    "status":200,
    "data":["your data"]
}
```
- - - - -
所有的请求必须携带Authorization信息
![](./_image/2018-01-16-16-05-17.jpg)
- - - - -
# 防止分布式爬虫
1. 如果用户发起带auth请求的数据请求，同样可以抓取相关信息，通过设置http代理则可实现多线程数据抓取。
2. 如果用户的http请求被劫持或token内容丢失，第三方同样可以发起请求。

> 可考虑在playload中加入认证时的ip信息，每次请求数据前验证ip地址是否相同从而决定是否返回信息。

- - - - -
# 其它API授权的方式
1. OAuth2.0([可以查看这篇文章](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html))
2. [微信公众号用户身份鉴权](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183)以及[微信JS-SDK权限签名](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)

<br>
以微信开发授权为例:
1. 根据用户名/密码(APPID/secrect)获取access_token,开发者自行缓存，时长2小时；
2. 用access_token换jsapi_ticket(get 请求)
3. 签名,对以下字段按ascii码排序生成签名字符串string1
 ```
noncestr=Wm3WZYTPz0wzccnW
jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg
timestamp=1414587457
url=http://mp.weixin.qq.com?params=value
string1 = jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW×tamp=1414587457&url=http://mp.weixin.qq.com?params=value
```
4. 服务端验证 signature==sha1(string1)

- - - - -
# 防止回放攻击
在微信js-sdk权限签名认证中的nonce是Number Once的缩写，表示该参数在通信中仅被使用一次，防止被重放攻击。关于nonce更详细的说明可以查看[nonce 避免重放攻击](https://www.jianshu.com/p/dda78b530cca)以及[Cryptographic nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)这两篇文章。


在微信签名认证中的nonce的作用相当于JWT中playload的jti字段，而其中的服务端验证 sha1(string1)相当于JWT中header所指定的加密算法。
- - - - -
# 缓存
- - - - -
关于缓存部分在各后端框架中都有成熟的方案，此处有以下几点需要注意
> 1.目前常见的缓存策略有文件缓存、KV存储的缓存(内存缓存、数据库缓存)
> 2.内存缓存以memcache为代表，value的大小受限，同时服务器重启后缓存内容将消失。
> 3.数据库缓存以Redis为代表，其用法同memcache相似，但Redis数据库建议安装在固态硬盘中。
> 4.文件缓存速度在三者中最慢，但**在行业内的实际应用测试中，Apache 的文件缓存效率与memcache相比相差只在3ms以内**，但对缓存的管理要方便许多。

- - - - -
# 缓存的标识
一般由框架提供的页面缓存常针对页面做缓存，对API接口来讲需要手工控制缓存的增、删、改、查的操作，**建议将接口的参数做为标识，同时提供缓存时长的参数**。
- - - - -
# Q&A