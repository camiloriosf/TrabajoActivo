// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
import validator from 'validator';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Header from '../components/auth/header';
import Signin from '../components/auth/signin';
import Reviews from '../components/auth/reviews';
import ActionDialog from '../components/common/actionDialog';
// local imports
import { app } from '../lib/google/firebase';
import { login, reviews, errors } from '../lang/es.json';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
});

class Login extends Component {
  state = {
    loading: false,
    errorEmail: '',
    errorSubmit: '',
    dialogOpen: false,
    dialogTitle: login.dialog.title,
    dialogContent: login.dialog.content,
  };
  handleHeaderClick = link => () => {
    Router.push(link);
  }
  handleDialogRequestClose = () => {
    this.setState({ dialogOpen: false });
  };
  handleFormSubmit = async ({ email, password }) => {
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: errors.invalidEmail, errorSubmit: '' });
      return;
    }
    this.setState({
      loading: true, errorEmail: '', errorSubmit: '',
    });

    try {
      const providers = await app.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        this.setState({ loading: false, errorSubmit: errors.noAccount });
      } else if (providers.indexOf('password') === -1) {
        this.setState({ loading: false, errorSubmit: errors.accountSocialExist });
      } else {
        await app.auth().signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      const {
        code,
      } = err;
      if (code === 'auth/wrong-password') this.setState({ loading: false, errorSubmit: errors.emailPassNoMatch });
      else this.setState({ loading: false, errorSubmit: errors.unknown });
    }
  }
  handleResetSubmit = async (email) => {
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: errors.invalidEmail, errorSubmit: '' });
      return;
    }
    this.setState({
      loading: true, errorEmail: '', errorSubmit: '',
    });

    try {
      const providers = await app.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        this.setState({ loading: false, errorSubmit: errors.noAccount });
      } else if (providers.indexOf('password') === -1) {
        this.setState({ loading: false, errorSubmit: errors.accountSocialExist });
      } else {
        await app.auth().sendPasswordResetEmail(email);
        this.setState({
          loading: false, errorEmail: '', errorSubmit: '',
        });
        this.setState({ dialogOpen: true });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      this.setState({ loading: false, errorSubmit: errors.unknown });
    }
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header
          header={login.header}
          handleClick={this.handleHeaderClick}
          loading={this.state.loading}
        />
        <div className={classes.content}>
          <Signin
            handleFormSubmit={this.handleFormSubmit}
            loading={this.state.loading}
            errorEmail={this.state.errorEmail}
            errorSubmit={this.state.errorSubmit}
            handleResetSubmit={this.handleResetSubmit}
            signin={login.signin}
          />
          <Reviews title={reviews.title} reviews={reviews.items} />
        </div>
        <ActionDialog
          open={this.state.dialogOpen}
          title={this.state.dialogTitle}
          content={this.state.dialogContent}
          button={login.dialog.button}
          handleRequestClose={this.handleDialogRequestClose}
        />
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
