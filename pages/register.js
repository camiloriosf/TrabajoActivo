import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import { I18nextProvider } from 'react-i18next';
import ReactGA from 'react-ga';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import RegisterContainer from '../components/auth/_register';
import FullLoader from '../components/common/fullLoader';
// local imports
import withRoot from '../lib/hoc/withRoot';
import { app } from '../lib/google/firebase';
import startI18n from '../lib/i18n/startI18n';
import { getTranslation } from '../lib/i18n/translationHelpers';

const lang = 'es';
const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://trabajoactivo.com';

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
  static async getInitialProps() {
    const translations = await getTranslation(
      lang,
      ['common', 'auth'],
      `${url}/static/locales/`,
    );

    return { translations };
  }

  constructor(props) {
    super(props);

    this.i18n = startI18n(props.translations, lang);
  }
  state = {
    open: true,
  }
  componentDidMount = () => {
    ReactGA.initialize('UA-100581684-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
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
      <I18nextProvider i18n={this.i18n}>
        <div>
          <Head>
            <title>TrabajoActivo - Crear Cuenta</title>
          </Head>
          <FullLoader open={this.state.open} />
          <div className={this.state.open ? classes.root : null}>
            <RegisterContainer />
          </div>
        </div>
      </I18nextProvider>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Register));
