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
import ResponsiveDialog from '../common/responsiveDialog';
import Header from './header';
import Signin from './signin';
import Reviews from './reviews';
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

class Login extends Component {
  state = {
    loading: false,
    errorEmail: '',
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
          loading: true, errorEmail: '', errorSubmit: '',
        });
        await app.auth().signInWithPopup(googleProvider);
      } else if (social === 'facebook') {
        this.setState({
          loading: true, errorEmail: '', errorSubmit: '',
        });
        await app.auth().signInWithPopup(facebookProvider);
      } else if (social === 'twitter') {
        this.setState({
          loading: true, errorEmail: '', errorSubmit: '',
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
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: this.props.t('errors.invalidEmail'), errorSubmit: '' });
      return;
    }
    this.setState({
      loading: true, errorEmail: '', errorSubmit: '',
    });

    try {
      const providers = await app.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        this.setState({ loading: false, errorSubmit: this.props.t('errors.noAccount') });
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
  onResetSubmit = async (email) => {
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: this.props.t('errors.invalidEmail'), errorSubmit: '' });
      return;
    }
    this.setState({
      loading: true, errorEmail: '', errorSubmit: '',
    });

    try {
      const providers = await app.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        this.setState({ loading: false, errorSubmit: this.props.t('errors.noAccount') });
      } else if (providers.indexOf('password') === -1) {
        this.setState({ loading: false, errorSubmit: this.props.t('errors.accountSocialExist') });
      } else {
        await app.auth().sendPasswordResetEmail(email);
        this.setState({
          loading: false, errorEmail: '', errorSubmit: '',
        });
        this.setState({
          open: true,
          title: this.props.t('dialogs.emailSent.title'),
          content: this.props.t('dialogs.emailSent.content'),
          accept: this.props.t('dialogs.emailSent.accept'),
        });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      this.setState({ loading: false, errorSubmit: this.props.t('errors.unknown') });
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
          title={t('login.header.title')}
          button={t('login.header.button')}
          link={t('login.header.link')}
          loading={this.state.loading}
        />
        <div className={classes.content}>
          <Signin
            handleFormSubmit={this.onFormSubmit}
            handleSocialLogin={this.onSocialLogin}
            loading={this.state.loading}
            errorEmail={this.state.errorEmail}
            errorSubmit={this.state.errorSubmit}
            handleResetSubmit={this.onResetSubmit}
          />
          <Reviews />
        </div>
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
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('auth')(withStyles(styles)(Login));
