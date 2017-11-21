// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
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
import { reset, reviews, errors } from '../lang/es.json';

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
    dialogTitle: reset.dialog.title,
    dialogContent: reset.dialog.content,
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
      this.setState({ loading: false, errorPassword: errors.invalidPassword });
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
      if (code === 'auth/invalid-action-code') this.setState({ loading: false, errorSubmit: errors.badResetCode });
      else this.setState({ loading: false, errorSubmit: errors.unknown });
    }
  }
  render() {
    const {
      classes,
    } = this.props;

    if (this.state.errorPage) {
      return <Error />;
    }
    return (
      <div className={classes.root}>
        <Header
          header={reset.header}
          handleClick={this.handleHeaderClick}
          loading={this.state.loading}
        />
        <div className={classes.content}>
          <ResetPassword
            handleFormSubmit={this.handleFormSubmit}
            loading={this.state.loading}
            errorPassword={this.state.errorPassword}
            errorSubmit={this.state.errorSubmit}
            reset={reset.reset}
          />
          <Reviews title={reviews.title} reviews={reviews.items} />
        </div>
        <ActionDialog
          open={this.state.dialogOpen}
          title={this.state.dialogTitle}
          content={this.state.dialogContent}
          button={reset.dialog.button}
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

export default withStyles(styles)(Reset);
