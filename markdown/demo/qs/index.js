let qs = require('qs');
// window.location.search.slice(1)
const url = 'www.yourdomain.com/chart/23/?type=bar&legend=2&x=0&y=3&reverse=1';
const search = url.includes('?') ? url.split('?')[1] : 'type=bar';
let option = qs.parse(search);
console.log(option)
