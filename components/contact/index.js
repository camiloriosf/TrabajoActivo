// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import axios from 'axios';
import validator from 'validator';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Header from '../index/header';
import Footer from '../index/footer';
import ContactForm from './contactForm';
// local imports
import { app } from '../../lib/google/firebase';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
});

class Contact extends Component {
  state = {
    loggedIn: false,
    sending: false,
    status: 0,
    errorEmail: '',
    errorName: '',
    errorMessage: '',
  }
  componentDidMount = () => {
    this.mounted = true;
    app.auth().onAuthStateChanged((user) => {
      if (user && this.mounted) this.setState({ loggedIn: true });
    });
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      this.state.loggedIn !== nextState.loggedIn ||
      this.state.sending !== nextState.sending ||
      this.state.status !== nextState.status ||
      this.state.errorEmail !== nextState.errorEmail ||
      this.state.errorName !== nextState.errorName ||
      this.state.errorMessage !== nextState.errorMessage
    ) return true;
    return false;
  }
  componentWillUnmount = () => {
    this.mounted = false;
  }
  onSubmit = ({ name, email, message }) => async (event) => {
    event.preventDefault();
    this.setState({ errorName: '', errorEmail: '', errorMessage: '' });
    let error = false;
    if (name.length < 1) {
      this.setState({ errorName: this.props.t('contact.errors.name') });
      error = true;
    }
    if (!validator.isEmail(email.trim())) {
      this.setState({ errorEmail: this.props.t('contact.errors.email') });
      error = true;
    }
    if (message.length < 1) {
      this.setState({ errorMessage: this.props.t('contact.errors.message') });
      error = true;
    }
    if (error) return;

    this.setState({ sending: true, status: 1 });
    const response = await axios({
      method: 'post',
      url: 'https://us-central1-ecv-bittersweet-e17ad.cloudfunctions.net/createContactMessage',
      data: { name, email, message },
    });
    if (response.status === 200) {
      this.setState({ sending: false, status: 2 });
    } else {
      this.setState({ sending: false, status: 3 });
    }
  }
  render() {
    const {
      classes,
    } = this.props;
    const {
      sending,
      status,
      errorName,
      errorEmail,
      errorMessage,
    } = this.state;
    return (
      <div className={classes.root}>
        <Header loggedIn={this.state.loggedIn} absolute={false} />
        <ContactForm
          handleSubmit={this.onSubmit}
          sending={sending}
          status={status}
          errorName={errorName}
          errorEmail={errorEmail}
          errorMessage={errorMessage}
        />
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('index')(withStyles(styles)(Contact));
