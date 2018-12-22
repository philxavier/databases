var MessageView = {

  render: _.template(`
      <div class="chat">
        <div class="username"><%- User.username %></div>
        <div><%- text %></div> 
      </div>
    `)

};

// <%= %>