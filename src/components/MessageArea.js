import React, { Component } from 'react';
import { Query } from 'react-apollo';
import CONVERSATION_QUERY from '../graphql/conversation';
import Message from './Message';
import MESSAGE_SUSCRIPTION from '../graphql/message';
import EMAIL_QUERY from '../graphql/emailquery';
import ADD_GROUP from '../graphql/addgroup';
import INSERT_CONVERSATION from '../graphql/newconversation';
import ADD_PARTICIPANT from '../graphql/recepient';
import { useLazyQuery } from 'react-apollo-hooks';
import { Mutation } from 'react-apollo';

class MessageArea extends Component {
  state = {
    'receipient': '',
    'group_name': '',
    'group_recep': '',
    'messages': [],
  };

  get_new_conv_name(name1,name2){
    if(name1.localeCompare(name2) < 0)
      return name1+":"+name2;
    return name2+":"+name1;
  }

  check_if_name_present(name, listofconvs){
    for (const value of listofconvs) {
      if (value.conversation.name.localeCompare(name) == 0)
        return value.conversation.id;
    }
    return -1;
  }

  _subscribeToNewMsgs = (subscribeToMore,this_obj) => {
    subscribeToMore({
      document: MESSAGE_SUSCRIPTION,
      variables: {conv_id: this_obj.props.conv_id},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        let prev_msgs = prev.messages;
        const msgs = subscriptionData.data.messages;
        if (msgs.length <= 0)
          return prev;
        for (const msg of msgs){
          const exists = prev_msgs.find(message => message.created_at === msg.created_at);
          if(!exists)
            prev_msgs.push(msg);
        }
        this_obj.setState({ messages: prev_msgs });
        return {'messages': prev_msgs};
      }
    })
  }

  _notify = (data,group_bool) => {
    if(typeof data.insert_conversation_one != 'undefined'){
      this.props.clicke(data.insert_conversation_one.id,data.insert_conversation_one.name,group_bool);  
    }
  }

  render() {
    const {receipient, group_name, group_recep} = this.state;
    const conv_id = this.props.conv_id;
    const group_bool = this.props.group_bool;
    const sender_email = this.props.email;
    return (
    	<div className="center w85">
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={receipient}
            onChange={e => this.setState({ receipient: e.target.value })}
            type="text"
            placeholder="Direct Message PN"
          />
        </div>
        <div className="flex mt3">
        <Mutation
          mutation={INSERT_CONVERSATION} onCompleted={data => this._notify(data,false)}
        >
          {(mutation, { loading, error, data }) => (
          <div
            className="pointer button"
            onClick={(e) => {
              e.preventDefault();
              let name = this.get_new_conv_name(receipient, sender_email);
              let id = this.check_if_name_present(name,this.props.convs);
              if(id < 0){
                let variables_obj = {group: false, name: name, recp1:sender_email, recp2:receipient};
                mutation({ variables: variables_obj });
                this.setState({ receipient: ''});
              }
            }}
          >
            New Message
          </div>
          )}
          </Mutation>
        </div>
      </div>
            <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={group_name}
            onChange={e => this.setState({ group_name: e.target.value })}
            type="text"
            placeholder="Group Name"
          />
        </div>
        <div className="flex mt3">
          <Mutation
          mutation={ADD_GROUP} onCompleted={data => this._notify(data,true)}
        >
          {(mutation, { loading, error, data }) => (
          <div
            className="pointer button"
            onClick={(e) => {
              e.preventDefault();
              let name = this.get_new_conv_name(group_name, sender_email);
              let id = this.check_if_name_present(name,this.props.convs);
              if(id < 0){
                let variables_obj = {group: true, name: name, email:sender_email};
                mutation({ variables: variables_obj });
                this.setState({ group_name: ''});
              }
            }}
          >
            Make Group
          </div>
          )}
          </Mutation>
        </div>
      </div>
      {group_bool && <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={group_recep}
            onChange={e => this.setState({ group_recep: e.target.value })}
            type="text"
            placeholder="Participant Name"
          />
        </div>
        <div className="flex mt3">
          <Mutation
          mutation={ADD_PARTICIPANT}
        >
          {(mutation, { loading, error, data }) => (
          <div
            className="pointer button"
            onClick={(e) => {
              e.preventDefault();
              let variables_obj = {conversation_id:conv_id, user_email:group_recep};
              mutation({ variables: variables_obj });
              this.setState({ group_recep: ''});
            }}
          >
            Add Participant To Group
          </div>
          )}
          </Mutation>
        </div>
      </div>}

      	<div>{this.props.conv_id} {this.props.conv_name} </div>
        <div> <Query query={CONVERSATION_QUERY} variables={{conv_id}}>
        {({ loading, error, data, subscribeToMore }) => {
            const msg_list = this.state.messages;
            if(loading) return <div> Fetching Chat</div>;
            if(error) return <div> {error.toString()} </div>;
            this._subscribeToNewMsgs(subscribeToMore,this);
            return (
              <div>
                {msg_list.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                  />
                ))}
              </div>
            );
        }}
      </Query> </div>
    	</div>
    	);
  }
}

export default MessageArea;