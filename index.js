var ajax = function(path, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", path, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        callback(xhr.responseText);
      }
    }
  };
};

var init = function(menu) {
  var result = "";
  var data = JSON.parse(menu);
  data.list.forEach(function(value, i) {
    var html =
      "<li>" +
      '<a class="author" title="' +
      value.path +
      '" href="' +
      value.homepage +
      '"><span>' +
      (i + 1) +
      "</span></a>" +
      '<a class="content" href="./detail.html?file=' +
      value.path +
      '"><div class="arrow"></div>' +
      value.path + '</a> <div class="info-wrapper">' +
      '<a class="icon icon-github" href="' +
      value.homepage +
      '" target="_blank"></a>' +
      '<a class = "icon icon-weibo" href = "' +
      value.weibo +
      '" target="_blank"> </a>' +
      "</div>" +
      "</li>";
    result += html;
  });
  document.getElementById("list").innerHTML = result;
};

document.addEventListener(
  "DOMContentLoaded",
  function() {
    ajax("./menu.json", init);
  },
  false
);
