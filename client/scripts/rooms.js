var Rooms = {
  // how to return current room name
  // display only messages with roomname = to current room
  add: function(roomname) {
    var template = _.template(`<option value='<%- roomname %>'><%- roomname %></option>`);
    $('#rooms select').append(template({roomname: roomname}));
  }

};

  