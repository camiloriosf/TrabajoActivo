import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import withRoot from '../hoc/withRoot';
import IndexContainer from '../containers/index';

const styles = {
  root: {

  },
};

class Index extends Component {
  state = {

  }

  render() {
    return (
      <div>
        <IndexContainer />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
