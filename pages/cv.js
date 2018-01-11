import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import ReactGA from 'react-ga';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Index from '../components/cv/index';
import FullLoader from '../components/common/fullLoader';
// local imports
import withRoot from '../lib/hoc/withRoot';
import { app, db } from '../lib/google/firebase';
import i18n from '../lib/i18n/i18n';
import initStore from '../lib/redux/store';
import { doGetAllCVs, doResetALLCVs, doResetData } from '../lib/redux/actions/cv';
import { doUpdateUID } from '../lib/redux/actions/user';
import { getCVSDataState } from '../lib/reselect/cv';
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

class CV extends Component {
  componentDidMount = async () => {
    ReactGA.initialize('UA-100581684-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.mounted = true;
    this.props.doResetData();
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
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user.uid && !nextProps.cv.data) this.props.doGetAllCVs();
  }
  componentWillUnmount = () => {
    this.props.doResetALLCVs();
    this.mounted = false;
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div>
        <Head>
          <title>TrabajoActivo - Mis CVs</title>
        </Head>
        <FullLoader open={!Array.isArray(this.props.cv.data)} />
        <div className={!Array.isArray(this.props.cv.data) ? classes.root : null}>
          {Array.isArray(this.props.cv.data) && <Index />}
        </div>
      </div>
    );
  }
}

CV.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Extended = translate(['cv', 'user', 'common'], { i18n, wait: process.browser })(withRoot(withStyles(styles)(CV)));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['cv', 'user', 'common']);
  return {};
};

const mapStateToProps = state => ({
  user: getUserDataState(state),
  cv: getCVSDataState(state),
});

const mapDispatchToProps = dispatch => ({
  doGetAllCVs: bindActionCreators(doGetAllCVs, dispatch),
  doResetALLCVs: bindActionCreators(doResetALLCVs, dispatch),
  doResetData: bindActionCreators(doResetData, dispatch),
  doUpdateUID: bindActionCreators(doUpdateUID, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Extended);
