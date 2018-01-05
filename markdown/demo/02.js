$.ajax({
    url: './yourAPI',
    type: 'GET',
    dataType: 'json',
    data: {
      param1: 'value1'
    },
  })
  .done(function(data) {
    var tbodyStr = data.map(tdData => {
      var tdStr = tdData.map(item => `<td>${item}</td>`).join('');
      return `<tr>${tdStr}</tr>`;
    }).join('');
    $('#yourTable tbody').html(tbodyStr);
  });
