var db = require('../db');
//db.connection.connect();
module.exports = {
  messages: {
    get: function() {
      console.log('hello ----------------------------');
      db.connection.query('select * from messages', function(error, results) {
        if (error) {
          //response.status(400).send('Error in database operation');
          console.log(error);
        } else {
          console.log('get results: ', results)
          return results;
        }
      });
    },
    // a function which produces all the messages
    post: function(text) {
      console.log('TEXT HERE -----------------', text);
      db.connection.query("insert into messages MessageText VALUES "+text, function(error, results) {
        if (error) {
          //response.status(400).send('Error in database operation');
          console.log(error);
        } else {
          console.log('post results: =============================', results)
          return results;
        }
      });

    //   app.post('/data', function(req, res){
    //     var username=req.body.name;
    //     connection.query("INSERT INTO `names` (name) VALUES (?)", username.toString(), function(err, result){
    //         if(err) throw err;
    //             console.log("1 record inserted");
    //         });
    //     res.send(username);
    // });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function() {},
    post: function() {}
  }
};