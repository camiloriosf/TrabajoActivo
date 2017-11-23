// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import validator from 'validator';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Header from '../components/auth/header';
import Signup from '../components/auth/signup';
import Reviews from '../components/auth/reviews';
// local imports
import { app } from '../lib/google/firebase';

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
  handleFormSubmit = async ({ email, password }) => {
    let error = false;
    const hasNumber = /\d/;
    const hasAlpha = /[a-z]/i;
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: this.props.t('common:errors.invalidEmail') });
      error = true;
    }
    if (password.length < 8 || !hasAlpha.test(password) || !hasNumber.test(password)) {
      this.setState({ loading: false, errorPassword: this.props.t('common:errors.invalidPassword') });
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
        this.setState({ loading: false, errorSubmit: this.props.t('common:errors.accountSocialExist') });
      } else {
        await app.auth().signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      const {
        code,
      } = err;
      if (code === 'auth/wrong-password') this.setState({ loading: false, errorSubmit: this.props.t('common:errors.emailPassNoMatch') });
      else this.setState({ loading: false, errorSubmit: this.props.t('common:errors.unknown') });
    }
  }
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header
          title={t('auth:register.header.title')}
          button={t('auth:register.header.button')}
          link={t('auth:register.header.link')}
          loading={this.state.loading}
        />
        <div className={classes.content}>
          <Signup
            handleFormSubmit={this.handleFormSubmit}
            loading={this.state.loading}
            errorEmail={this.state.errorEmail}
            errorPassword={this.state.errorPassword}
            errorSubmit={this.state.errorSubmit}
          />
          <Reviews />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate(['auth', 'common'])(withStyles(styles)(Register));
