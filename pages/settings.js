import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Index from '../components/settings/index';
import FullLoader from '../components/common/fullLoader';
// local imports
import withRoot from '../lib/hoc/withRoot';
import { app, db } from '../lib/google/firebase';
import i18n from '../lib/i18n/i18n';
import initStore from '../lib/redux/store';
import { doUpdateUID } from '../lib/redux/actions/user';
import { getUserDataState } from '../lib/reselect/user';

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
  componentDidMount = async () => {
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
      <div>
        <Head>
          <title>TrabajoActivo - Configuración</title>
        </Head>
        <FullLoader open={!this.props.user.uid} />
        <div className={!user.uid ? classes.root : null}>
          {user.uid && <Index />}
        </div>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Extended = translate(['settings', 'common'], { i18n, wait: process.browser })(withRoot(withStyles(styles)(User)));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['settings', 'common']);
  return {};
};

const mapStateToProps = state => ({
  user: getUserDataState(state),
});

const mapDispatchToProps = dispatch => ({
  doUpdateUID: bindActionCreators(doUpdateUID, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Extended);
