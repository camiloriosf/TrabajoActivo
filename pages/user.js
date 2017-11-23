import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import UserContainer from '../containers/user';
import FullLoader from '../components/common/fullLoader';
// local imports
import withRoot from '../hoc/withRoot';
import { app, db } from '../lib/google/firebase';
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

class User extends Component {
  state = {
    open: true,
    user: null,
  }
  componentDidMount = async () => {
    this.mounted = true;
    app.auth().onAuthStateChanged(async (user) => {
      if (user && this.mounted) {
        const doc = await db.collection('users').doc(user.uid).get();
        if (!doc.exists) {
          await db.collection('users').doc(user.uid).set({
            email: user.email,
          }, { merge: true });
          this.setState({ open: false, user });
        } else this.setState({ open: false, user });
      } else if (this.mounted) Router.push('/login');
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
          <UserContainer user={this.state.user} />
        </div>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Extended = translate(['user', 'common'], { i18n, wait: process.browser })(withRoot(withStyles(styles)(User)));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['user', 'common']);
  return {};
};

export default Extended;
