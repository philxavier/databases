var db = require("../db");
//db.connection.connect();
module.exports = {
  messages: {
    get: function(callback) {
      db.connection.query("SELECT * FROM messages", function(
        err,
        rows,
        fields
      ) {
        if (err) {
          console.log(err);
        }
        callback(fields);
      });

      app.get("/test", function(request, response) {
        conn.query("select * from persons", function(error, results) {
          if (error) {
            response.status(400).send("Error in database operation");
          } else {
            response.send(results);
          }
        });
      });
    }, // a function which produces all the messages
    post: function() {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function() {},
    post: function() {}
  }
};
