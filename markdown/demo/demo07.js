define([
    '../plugins/echarts/js/extension/dataTool.min',
    '../plugins/echarts/js/extension/ecStat.min',
    '../plugins/echarts/js/extension/statisticsTool.min',
    '../plugins/echarts/js/extension/echarts-wordcloud.min'
  ],
  function(dataTool, ecStat, statTool) {
    var getOption = function(objRequest, echarts) {
      var option = {};
      // foo();
      return option;
    }

    return {
      getOption: getOption
    };
  });
