(function() {
  var saveColors = function() {
    var colorDoms = $('.collection-assets-item');
    var datas = [];
    colorDoms.each(function(idx, item) {
      var colors = $(this).find('.frame div');
      var color = [];
      colors.each(function(idx, item) {
        color.push($(this).attr('style').replace('background: ', ''))
      });
      var userDom = $(this).find('.name a');
      var user = userDom.text().replace(/\n/g, '').trim();
      var href = userDom.attr('href');
      var views = $(this).find('.views-count').text().replace(/\n/g, '').trim();
      var likes = $(this).find('.likes-count').text().replace(/\n/g, '').trim();
      var comments = $(this).find('.comments-count').text().replace(/\n/g, '').trim();
      datas.push({
        color: color,
        user: user,
        href: href,
        views: views,
        likes: likes,
        comments: comments
      })
    })
    return datas;
  }

  var getColorItem = function(color) {
    return '<div class="collection-assets-item">\
        <div class="content" aria-haspopup="true">\
            <div class="frame ctooltip">\
                <div style="background: ' + color.color[0] + '"></div>\
                <div style="background: ' + color.color[1] + '"></div>\
                <div style="background: ' + color.color[2] + '"></div>\
                <div style="background: ' + color.color[3] + '"></div>\
                <div style="background: ' + color.color[4] + '"></div>\
            </div>\
            <p>' + JSON.stringify(color.color).replace(/,/g, ' , ') + '</p>\
            <ul class="assets-item-meta">\
                <li class="name">\
                    <a class="ctooltip" target="_blank" href="https://color.adobe.com/zh' + color.href + '">' + color.user + '</a>\
                </li>\
                <li class="info">\
                    <ul>\
                        <li class="views"></li>\
                        <li class="views-count">' + color.views + '</li>\
                        <li class="likes"></li>\
                        <li class="likes-count">' + color.likes + '</li>\
                        <li class="comments"></li>\
                        <li class="comments-count">' + color.comments + '</li>\
                    </ul>\
                </li>\
            </ul>\
        </div>\
    </div>'
  }

  var render = function() {
    var colorHTML = colors.map(function(color) {
      return getColorItem(color);
    });
    $('.collection-assets').html(colorHTML.join(''))
  };
  render()
})()
