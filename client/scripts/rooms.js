var Rooms = {
  // how to return current room name
  // display only messages with roomname = to current room
  add: function(RoomName) {
    var template = _.template(`<option value="<%- RoomName %>"><%- RoomName %></option>`);
    $('#rooms select').append(template({RoomName: RoomName}));
  }

};

  