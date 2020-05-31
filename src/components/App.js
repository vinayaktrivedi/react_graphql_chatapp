import React, { Component } from 'react';
import UserList from './UserList';
import CreateUser from './SignUp';
//import Header from './Header';
import { Switch, Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
    	<div className="center w85">
      	<div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route exact path="/create" component={CreateUser} />
        </Switch>
      	</div>
    	</div>
    	);
  }
}

export default App;