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
import Signup from '../components/auth/signup';
import Reviews from '../components/auth/reviews';
// local imports
import { app } from '../lib/google/firebase';
import { register, reviews, errors } from '../lang/es.json';

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

class Register extends Component {
  state = {
    loading: false,
    errorEmail: '',
    errorPassword: '',
    errorSubmit: '',
  };
  handleHeaderClick = link => () => {
    Router.push(link);
  }
  handleSignupClick = link => () => {
    Router.push(link);
  }
  handleFormSubmit = async ({ email, password }) => {
    let error = false;
    const hasNumber = /\d/;
    const hasAlpha = /[a-z]/i;
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: errors.invalidEmail });
      error = true;
    }
    if (password.length < 8 || !hasAlpha.test(password) || !hasNumber.test(password)) {
      this.setState({ loading: false, errorPassword: errors.invalidPassword });
      error = true;
    }
    if (error) return;
    this.setState({
      loading: true, errorEmail: '', errorPassword: '', errorSubmit: '',
    });

    try {
      const providers = await app.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        await app.auth().createUserWithEmailAndPassword(email, password);
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
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header
          header={register.header}
          handleClick={this.handleHeaderClick}
          loading={this.state.loading}
        />
        <div className={classes.content}>
          <Signup
            handleFormSubmit={this.handleFormSubmit}
            handleClick={this.handleSignupClick}
            loading={this.state.loading}
            errorEmail={this.state.errorEmail}
            errorPassword={this.state.errorPassword}
            errorSubmit={this.state.errorSubmit}
            signup={register.signup}
          />
          <Reviews title={reviews.title} reviews={reviews.items} />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
