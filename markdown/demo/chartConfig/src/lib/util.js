import qs from "qs";
import _ from "lodash";

let getChartConfig = () => {
    let search = window.location.search.slice(1);
    search = search.length ? search : "type=bar";
    return qs.parse(search);
};

// let uniq = arr => Array.from(new Set(arr));

let uniq = arr => _.uniq(arr);

let getCopyRight = () => {
    return {
        text: "©成都印钞有限公司 印钞管理部",
        borderColor: "#999",
        borderWidth: 0,
        textStyle: {
            fontSize: 10,
            fontWeight: "normal"
        },
        x: "right",
        y2: 3
    };
};

let handleDefaultOption = option => {
    option = Object.assign({
            toolbox: {
                feature: {
                    dataZoom: {},
                    dataView: { readOnly: false },
                    magicType: { type: ["line", "bar", "stack", "tiled"] },
                    restore: {},
                    saveAsImage: {}
                },
                left: 'left'
            },
            legend: {
                top: 10,
                left: 'right'
            },
            tooltip: {
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            grid: {
                left: 30,
                right: 20,
                top: 50,
                bottom: 60
            }
        },
        option
    );
    option.title.push(getCopyRight());
    return option;
};

// 字符串转日期
let str2Date = str => {
    let needConvert = /^[1-9]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
        str
    );
    if (!needConvert) {
        return str;
    }
    let dates = [str.substr(0, 4), str.substr(4, 2), str.substr(6, 2)];
    return dates.join("-");
};

export default {
    getChartConfig,
    uniq,
    getCopyRight,
    handleDefaultOption,
    str2Date
};