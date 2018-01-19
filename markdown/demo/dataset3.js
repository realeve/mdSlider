  let originalData = {
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
  let getBarSettings = options => {
    const haveLegend = Reflect.has(options, 'legend');
    let option = Object.assign({
      x: haveLegend ? 1 : 0,
      y: haveLegend ? 2 : 1,
      type: 'bar'
    }, options);


    let data = option.data;
    let header = data.header.map(item => item.title);

    if (!haveLegend) {
      return {
        dataset: {
          source: data.data,
          dimensions: header
        },
        series: [{
          type: option.type,
          encode: {
            x: option.x,
            y: option.y
          },
        }]
      }
    }

    function uniq(arr) {
      return Array.from(new Set(arr))
    }

    let legend = data.data.map(item => item[option.legend]);
    legend = uniq(legend);
    let series = [];
    let dataset = legend.map((legendItem, i) => {
      let seriesItem = {
        name: legendItem,
        type: option.type,
        encode: {
          x: option.x,
          y: option.y
        },
        datasetIndex: i,
        stack: Reflect.get(option, 'stack')
      };
      series.push(seriesItem);
      return {
        source: data.data.filter(item => item[option.legend] == legendItem),
        dimensions: header
      }
    });
    return {
      dataset,
      series
    };
  }


  let options = {
    legend: 0,
    x: 1,
    y: 2,
    type: 'bar',
    data: originalData,
    stack: '合计',
    reverse: true
  }

  let settings = getBarSettings(options, originalData);
  var option = {
    dataset: settings.dataset,
    legend: {},
    tooltip: {},
    yAxis: {},
    xAxis: {
      type: 'category'
    },
    series: settings.series
  };
  if (options.reverse) {
    option.xAxis = {};
    option.yAxis = {
      type: 'category'
    };
  }
