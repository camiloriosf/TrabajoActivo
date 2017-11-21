// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { FormHelperText } from 'material-ui/Form';

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
  termsButton: {
    fontSize: 12,
    padding: 0,
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
  render() {
    const {
      classes,
      loading,
      errorEmail,
      errorPassword,
      errorSubmit,
      handleClick,
      signup,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="headline">
          {signup.title}
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            type="email"
            disabled={loading}
            value={this.state.email}
            onChange={this.handleChange('email')}
            placeholder={signup.emailPlaceholder}
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
            placeholder={signup.passwordPlaceholder}
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
              {signup.button}
            </Button>
            {loading && <CircularProgress size={40} className={classes.buttonProgress} />}
          </div>
        </form>
        <Typography type="caption" className={classes.terms}>
          {signup.footer.text1}
        </Typography>
        <Typography type="caption" className={classes.terms}>
          <Button
            color="primary"
            disabled={loading}
            className={classes.termsButton}
            onClick={handleClick(signup.footer.link1)}
          >
            {signup.footer.button1}
          </Button>
          {signup.footer.text2}
          <Button
            color="primary"
            disabled={loading}
            className={classes.termsButton}
            onClick={handleClick(signup.footer.link2)}
          >
            {signup.footer.button2}
          </Button>
        </Typography>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errorEmail: PropTypes.string.isRequired,
  errorPassword: PropTypes.string.isRequired,
  errorSubmit: PropTypes.string.isRequired,
  signup: PropTypes.object.isRequired,
};

Signup.defaultProps = {
  loading: false,
};

export default withStyles(styles)(Signup);
