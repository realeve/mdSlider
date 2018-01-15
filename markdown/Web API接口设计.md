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

推荐阅读:[JSONP安全攻防](http://blog.knownsec.com/2015/03/jsonp_security_technic/)
- - - - -
```php
protected function setCORS()
{
    $origin = $this->header['host'];
    $reqType = isset($_SERVER['HTTP_X_CLIENT_SCHEME']) ? $_SERVER['HTTP_X_CLIENT_SCHEME'] : 'http';
    $origin = "$reqType://$origin";
    $allow_origin = Config::get('allow_origin');

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : $origin;

    if (in_array($origin, $allow_origin)) {
        header('Access-Control-Allow-Origin:' . $origin);
        header("Access-Control-Allow-Headers:Content-Type, authorization");
        header('Access-Control-Allow-Credentials:true');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
        $this->allow_origin = true;
    }
    // debug_mode
    if ($this->request->header('host') == 'localhost:90') {
        $this->allow_origin = true;
    }
}
```
- - - - -
# Q&A