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
      this.setState({ loading: false, errorEmail: 'Debes ingresar un correo válido.' });
      error = true;
    }
    if (password.length < 8 || !hasAlpha.test(password) || !hasNumber.test(password)) {
      this.setState({ loading: false, errorPassword: 'La contraseña debe contener al menos 8 caracteres, con al menos 1 numero y 1 letra.' });
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
        await app.auth().signInWithEmailAndPassword(email, password);
        Router.push('/user');
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
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header title="eCV" handleClick={this.handleHeaderClick} loading={this.state.loading} />
        <div className={classes.content}>
          <Signup
            handleFormSubmit={this.handleFormSubmit}
            handleClick={this.handleSignupClick}
            loading={this.state.loading}
            errorEmail={this.state.errorEmail}
            errorPassword={this.state.errorPassword}
            errorSubmit={this.state.errorSubmit}
          />
          <Reviews title="Reviews" reviews={reviews} />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
