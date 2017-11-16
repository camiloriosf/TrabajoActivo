import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import withRoot from '../hoc/withRoot';
import withAuth from '../hoc/withAuth';

const styles = {
  root: {

  },
};

class User extends Component {
  state = {

  }

  render() {
    console.log(this.props);
    return (
      <div>
        this should be a restricted page
      </div>
    );
  }
}

export default withAuth(withRoot(withStyles(styles)(User)));
