import React, { Component } from 'react';

class User extends Component {
  render() {
  	const user = this.props.user;
    return (
      <div>
        <div onClick={e => {
              this.props.clicke(user.id,user.name,user.group);}} >
          {user.name} ({user.id})
        </div>
      </div>
    );
  }
}

export default User;