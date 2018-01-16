// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import Send from 'material-ui-icons/Send';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
  },
  paper: theme.mixins.gutters({
    padding: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  button: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  buttonProgress: {
    color: theme.palette.primary[500],
    marginLeft: theme.spacing.unit,
  },
});

class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    message: '',
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.status === 2) this.setState({ name: '', email: '', message: '' });
  }
  onChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      t,
      sending,
      status,
      errorName,
      errorEmail,
      errorMessage,
      handleSubmit,
    } = this.props;
    const {
      name,
      email,
      message,
    } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
          <Typography type="headline">
            {t('contact.title')}
          </Typography>
          <Typography type="body2">
            {t('contact.subtitle')}
          </Typography>
          <form onSubmit={handleSubmit({ name, email, message })} noValidate autoComplete="off">
            <FormControl fullWidth error={errorName !== ''} aria-describedby="name-error-text">
              <InputLabel htmlFor="name">{t('contact.fields.name')}</InputLabel>
              <Input id="name" value={this.state.name} onChange={this.onChange('name')} />
              <FormHelperText id="name-error-text">{errorName}</FormHelperText>
            </FormControl>
            <FormControl fullWidth error={errorEmail !== ''} aria-describedby="email-error-text">
              <InputLabel htmlFor="email">{t('contact.fields.email')}</InputLabel>
              <Input id="email" value={this.state.email} onChange={this.onChange('email')} />
              <FormHelperText id="email-error-text">{errorEmail}</FormHelperText>
            </FormControl>
            <FormControl fullWidth error={errorMessage !== ''} aria-describedby="message-error-text">
              <InputLabel htmlFor="message">{t('contact.fields.message')}</InputLabel>
              <Input multiline rows="4" id="message" value={this.state.message} onChange={this.onChange('message')} />
              <FormHelperText id="message-error-text">{errorMessage}</FormHelperText>
            </FormControl>
            <div className={classes.button}>
              <Button raised color="primary" type="submit" disabled={sending}>
                {status === 0 && t('contact.button')}
                {status === 1 && t('contact.buttonSending')}
                {status === 2 && t('contact.buttonOk')}
                {status === 3 && t('contact.buttonError')}
                {
                  sending
                  ? <CircularProgress size={30} className={classes.buttonProgress} />
                  : <Send className={classes.rightIcon} />
                }
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
  sending: PropTypes.bool,
  status: PropTypes.number,
  errorName: PropTypes.string,
  errorEmail: PropTypes.string,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

ContactForm.defaultProps = {
  sending: false,
  status: 0,
  errorName: '',
  errorEmail: '',
  errorMessage: '',
};

export default translate('index')(withStyles(styles)(ContactForm));
