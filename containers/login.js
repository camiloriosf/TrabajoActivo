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
import ActionDialog from '../components/auth/actionDialog';
// local imports
import { app } from '../lib/google/firebase';

const styles = theme => ({ // eslint-disable-line no-unused-vars
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

class Login extends Component {
  state = {
    loading: false,
    errorEmail: '',
    errorSubmit: '',
    dialogOpen: false,
    dialogTitle: 'Correo enviado',
    dialogContent: 'Te hemos enviado un correo para que restablezcas tu contraseña.',
  };
  handleHeaderClick = link => () => {
    Router.push(link);
  }
  handleDialogRequestClose = () => {
    this.setState({ dialogOpen: false });
  };
  handleFormSubmit = async ({ email, password }) => {
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: 'Debes ingresar un correo válido.', errorSubmit: '' });
      return;
    }
    this.setState({
      loading: true, errorEmail: '', errorSubmit: '',
    });

    try {
      const providers = await app.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        this.setState({ loading: false, errorSubmit: 'No existe una cuenta asociada a este correo.' });
      } else if (providers.indexOf('password') === -1) {
        this.setState({ loading: false, errorSubmit: 'Ya existe una cuenta asociada a este correo, intenta ingresando por Facebook o Google' });
      } else {
        await app.auth().signInWithEmailAndPassword(email, password);
        Router.push('/user');
      }
    } catch (err) {
      const {
        code,
      } = err;
      if (code === 'auth/wrong-password') this.setState({ loading: false, errorSubmit: 'La contraseña y el usuario no coinciden, verifica tu clave e intentalo nuevamente.' });
      else this.setState({ loading: false, errorSubmit: 'Algo salió mal, intentalo nuevamente.' });
    }
  }
  handleResetSubmit = async (email) => {
    if (!validator.isEmail(email)) {
      this.setState({ loading: false, errorEmail: 'Debes ingresar un correo válido.', errorSubmit: '' });
      return;
    }
    this.setState({
      loading: true, errorEmail: '', errorSubmit: '',
    });

    try {
      const providers = await app.auth().fetchProvidersForEmail(email);
      if (providers.length === 0) {
        this.setState({ loading: false, errorSubmit: 'No existe una cuenta asociada a este correo.' });
      } else if (providers.indexOf('password') === -1) {
        this.setState({ loading: false, errorSubmit: 'Existe una cuenta Social asociada a este correo, intenta ingresando por Facebook o Google' });
      } else {
        await app.auth().sendPasswordResetEmail(email);
        this.setState({
          loading: false, errorEmail: '', errorSubmit: '',
        });
        this.setState({ dialogOpen: true });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      this.setState({ loading: false, errorSubmit: 'Algo salió mal, intentalo nuevamente.' });
    }
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header title="eCV" handleClick={this.handleHeaderClick} loading={this.state.loading} register={false} />
        <div className={classes.content}>
          <Signin
            handleFormSubmit={this.handleFormSubmit}
            loading={this.state.loading}
            errorEmail={this.state.errorEmail}
            errorSubmit={this.state.errorSubmit}
            handleResetSubmit={this.handleResetSubmit}
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
