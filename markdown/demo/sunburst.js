var data = [{
  name: '工艺1',
  children: [{
    name: '品种1',
    value: 15,
    children: [{
      name: '设备1',
      value: 2
    }, {
      name: '设备2',
      value: 5,
      children: [{
        name: '机长1',
        value: 2
      }, {
        name: '机长2',
        value: 3
      }]
    }, {
      name: '设备3',
      value: 4
    }]
  }, {
    name: '品种2',
    children: [{
      name: '设备X',
      value: 4
    }]
  }, {
    name: '品种3',
    value: 10,
    children: [{
      name: '设备N',
      value: 5,
      itemStyle: {
        color: 'red'
      }
    }, {
      name: '设备1',
      value: 1
    }]
  }]
}, {
  name: '工艺2',
  children: [{
    name: '品种3',
    children: [{
      name: '设备A',
      value: 3
    }, {
      name: '设备B',
      value: 4,
      children: [{
        name: '机长a',
        value: 2
      }]
    }]
  }]
}, {
  name: '工艺3',
  children: [{
    name: '品种4',
    children: [{
      name: '设备C',
      value: 1
    }, {
      name: '设备D',
      value: 2
    }]
  }]
}];

option = {
  visualMap: {
    type: 'continuous',
    min: 0,
    max: 10,
    inRange: {
      color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C']
    }
  },
  series: {
    type: 'sunburst',
    data: data,
    radius: [0, '90%'],
    label: {
      rotate: 'radial'
    }
  }
};
