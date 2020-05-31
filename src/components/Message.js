import React, { Component } from 'react';

class Message extends Component {
  render() {
  	const message = this.props.message;
    return (
      <div>
        <div>
          {message.User.email} ({message.message})
        </div>
      </div>
    );
  }
}

export default Message;