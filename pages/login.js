import React, { Component } from 'react';
import withRoot from '../hoc/withRoot';
import withoutAuth from '../hoc/withoutAuth';
import LoginContainer from '../containers/login';

class Login extends Component {
  render() {
    return (
      <div>
        <LoginContainer />
      </div>
    );
  }
}

export default withoutAuth(withRoot(Login));
