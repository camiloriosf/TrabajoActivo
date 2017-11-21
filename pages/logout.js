import React, { Component } from 'react';
import withRoot from '../hoc/withRoot';
import LogoutContainer from '../containers/logout';

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
