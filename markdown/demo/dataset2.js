  let data = {
    "timing": "95.432ms",
    "rows": 7,
    "cols": 3,
    "header": [{
      "title": "产品名称"
    }, {
      "title": "完成日期"
    }, {
      "title": "平均好品率"
    }],
    "data": [
      ["G-3A", "20170110", "63.32"],
      ["G-3A", "20170111", "95.14"],
      ["G-3A", "20170112", "90.25"],
      ["G-3A", "20170113", "93.66"],
      ["G-4A", "20170110", "83.32"],
      ["G-4A", "20170111", "92.14"],
      ["G-4A", "20170112", "96.25"],
      ["G-4A", "20170113", "91.66"],
      ["G-4A", "20170114", "90.45"],
      ["G-4A", "20170115", "93.16"],
      ["G-4A", "20170116", "93.39"]
    ],
    "title": "各品种每天平均好品率变化图",
    "source": "数据来源:质量综合管理系统"
  };
  let header = data.header.map(item => item.title);
  let xAxis = '完成日期',
    yAxis = '平均好品率';
  var option = {
    dataset: {
      source: data.data,
      dimensions: header
    },
    tooltip: {},
    yAxis: {},
    xAxis: { type: 'category' },
    series: [{
      type: 'bar',
      encode: {
        x: 1,
        y: 2
      }
    }]
  };
