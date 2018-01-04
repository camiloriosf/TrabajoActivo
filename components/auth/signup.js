/* eslint-disable jsx-a11y/anchor-is-valid */
// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Router from 'next/router';
import Link from 'next/link';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { FormHelperText } from 'material-ui/Form';
// component imports
import Social from './social';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    maxWidth: 500,
    textAlign: 'center',
    padding: 40,
    flexGrow: 1,
    flexBasis: 0,
    [theme.breakpoints.down('md')]: {
      paddingBottom: 10,
    },
  },
  textFieldRoot: {
    padding: 0,
    marginTop: 20,
  },
  textFieldInput: {
    borderRadius: 4,
    background: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '15px 12px',
  },
  button: {
    width: '100%',
    marginTop: 20,
    padding: 10,
    fontSize: 20,
  },
  terms: {
    fontSize: 12,
    marginTop: 10,
  },
  anchor: {
    color: theme.palette.primary[500],
    textDecoration: 'none',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -20,
  },
  error: {
    color: theme.palette.secondary[500],
    textAlign: 'center',
    marginTop: 20,
    minWidth: 500,
  },
});

class Signup extends Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    this.props.handleFormSubmit({ email, password });
  }
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleClick = link => () => {
    Router.push(link);
  }
  render() {
    const {
      classes,
      loading,
      errorEmail,
      errorPassword,
      errorSubmit,
      handleSocialLogin,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="headline">
          {t('register.signup.title')}
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            type="email"
            disabled={loading}
            value={this.state.email}
            onChange={this.handleChange('email')}
            placeholder={t('register.signup.emailPlaceholder')}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              },
            }}
          />
          {errorEmail !== '' && <FormHelperText error className={classes.error}>{errorEmail}</FormHelperText>}
          <TextField
            fullWidth
            id="password"
            type="password"
            disabled={loading}
            value={this.state.password}
            onChange={this.handleChange('password')}
            placeholder={t('register.signup.passwordPlaceholder')}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              },
            }}
          />
          {errorPassword !== '' && <FormHelperText error className={classes.error}>{errorPassword}</FormHelperText>}
          {errorSubmit !== '' && <FormHelperText error className={classes.error}>{errorSubmit}</FormHelperText>}
          <div className={classes.wrapper}>
            <Button
              raised
              color="accent"
              type="submit"
              disabled={loading}
              className={classes.button}
            >
              {t('register.signup.button')}
            </Button>
            {loading && <CircularProgress size={40} className={classes.buttonProgress} />}
          </div>
        </form>
        <Typography type="caption" className={classes.terms}>
          {t('register.signup.footer.text1')}
          <Link href={t('register.signup.footer.link1')}>
            <a className={classes.anchor}>{t('register.signup.footer.button1')}</a>
          </Link>
          {t('register.signup.footer.text2')}
          <Link href={t('register.signup.footer.link2')}>
            <a className={classes.anchor}>{t('register.signup.footer.button2')}</a>
          </Link>
        </Typography>
        <Social
          loading={loading}
          handleSocialLogin={handleSocialLogin}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSocialLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errorEmail: PropTypes.string.isRequired,
  errorPassword: PropTypes.string.isRequired,
  errorSubmit: PropTypes.string.isRequired,
};

Signup.defaultProps = {
  loading: false,
};

export default translate('auth')(withStyles(styles)(Signup));
