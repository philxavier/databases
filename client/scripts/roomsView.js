var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function () {
    RoomsView.$button.on('click', RoomsView.handleAddButton);
    //event handler for addbutton click()
    RoomsView.$select.change(RoomsView.handleSelectChange);
    //event handler for select - change()
  },

  handleAddButton: function() {
    var roomname = prompt('Enter roomname');
    Rooms.add(roomname);
  },

  handleSelectChange: function() {
    Parse.readAll(data => RoomsView.renderRoom(RoomsView.$select.val(), data));
  },


  renderRoom: function (RoomName, data) {
    // get updated data from server and filter for the messages in the current chat room
    var chatData = _.filter(data, message => {
      return message.hasOwnProperty('RoomName') &&
        message.hasOwnProperty('UserName') &&
        message.RoomName === RoomName;
    });
    // delete current messages in chat area
    $('#chats').children().remove();
    // add the updated messages to chat area
    _.each(chatData, (message) => MessagesView.renderMessage(message));
  }

};

