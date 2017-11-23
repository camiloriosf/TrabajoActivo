// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Header from '../components/auth/header';
import ResetPassword from '../components/auth/reset';
import Reviews from '../components/auth/reviews';
import ActionDialog from '../components/common/actionDialog';
// error page
import Error from '../pages/_error';
// local imports
import { app } from '../lib/google/firebase';

const styles = theme => ({
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


class Reset extends Component {
  state = {
    loading: false,
    errorPassword: '',
    errorSubmit: '',
    errorPage: false,
    dialogOpen: false,
  };
  componentWillMount = () => {
    const {
      apiKey,
      oobCode,
    } = this.props.url.query;
    if (!apiKey || !oobCode) this.setState({ errorPage: true });
  }
  handleHeaderClick = link => () => {
    Router.push(link);
  }
  handleDialogRequestClose = () => {
    Router.push('/login');
  };
  handleFormSubmit = async ({ password }) => {
    const hasNumber = /\d/;
    const hasAlpha = /[a-z]/i;
    if (password.length < 8 || !hasAlpha.test(password) || !hasNumber.test(password)) {
      this.setState({ loading: false, errorPassword: this.props.t('common:errors.invalidPassword') });
      return;
    }
    this.setState({
      loading: true, errorPassword: '', errorSubmit: '',
    });

    try {
      await app.auth().checkActionCode(this.props.url.query.oobCode);
      await app.auth().confirmPasswordReset(this.props.url.query.oobCode, password);
      this.setState({ dialogOpen: true });
    } catch (err) {
      const {
        code,
      } = err;
      if (code === 'auth/invalid-action-code') this.setState({ loading: false, errorSubmit: this.props.t('common:errors.badResetCode') });
      else this.setState({ loading: false, errorSubmit: this.props.t('common:errors.unknown') });
    }
  }
  render() {
    const {
      classes,
      t,
    } = this.props;

    if (this.state.errorPage) {
      return <Error />;
    }
    return (
      <div className={classes.root}>
        <Header
          title={t('auth:reset.header.title')}
          button={t('auth:reset.header.button')}
          link={t('auth:reset.header.link')}
          loading={this.state.loading}
        />
        <div className={classes.content}>
          <ResetPassword
            handleFormSubmit={this.handleFormSubmit}
            loading={this.state.loading}
            errorPassword={this.state.errorPassword}
            errorSubmit={this.state.errorSubmit}
          />
          <Reviews />
        </div>
        <ActionDialog
          open={this.state.dialogOpen}
          title={t('auth:reset.dialog.title')}
          content={t('auth:reset.dialog.content')}
          button={t('auth:reset.dialog.button')}
          handleRequestClose={this.handleDialogRequestClose}
        />
      </div>
    );
  }
}

Reset.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
};

export default translate(['auth', 'common'])(withStyles(styles)(Reset));
