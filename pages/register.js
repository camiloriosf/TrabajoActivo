import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import withRoot from '../hoc/withRoot';
import RegisterContainer from '../containers/register';
import FullLoader from '../components/common/fullLoader';
// local imports
import { app } from '../lib/google/firebase';

const styles = {
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    background: '#000',
    opacity: 0,
    zIndex: 998,
    height: '100%',
    width: '100%',
  },
};

class Register extends Component {
  state = {
    open: true,
  }
  componentDidMount = () => {
    this.mounted = true;
    app.auth().onAuthStateChanged((user) => {
      if (user && this.mounted) Router.push('/user');
      else if (this.mounted) this.setState({ open: false });
    });
  }
  componentWillUnmount = () => {
    this.mounted = false;
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div>
        <FullLoader open={this.state.open} />
        <div className={this.state.open ? classes.root : null}>
          <RegisterContainer />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Register));
