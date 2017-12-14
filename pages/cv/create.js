import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Index from '../../components/cv/create/index';
import FullLoader from '../../components/common/fullLoader';
// local imports
import withRoot from '../../lib/hoc/withRoot';
import { app, db } from '../../lib/google/firebase';
import i18n from '../../lib/i18n/i18n';
import initStore from '../../lib/redux/store';
import { doGetCVData, doResetData } from '../../lib/redux/actions/cv';
import { doUpdateUID } from '../../lib/redux/actions/user';
import { getCVDataState } from '../../lib/reselect/cv';
import { getUserDataState } from '../../lib/reselect/user';

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

class Create extends Component {
  componentDidMount = async () => {
    this.mounted = true;
    app.auth().onAuthStateChanged(async (user) => {
      if (user && this.mounted && this.props.url.query.id) {
        const doc = await db.collection('users').doc(user.uid).get();
        if (!doc.exists) {
          await db.collection('users').doc(user.uid).set({
            email: user.email,
          }, { merge: true });
          this.props.doUpdateUID({ uid: user.uid, email: user.email });
        } else {
          this.props.doUpdateUID({ uid: user.uid, email: user.email });
        }
      } else if (user && this.mounted) {
        Router.push('/cv');
      } else {
        Router.push('/login');
        this.props.doUpdateUID(null);
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.user.uid && !nextProps.cv.id
    ) this.props.doGetCVData({ id: this.props.url.query.id });
  }
  componentWillUnmount = () => {
    this.mounted = false;
    this.props.doResetData();
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div>
        <FullLoader open={!this.props.cv.id} />
        <div className={!this.props.cv.id ? classes.root : null}>
          {this.props.cv.id && <Index />}
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Extended = translate(['cv', 'user', 'common'], { i18n, wait: process.browser })(withRoot(withStyles(styles)(Create)));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['cv', 'user', 'common']);
  return {};
};

const mapStateToProps = state => ({
  user: getUserDataState(state),
  cv: getCVDataState(state),
});

const mapDispatchToProps = dispatch => ({
  doGetCVData: bindActionCreators(doGetCVData, dispatch),
  doResetData: bindActionCreators(doResetData, dispatch),
  doUpdateUID: bindActionCreators(doUpdateUID, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Extended);
