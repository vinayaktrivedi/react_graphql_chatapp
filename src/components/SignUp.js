import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import SIGNUP_MUTATION from "../graphql/signup";
import LOGIN_MUTATION from "../graphql/login";

const AUTH_TOKEN = "uplaratexttoken";
const jwt = require("jsonwebtoken");
const APP_SECRET = "appsecret123";

class CreateUser extends Component {
  state = {
    login: true, 
    email: '',
    password: '',
    name:'',
  };

  render() {
    const { login, email, password, name, data } = this.state;
    const xarray = "xxxxxxxxxxxxxxxxxxx";
    return (
      <div>
      <h4 className="mv3"> {login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Email"
          />
          {!login && <input
            className="mb2"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="Name"
          />}
          <input
            className="mb2"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex mt3">
        <Mutation
          mutation= {login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (
            <div className="pointer mr2 button" onClick={e => {
                e.preventDefault();
                const token = jwt.sign({ userId: email }, APP_SECRET);
                let variables_obj;
                if(!login){
                  variables_obj = { email, password, token, name };
                }else{
                  variables_obj = {email, password, token};
                }
                mutation({ variables: variables_obj });}}>
              {login ? 'login' : 'create account'}
            </div>
          )}
        </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }

  _confirm = (data) => {
    const token  = ((this.state.login == true) ? data.update_Users.returning[0].token : data.insert_Users_one.token);
    localStorage.setItem(AUTH_TOKEN, token);
    console.log("Hello friend");   
    this.props.history.push(`/`);
  }
}
export default CreateUser;