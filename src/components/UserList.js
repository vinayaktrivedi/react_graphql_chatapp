import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import User from './User';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import USER_QUERY from "../graphql/user";
import VERIFY_QUERY from "../graphql/verify";
import MessageArea from "./MessageArea";
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from "@apollo/react-hooks";
import TypeArea from "./TypeArea";
import { withApollo } from "react-apollo";
const jwt = require("jsonwebtoken");
const AUTH_TOKEN = "uplaratexttoken";
const APP_SECRET = "appsecret123";

function useAuthenticatedHook(token,client){

    const [isAuth, setAuth] = useState([0,'',0]);
    const { loading, error, data } = useQuery(
        VERIFY_QUERY, {variables: {token}, client:client}
    );

    useEffect(() => {
      if(isAuth[0] == 0){
        if(data){
          if(data.Users.length < 1){
            setAuth([2,'',0]);
          }else{
            setAuth([1,data.Users[0].email,data.Users[0].id]);
          }  
        }  
      }
    });

    return isAuth;
}

function useConvsersationHook(email,client){

    const [Convs, setConvs] = useState([]);
    const { loading, error, data } = useQuery(
          USER_QUERY, {variables: {email}, client:client}
    );
    useEffect(() => {
      if(data){
        setConvs(data.Users[0].participants);
      }
    });
    return Convs;

}

function TotalHook(props){

    const [conv_id, setConvId] = useState(0);
    const [conv_name, setConvName] = useState('');
    const [group_bool, setGroup] = useState(false);
    const message_window_user = (conv_id,conv_name,group_bool) => {
      setConvId(conv_id);
      setConvName(conv_name);
      setGroup(group_bool);
    }
    const [auth,email,user_id] = useAuthenticatedHook(props.token,props.client);
    const ConvsToRender = useConvsersationHook(email,props.client);

    if(auth==2){
      return <div><div>Not Logged In</div></div>;
    }
    else if(auth==0){
      return <div> <div>Logging In</div></div>;
    }
    else{
      if(ConvsToRender.length == 0){
          return <div> <div>Loading Conversations</div></div>;   
      }
     return (
        <div>
          <div>
          {ConvsToRender.map(conv => <User key={conv.conversation.name} user={conv.conversation} clicke={message_window_user} />)}
          </div>
          <div>
            <MessageArea conv_id={conv_id} conv_name={conv_name} group_bool={group_bool} user_id={user_id} convs={ConvsToRender} email={email} clicke={message_window_user} />
          </div>
          <div>
            <TypeArea conv_id={conv_id} conv_name={conv_name} group_bool={group_bool} user_id={user_id}/>
          </div>
        </div>
      );
    }
  }

class UserList extends Component {
  state = {
      token: localStorage.getItem(AUTH_TOKEN),
  };

  
  render() {
    const token = this.state.token;

    return (<ApolloConsumer>
      {client => (
        <div><TotalHook token={token} client={client}/></div>
      )}
    </ApolloConsumer>)
  }
}

export default withApollo(UserList);
