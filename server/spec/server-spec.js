/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */
var mysql = require("mysql");
var request = require("request"); // You might need to npm install the request module!
var expect = require("chai").expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "student",
      database: "chat"
    });
    dbConnection.connect();

    var tablename = "messageobjects"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("truncate " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request(
      {
        method: "POST",
        uri: "http://127.0.0.1:3000/classes/users",
        json: { username: "Valjean" }
      },
      function() {
        // Post a message to the node chat server:
        request(
          {
            method: "POST",
            uri: "http://127.0.0.1:3000/classes/messages",
            json: {
              username: "Valjean",
              text: "In mercys name, three days is all I need.",
              roomname: "Hello"
            }
          },
          function() {
            // Now if we look in the database, we should find the
            // posted message there.

            // TODO: You might have to change this test to get all the data from
            // your message table, since this is schema-dependent.
            var queryString = "SELECT * FROM messageobjects";
            var queryArgs = [];

            dbConnection.query(queryString, queryArgs, function(err, results) {
              // Should have one result:
              expect(results.length).to.equal(1);

              // TODO: If you don't have a column named text, change this test.
              expect(results[0].text).to.equal(
                "In mercys name, three days is all I need."
              );

              done();
            });
          }
        );
      }
    );
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var queryString = `insert into messageobjects (text, roomname, createdAt, updatedAt, UserId)
    VALUES ('Men like you can never change!', 'main', '1000-01-01 00:00:00', '1000-01-01 00:00:00', 2)`;
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    dbConnection.query(
      `insert into users (username, createdAt, updatedAt) VALUES ('some_user', '1000-01-01 00:00:00', '1000-01-01 00:00:00')`,
      function(error, results) {
        if (error) {
          console.log("error username ", error);
        }
      }
    );

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) {
        console.log("error test 1=========================", err);
      }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(
        error,
        response,
        body
      ) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].text).to.equal("Men like you can never change!");
        expect(messageLog[0].roomname).to.equal("main");
        done();
      });
    });
  });

  //new tests
  it("Should keep track of how many messages there are on the DB", function(done) {
    dbConnection.query(
      `insert into users (username, createdAt, updatedAt) VALUES ('some_user2', '1000-01-01 00:00:00', '1000-01-01 00:00:00')`,
      function(error, results) {
        if (error) {
          console.log("error username");
        }
      }
    );

    var queryString = `insert into messageobjects (text, roomname, createdAt, updatedAt, UserId)
    VALUES ('Men like you can never change!', 'main', '1000-01-01 00:00:00', '1000-01-01 00:00:00', 3)`;

    dbConnection.query(queryString, function(error, results) {
      if (error) {
        console.log(error);
      }

      request("http://127.0.0.1:3000/classes/messages", function(
        error,
        response,
        body
      ) {
        var messageLog = JSON.parse(body);
        expect(messageLog.length).to.not.equal(0);
        done();
      });
    });
  });

  it("Should have a proper createdAt time", function(done) {
    dbConnection.query(
      `insert into users (username, createdAt, updatedAt) VALUES ('some_user3', '1000-01-01 00:00:00', '1000-01-01 00:00:00')`,
      function(error, results) {
        if (error) {
          console.log("error username");
        }
      }
    );

    var queryString = `insert into messageobjects (text, roomname, createdAt, updatedAt, UserId)
    VALUES ('Men like you can never change!', 'main', '1000-01-01 00:00:00', '1000-01-01 00:00:00', 4)`;

    dbConnection.query(queryString, function(error, results) {
      if (error) {
        console.log(error);
      }

      request("http://127.0.0.1:3000/classes/messages", function(
        error,
        response,
        body
      ) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].createdAt).to.equal('1000-01-01 00:00:00');
        done();
      });
    });
  });

  it("Should change the updatedAt time when editing a message", function(done) {
    dbConnection.query(
      `insert into users (username, createdAt, updatedAt) VALUES ('some_user4', '1000-01-01 00:00:00', '1000-01-01 00:00:00')`,
      function(error, results) {
        if (error) {
          console.log("error username");
        }
      }
    );

    var queryString = `insert into messageobjects (text, roomname, createdAt, updatedAt, UserId)
    VALUES ('Men like you can never change!', 'main', '1000-01-01 00:00:00', '1000-01-01 00:00:00', 5)`;

    dbConnection.query(queryString, function(error, results) {
      if (error) {
        console.log(error);
      }

      request("http://127.0.0.1:3000/classes/messages", function(
        error,
        response,
        body
      ) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].updatedAt).to.equal('1000-01-01 00:00:00');
        done();
      });
    });
  });

});
