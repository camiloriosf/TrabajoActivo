// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import validator from 'validator';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
// component imports
import Header from './header';
import Signup from './signup';
import Reviews from './reviews';
import ResponsiveDialog from '../common/responsiveDialog';
// local imports
import { app, googleProvider, facebookProvider, twitterProvider } from '../../lib/google/firebase';

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
    title: '',
    content: '',
    accept: '',
    open: false,
  };
  onSocialLogin = social => async () => {
    try {
      if (social === 'google') {
        this.setState({
          loading: true, errorEmail: '', errorPassword: '', errorSubmit: '',
        });
        await app.auth().signInWithPopup(googleProvider);
      } else if (social === 'facebook') {
        this.setState({
          loading: true, errorEmail: '', errorPassword: '', errorSubmit: '',
        });
        await app.auth().signInWithPopup(facebookProvider);
      } else if (social === 'twitter') {
        this.setState({
          loading: true, errorEmail: '', errorPassword: '', errorSubmit: '',
        });
        await app.auth().signInWithPopup(twitterProvider);
      }
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        this.setState({
          open: true,
          title: this.props.t('dialogs.accountExists.title'),
          content: this.props.t('dialogs.accountExists.content'),
          accept: this.props.t('dialogs.accountExists.accept'),
        });
      }
      if (error.code === 'auth/user-disabled') {
        this.setState({
          open: true,
          title: this.props.t('dialogs.userDisabled.title'),
          content: this.props.t('dialogs.userDisabled.content'),
          accept: this.props.t('dialogs.userDisabled.accept'),
        });
      }
      this.setState({
        loading: false,
      });
    }
  }
  onFormSubmit = async ({ email, password }) => {
    let error = false;
    const hasNumber = /\d/;
    const hasAlpha = /[a-z]/i;
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: this.props.t('errors.invalidEmail') });
      error = true;
    }
    if (password.length < 8 || !hasAlpha.test(password) || !hasNumber.test(password)) {
      this.setState({ loading: false, errorPassword: this.props.t('errors.invalidPassword') });
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
        if (providers.indexOf('google.com') > -1) {
          this.setState({ loading: false, errorSubmit: `${this.props.t('errors.accountSocialExist')}Google` });
        } else if (providers.indexOf('facebook.com') > -1) {
          this.setState({ loading: false, errorSubmit: `${this.props.t('errors.accountSocialExist')}Facebook` });
        } else if (providers.indexOf('twitter.com') > -1) {
          this.setState({ loading: false, errorSubmit: `${this.props.t('errors.accountSocialExist')}Twitter` });
        } else if (providers.indexOf('linkedin.com') > -1) {
          this.setState({ loading: false, errorSubmit: `${this.props.t('errors.accountSocialExist')}Twitter` });
        } else {
          this.setState({ loading: false, errorSubmit: `${this.props.t('errors.accountSocialExist')}` });
        }
      } else {
        await app.auth().signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      const {
        code,
      } = err;
      if (code === 'auth/wrong-password') this.setState({ loading: false, errorSubmit: this.props.t('errors.emailPassNoMatch') });
      else this.setState({ loading: false, errorSubmit: this.props.t('errors.unknown') });
    }
  }
  onResponsiveDialogClose = () => {
    this.setState({ open: false });
  }
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header
          title={t('register.header.title')}
          button={t('register.header.button')}
          link={t('register.header.link')}
          loading={this.state.loading}
        />
        <div className={classes.content}>
          <Signup
            handleFormSubmit={this.onFormSubmit}
            handleSocialLogin={this.onSocialLogin}
            loading={this.state.loading}
            errorEmail={this.state.errorEmail}
            errorPassword={this.state.errorPassword}
            errorSubmit={this.state.errorSubmit}
          />
          <Reviews />
          <ResponsiveDialog
            open={this.state.open}
            handleClose={this.onResponsiveDialogClose}
            handleAccept={this.onResponsiveDialogClose}
            title={this.state.title}
            content={
              <div>
                <Typography type="subheading">{this.state.content}</Typography>
              </div>
          }
            accept={this.state.accept}
          />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('auth')(withStyles(styles)(Register));
