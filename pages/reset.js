import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import withRoot from '../hoc/withRoot';
import ResetContainer from '../containers/reset';

const styles = {
  root: {

  },
};

class Reset extends Component {
  state = {

  }

  render() {
    return (
      <div>
        <ResetContainer url={this.props.url} />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Reset));
