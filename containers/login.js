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
import Signin from '../components/auth/signin';
import Reviews from '../components/auth/reviews';
import ActionDialog from '../components/common/actionDialog';
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

class Login extends Component {
  state = {
    loading: false,
    errorEmail: '',
    errorSubmit: '',
    dialogOpen: false,
  };
  handleDialogRequestClose = () => {
    this.setState({ dialogOpen: false });
  };
  handleFormSubmit = async ({ email, password }) => {
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: this.props.t('common:errors.invalidEmail'), errorSubmit: '' });
      return;
    }
    this.setState({
      loading: true, errorEmail: '', errorSubmit: '',
    });

    try {
      const providers = await app.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        this.setState({ loading: false, errorSubmit: this.props.t('common:errors.noAccount') });
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
  handleResetSubmit = async (email) => {
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: this.props.t('common:errors.invalidEmail'), errorSubmit: '' });
      return;
    }
    this.setState({
      loading: true, errorEmail: '', errorSubmit: '',
    });

    try {
      const providers = await app.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        this.setState({ loading: false, errorSubmit: this.props.t('common:errors.noAccount') });
      } else if (providers.indexOf('password') === -1) {
        this.setState({ loading: false, errorSubmit: this.props.t('common:errors.accountSocialExist') });
      } else {
        await app.auth().sendPasswordResetEmail(email);
        this.setState({
          loading: false, errorEmail: '', errorSubmit: '',
        });
        this.setState({ dialogOpen: true });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      this.setState({ loading: false, errorSubmit: this.props.t('common:errors.unknown') });
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
          title={t('auth:login.header.title')}
          button={t('auth:login.header.button')}
          link={t('auth:login.header.link')}
          loading={this.state.loading}
        />
        <div className={classes.content}>
          <Signin
            handleFormSubmit={this.handleFormSubmit}
            loading={this.state.loading}
            errorEmail={this.state.errorEmail}
            errorSubmit={this.state.errorSubmit}
            handleResetSubmit={this.handleResetSubmit}
          />
          <Reviews />
        </div>
        <ActionDialog
          open={this.state.dialogOpen}
          title={t('auth:login.dialog.title')}
          content={t('auth:login.dialog.content')}
          button={t('auth:login.dialog.button')}
          handleRequestClose={this.handleDialogRequestClose}
        />
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate(['auth', 'common'])(withStyles(styles)(Login));
