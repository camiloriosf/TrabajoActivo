// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
});

class Create extends Component {
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        Create
      </div>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Create);
