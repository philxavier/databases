var Friends = {

  friendList: [],
  
  initialize: function () {
    $('#chats').on('click', '.username', Friends.toggleStatus);
  },

  toggleStatus: function () {  
    Friends.renderFriends(this);
  },

  renderFriends: function (el) {
    $(`div:contains("${el.innerHTML}")`).addClass('friend');
  }

};
