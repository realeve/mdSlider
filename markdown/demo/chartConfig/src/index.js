import echarts from "echarts";
import util from "./lib/util";
import chartConfig from "./lib/chart";
import axios from "axios";

let initChart = option => {
    const chart = echarts.init(document.querySelector("#chart"), chartConfig.theme, {
        renderer: "svg"
    });
    chart.setOption(option);
    return chart;
};

let initEvent = chart => {
    window.onresize = () => { chart.resize() }
    window.onhashchange = () => {
        init();
    }
};

let init = async() => {
    let config = util.getChartConfig();
    let url = "http://localhost/DataInterface/Api?ID=144&tstart=20170301&tend=20170331&cache=10";
    config.data = await axios
        .get(url)
        .then(res => res.data);

    let option = util.handleDefaultOption(chartConfig.bar(config));
    let chart = initChart(option);
    initEvent(chart);

    console.log("option = ", JSON.stringify(option));
};

init();