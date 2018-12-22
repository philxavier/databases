var models = require("../models");

module.exports = {
  messages: {
    get: function(req, res) {
      models.messages.get((data) => {
        res.json(data);
      });
    }, // a function which handles a get request for all messages
    post: function(req, res) {
      models.users.post(req.body.username);
      
      models.messages.post(req.body);
      
      models.messages.get((data) => {
        res.send(data);
      });
      
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function(req, res) {
      models.user.get((data) => {
        res.json(data);
      });
    },
    post: function(req, res) {
      console.log('username-----------------------', req.body);
      models.users.post(req.body.username);
    }
  }
};
