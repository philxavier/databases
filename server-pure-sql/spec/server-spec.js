/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */
var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: 'student',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = "messages"; // TODO: fill this out


    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { UserName: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          UserName: 'Valjean',
          MessageText: 'In mercys name, three days is all I need.',
          RoomName: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].MessageText).to.equal('In mercys name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = `insert into messages (MessageText, UserName, RoomName)
    VALUES ('Men like you can never change!', (SELECT UserNames FROM usernames WHERE UserNames = 'some_user'), (SELECT RoomNames FROM roomnames WHERE RoomNames = 'main'))`;
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    dbConnection.query(`insert into usernames (UserNames) VALUES ('some_user')`, function(error, results) {
      if (error) {
        console.log('error username');
      } 
    });
    dbConnection.query(`insert into roomnames (RoomNames) VALUES ('main')`, function(error, results) {
      if (error) {
        console.log('error roomname');
      } 
    });

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].MessageText).to.equal('Men like you can never change!');
        expect(messageLog[0].RoomName).to.equal('main');
        done();
      });
    });
  });
  
  //new tests
  it('Should keep track of how many messages there are on the DB', function(done) {

    dbConnection.query(`insert into usernames (UserNames) VALUES ('some_user')`, function(error, results) {
      if (error) {
        console.log('error username');
      } 
    });
    
    dbConnection.query(`insert into roomnames (RoomNames) VALUES ('main')`, function(error, results) {
      if (error) {
        console.log('error roomname');
      } 
    });

    var queryString = `insert into messages (MessageText, UserName, RoomName)
    VALUES ('Men like you can never change!', (SELECT UserNames FROM usernames WHERE UserNames = 'some_user'), (SELECT RoomNames FROM roomnames WHERE RoomNames = 'main'))`;

    dbConnection.query(queryString, function(error, results) {
      if (error) {
        console.log(error);
      }

      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        console.log('logging messagelog -----------------------------', messageLog);
        expect(messageLog.length).to.not.equal(0);
        done();
      });
    });

   
  });

});