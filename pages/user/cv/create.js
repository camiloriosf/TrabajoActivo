import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import withRoot from '../../../hoc/withRoot';
import CreateContainer from '../../../containers/user/cv/create';
import FullLoader from '../../../components/common/fullLoader';
// local imports
import { app, db } from '../../../lib/google/firebase';

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
  state = {
    open: true,
    user: null,
    cv: null,
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
          const cv = await db.collection('users').doc(user.uid)
            .collection('cvs').doc(this.props.url.query.id)
            .get();
          if (cv.exists) this.setState({ open: false, user, cv });
          else Router.push('/user/cv');
        } else {
          const cv = await db.collection('users').doc(user.uid)
            .collection('cvs').doc(this.props.url.query.id)
            .get();
          if (cv.exists) this.setState({ open: false, user, cv });
          else Router.push('/user/cv');
        }
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
          { this.state.cv !== null && <CreateContainer user={this.state.user} cv={this.state.cv} />}
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Create));
