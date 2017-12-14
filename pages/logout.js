import React, { Component } from 'react';
import withRoot from '../lib/hoc/withRoot';
import LogoutContainer from '../components/auth/_logout';

class Logout extends Component {
  render() {
    return (
      <div>
        <LogoutContainer />
      </div>
    );
  }
}

export default withRoot(Logout);
