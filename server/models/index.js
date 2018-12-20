var Promise = require('bluebird');
var db = require('../db');

module.exports = {
  messages: {
    get: function(callback) {
      db.connection.query('select * from messages', function(error, results) {
        if (error) {
          console.log(error);
        } else {
          callback(results);
        }
      });
    },
    // a function which produces all the messages
    post: function(body) {
      var sqlRN = `INSERT INTO roomnames (RoomNames)
          SELECT '${body.RoomName}'
          WHERE NOT EXISTS (SELECT RoomNames FROM roomnames WHERE RoomNames = '${body.RoomName}')`;

      db.connection.query(sqlRN, function(error, results) {
        if (error) {
          console.log('error roomname');
        } 
      });

      var sqlM = `insert into messages (MessageText, UserName, RoomName)
       VALUES ('${body.MessageText}', (SELECT UserNames FROM usernames WHERE UserNames = '${body.UserName}'), (SELECT RoomNames FROM roomnames WHERE RoomNames = '${body.RoomName}'))`;
      db.connection.query(sqlM, function(error, results) {
        if (error) {
          console.log('error messages', error);
        } 
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function(callback) {
      db.connection.query('select * from users', function(error, results) {
        if (error) {
          console.log(error);
        } else {
          //console.log(results)
          callback(results);
        }
      });
    },
    post: function(username) {
      var sqlUN = `INSERT INTO usernames (UserNames)
      SELECT '${username}'
      WHERE NOT EXISTS (SELECT UserNames FROM usernames WHERE UserNames = '${username}')`;

      db.connection.query(sqlUN, function(error, results) {
        if (error) {
          console.log('error');
        }
      });
    }
  }
};