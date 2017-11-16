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
import ActionDialog from '../components/auth/actionDialog';
// error page
import Error from '../pages/_error';
// local imports
import { app } from '../lib/google/firebase';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.grey[700],
    minHeight: '100vh',
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

const reviews = [
  {
    quote: 'The documents from the Resume Creator are professional and allow candidates to stand out. The templates are clear and they help showcase the most important information.',
    author: 'Megan McBride',
    role: 'Office Assistant',
  },
  {
    quote: 'Uptowork\'s resume creator made my documents look much better. I am very happy with the template that I found, because it helped me make a professional resume.',
    author: 'Ashley Price',
    role: 'Office Assistant',
  },
  {
    quote: 'The online resume creator offers eye-catching templates, and the tips help you create an effective resume. I landed a number of internship interviews.',
    author: 'Angelica Roth',
    role: 'Student',
  },
];

class Reset extends Component {
  state = {
    loading: false,
    errorPassword: '',
    errorSubmit: '',
    errorPage: false,
    dialogOpen: false,
    dialogTitle: 'Contraseña restablecida',
    dialogContent: 'Hemos actualizado tu contraseña, ahora te redigiremos a la pagina de inicio de sesión.',
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
      this.setState({ loading: false, errorPassword: 'La contraseña debe contener al menos 8 caracteres, con al menos 1 numero y 1 letra.' });
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
      if (code === 'auth/invalid-action-code') this.setState({ loading: false, errorSubmit: 'El código para restablecer la contraseña ya no es válido, vuelve a solicitar restablecer la contraseña.' });
      else this.setState({ loading: false, errorSubmit: 'Algo salió mal, intentalo nuevamente.' });
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
        <Header title="eCV" handleClick={this.handleHeaderClick} loading={this.state.loading} />
        <div className={classes.content}>
          <ResetPassword
            handleFormSubmit={this.handleFormSubmit}
            loading={this.state.loading}
            errorPassword={this.state.errorPassword}
            errorSubmit={this.state.errorSubmit}
          />
          <Reviews title="Reviews" reviews={reviews} />
        </div>
        <ActionDialog
          open={this.state.dialogOpen}
          title={this.state.dialogTitle}
          content={this.state.dialogContent}
          button="aceptar"
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
