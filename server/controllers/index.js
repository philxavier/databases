var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
      res.send('message')
      //console.log('parameters ========== ', req);
    }, // a function which handles a get request for all messages
    post: function () {
      //console.log('request body =================', req.body);
      var test = 'string'
      models.messages.post(test);
      //res.send('posted');
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

 