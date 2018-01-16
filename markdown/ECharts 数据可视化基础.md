# ECharts 数据可视化基础
![chart-intro.svg](./_image/chart-intro.svg)
- - - - -
<!-- .slide: style="background-image:url('./img/echarts4.png');" -->
2018年1月16日，百度发布了旗下知名开源产品 ECharts 的最新大版本 4.0，新版本在产品的性能、功能、易用性等各个方面进行了全面提升。

上一次版本更新可追溯到2016年1月12日，当时发布了3.0，带来了箱形图等数据类型。

附:[开源地址](https://github.com/ecomfe/echarts) 以及 [官方文档](http://echarts.baidu.com/)
- - - - -
开源的数据可视化产品主要有D3.js,百度ECharts，阿里G2等。从方便程度来讲，个人建议使用ECharts。

本章主要是基于[官方教程](http://echarts.baidu.com/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)针对可视化技术做讲解，对于各类型图表的应用场景不做探讨。
- - - - -
# 第一个图表
```html
<div id="chart" style="width:100%;height:500px;"></div>
<script src="https://cdn.bootcss.com/echarts/4.0.0/echarts.min.js"></script>
<script src="https://cdn.bootcss.com/echarts/4.0.0/extension/dataTool.min.js"></script>
<script>
    const chart = echarts.init(document.querySelector('#chart'));
    chart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    })
</script>
```
[点击这里查看示例](./markdown/demo/chart01.html)
- - - - -
# canvas 与 svg
> 从ECharts4.0以后开始正式支持svg绘图，导出的图片可以以矢量格式存在，清晰度高许多，同时在对特效要求不高的场景，svg占用较少内存。

```js
const chart = echarts.init(document.querySelector('#chart'),null , {
        renderer: 'svg'
    });
```
[点击这里查看示例](./markdown/demo/chart02.html)
- - - - -
# 曲线图
```js
series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
}]

series: [{
    name: '销量',
    type: 'line',
    data: [5, 20, 36, 10, 10, 20]
}]
```
平滑曲线
> smooth:true

[点击这里查看示例](./markdown/demo/chart03.html)并试着调整更多的功能。
- - - - -
# 数据异步加载
- - - - -
# 图表缩放
- - - - -
# 鼠标点击事件
- - - - -
# dataset
> ECharts 4.0新增功能

- - - - -
# 关于formatter
- - - - -
# toolbar
- - - - -
# 各类常见可视化图形
## 堆叠图
- - - - -
# 条形图
- - - - -
# 饼图
- - - - -
# 环形图
- - - - -
# 玫瑰图
- - - - -
# 散点图
- - - - -
# 主题河流图
- - - - -
# 箱线图
- - - - -
# 旭日图
- - - - -
# Q&A