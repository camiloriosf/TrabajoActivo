import React, { Component } from 'react';
import withRoot from '../hoc/withRoot';
import withoutAuth from '../hoc/withoutAuth';
import RegisterContainer from '../containers/register';

class Register extends Component {
  render() {
    return (
      <div>
        <RegisterContainer />
      </div>
    );
  }
}

export default withoutAuth(withRoot(Register));
