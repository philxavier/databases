var Promise = require('bluebird');
var db = require('../db');

module.exports = {
  messages: {
    get: function(callback) {

      db.connection.sync()
      .then(()=>{
        return db.Message.findAll({
          include: [{
            model: db.User,
          }]
        })
      })
      .then((results)=>{
        // console.log("results============",results)
        var mapped = results.map((obj)=>obj.dataValues)
        callback(mapped)
      })
      .catch((err)=>{
        console.error(err);
      });
    },
    // a function which produces all the messages
    post: function(body) {
      db.connection.sync()
      .then(()=>{
        return db.User.findOne({
          where:{
            username: body.username
          }
        })
      })
      .then((foundUser)=>{
        console.log('found user-----------', foundUser.dataValues.id)
        return db.Message.create({
          text: body.text,
          roomname: body.roomname,
          UserId: foundUser.dataValues.id
        });
      })
      .catch((err)=>{
        console.error(err);
      })

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function(callback) {

      db.connection.sync()
      .then(()=> {
        return db.User.findAll();
      })
      .then(()=> {
        var mapped = results.map((obj)=>obj.dataValues)
        //console.log("mapped users values=================", mapped)
        callback(mapped);
      })
      .catch((err)=>{
        console.log('users.get error ', err);
      });

    },
    post: function(username) {
      db.connection.sync()
      .then((result)=>{
        db.User.create({username: username})
      })
      .catch((err)=>{
        console.error('users.post error ', err);
      })
    }
  }
};