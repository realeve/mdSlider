let getData = (url, data = {}) => {
  let response = '';
  $.ajax({
    url,
    data,
    async: false,
    success: function(res) {
      response = res;
    }
  });
  return response;
};

getData('./menu.json');
