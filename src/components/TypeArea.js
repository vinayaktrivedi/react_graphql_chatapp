import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SEND_MUTATION from '../graphql/sendmessage';

class TypeArea extends Component {
  state = {
    'message':'',
  };

  render() {
    const props = this.props;
    const message = this.state.message;
    return (
    	<div className="center w85">
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={message}
            onChange={e => this.setState({ message: e.target.value })}
            type="text"
            placeholder="Type Something"
          />
        </div>
        <div className="flex mt3">
        <Mutation
          mutation={SEND_MUTATION}
        >
          {mutation => (
            <div className="pointer mr2 button" onClick={e => {
                e.preventDefault();
                let variables_obj = {conv_id: props.conv_id, user_id: props.user_id, message:message};
                mutation({ variables: variables_obj });
                this.setState({ message: '' }); }}>
              Send Message
            </div>
          )}
        </Mutation>
        </div>
      </div>
    	</div>
    	);
  }
}

export default TypeArea;