var MessageView = {

  render: _.template(`
      <div class="chat">
        <div class="username"><%- UserName %></div>
        <div><%- MessageText %></div> 
      </div>
    `)

};

// <%= %>