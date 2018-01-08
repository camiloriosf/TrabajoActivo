import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import RegisterContainer from '../components/auth/_register';
import FullLoader from '../components/common/fullLoader';
// local imports
import withRoot from '../lib/hoc/withRoot';
import { app } from '../lib/google/firebase';
import i18n from '../lib/i18n/i18n';

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
        <Head>
          <title>TrabajoActivo - Crear Cuenta</title>
        </Head>
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

const Extended = translate(['auth', 'common'], { i18n, wait: process.browser })(withRoot(withStyles(styles)(Register)));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['auth', 'common']);
  return {};
};

export default Extended;
