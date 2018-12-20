var Parse = {
  //URL of API
  server: 'http://127.0.0.1:3000/classes',

  create: function(message, successCB, errorCB = null) {
    $.ajax({
      url: Parse.server + '/messages',
      type: 'POST',
      data: JSON.stringify(message), // take into account cross attacks (XSS)
      contentType: 'application/json', //text
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server + '/messages',
      type: 'GET',
      data: {},
      // data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};
