// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
// error page
import Error from '../../pages/_error';
// local imports
import { app } from '../../lib/google/firebase';

const styles = {
  root: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class Logout extends Component {
  state = {
    errorPage: false,
  };
  componentDidMount = async () => {
    try {
      await app.auth().signOut();
      Router.push('/login');
    } catch (error) {
      this.setState({ errorPage: true });
    }
  }
  render() {
    const {
      classes,
    } = this.props;
    if (this.state.errorPage) {
      return <Error />;
    }
    return (
      <div className={classes.root}>
        <CircularProgress size={50} />
      </div>
    );
  }
}

Logout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logout);
