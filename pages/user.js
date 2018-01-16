import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import { I18nextProvider } from 'react-i18next';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import ReactGA from 'react-ga';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Index from '../components/user/index';
import FullLoader from '../components/common/fullLoader';
// local imports
import withRoot from '../lib/hoc/withRoot';
import { app, db } from '../lib/google/firebase';
import startI18n from '../lib/i18n/startI18n';
import { getTranslation } from '../lib/i18n/translationHelpers';
import initStore from '../lib/redux/store';
import { doUpdateUID } from '../lib/redux/actions/user';
import { getUserDataState } from '../lib/reselect/user';

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

class User extends Component {
  static async getInitialProps() {
    const translations = await getTranslation(
      lang,
      ['common', 'user'],
      `${url}/static/locales/`,
    );

    return { translations };
  }

  constructor(props) {
    super(props);

    this.i18n = startI18n(props.translations, lang);
  }
  componentDidMount = async () => {
    ReactGA.initialize('UA-100581684-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.mounted = true;
    app.auth().onAuthStateChanged(async (user) => {
      if (user && this.mounted) {
        const doc = await db.collection('users').doc(user.uid).get();
        if (!doc.exists) {
          await db.collection('users').doc(user.uid).set({
            email: user.email,
          }, { merge: true });
          this.props.doUpdateUID({ uid: user.uid, email: user.email });
        } else {
          const {
            name = null,
            username = null,
            plan = null,
          } = doc.data();
          this.props.doUpdateUID({
            uid: user.uid,
            email: user.email,
            name,
            username,
            plan,
          });
        }
      } else if (this.mounted) {
        this.props.doUpdateUID({});
        Router.push('/login');
      }
    });
  }
  componentWillUnmount = () => {
    this.mounted = false;
  }

  render() {
    const {
      classes,
      user,
    } = this.props;
    return (
      <I18nextProvider i18n={this.i18n}>
        <div>
          <Head>
            <title>TrabajoActivo - Mi Cuenta</title>
          </Head>
          <FullLoader open={!this.props.user.uid} />
          <div className={!user.uid ? classes.root : null}>
            {user.uid && <Index />}
          </div>
        </div>
      </I18nextProvider>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Extended = withRoot(withStyles(styles)(User));

const mapStateToProps = state => ({
  user: getUserDataState(state),
});

const mapDispatchToProps = dispatch => ({
  doUpdateUID: bindActionCreators(doUpdateUID, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Extended);
