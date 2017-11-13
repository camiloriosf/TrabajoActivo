// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    textAlign: 'center',
  },
});

class Press extends Component {
  render() {
    const {
      classes,
      children,
    } = this.props;
    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  }
}

Press.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export default withStyles(styles)(Press);
