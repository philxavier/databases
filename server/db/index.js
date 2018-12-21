var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'student');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('User', {
  username: Sequelize.STRING
});

var Message = db.define('MessageObject', {
  //userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

Message.belongsTo(User);
db.sync();

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: 'student',
//   database: 'chat'
// });

// connection.connect();

// connection.query('SELECT * FROM messages', function (err, rows, fields) {

//   if (err) { console.log(err) }

//   console.log('fields here ', fields);
// });

// connection.end();

exports.connection = db;
exports.Message = Message;
exports.User = User



