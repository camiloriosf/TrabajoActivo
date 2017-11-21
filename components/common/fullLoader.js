// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
  root: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'aboslute',
    zIndex: 999,
  },
  hide: {
    display: 'none',
  },
};

class FullLoader extends Component {
  render() {
    const {
      classes,
      open,
    } = this.props;
    return (
      <div className={open ? classes.root : classes.hide}>
        <CircularProgress size={50} />
      </div>
    );
  }
}

FullLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullLoader);
