import React, { Component } from 'react';
import User from './User';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import USER_QUERY from "../graphql/user";
import VERIFY_QUERY from "../graphql/verify";
import MessageArea from "./MessageArea";
import TypeArea from "./TypeArea";
const jwt = require("jsonwebtoken");
const AUTH_TOKEN = "uplaratexttoken";
const APP_SECRET = "appsecret123";

class UserList extends Component {
  state = {
      token: localStorage.getItem(AUTH_TOKEN),
      authenticated: 0,
      conv_id: 0,
      conv_name: '',
      conv_list:[],
      'group': false,
  };

  email = '';
  user_id = 0;
  message_window_user = (conv_id,conv_name,group_bool) => {
    this.setState({ conv_id: conv_id, conv_name: conv_name, group:group_bool});
  }

  render() {
    const {token,authenticated,conv_id,conv_name} = this.state;
    const email = this.email;
    const user_id = this.user_id;
    const group_bool = this.state.group;
    if (authenticated == 2){
      return <div><div>{token}</div> <div>Not Logged In</div></div>;
    }
    return (
      <div>
      <Query
          query = {authenticated == 1 ?  USER_QUERY: VERIFY_QUERY} variables ={authenticated == 1 ? {email} : {token}}
      >
      {({ loading, error, data }) => {
          if(error) return <div><div>{email}</div><div>{authenticated}</div></div>;
          if(loading) return <div>Loading </div>;
          if(authenticated){
            const ConvsToRender = data.Users[0].participants;
            return (
              <div>
                <div>
                {ConvsToRender.map(conv => <User key={conv.conversation.name} user={conv.conversation} clicke={this.message_window_user} />)}
                </div>
                <div>
                  <MessageArea conv_id={conv_id} conv_name={conv_name} group_bool={group_bool} user_id={user_id} convs={ConvsToRender} email={email} clicke={this.message_window_user} />
                </div>
                <div>
                  <TypeArea conv_id={conv_id} conv_name={conv_name} group_bool={group_bool} user_id={user_id}/>
                </div>
              </div>
          );}
          else{
            if(data.Users.length < 1){
              this.setState({ token: localStorage.getItem(AUTH_TOKEN), authenticated: 2});  
            }else{
              this.setState({ token: localStorage.getItem(AUTH_TOKEN), authenticated: 1});  
              this.email = data.Users[0].email;
              this.user_id = data.Users[0].id;
            }
            return null;
          }
      }}
      </Query>
      
      </div>
    );
    
  }
}

export default UserList;
