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
  textWhite: {
    color: theme.palette.common.darkWhite,
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
    color: theme.palette.secondary[100],
    textAlign: 'center',
    marginTop: 20,
    minWidth: 500,
  },
  terms: {
    color: theme.palette.common.darkWhite,
    fontSize: 12,
    marginTop: 10,
  },
  termsButton: {
    fontSize: 12,
    padding: 0,
  },
});

class Signin extends Component {
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
  handleReset = () => {
    this.props.handleResetSubmit(this.state.email.trim());
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
      errorSubmit,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="headline" className={classes.textWhite}>
          Sign in
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            type="email"
            disabled={loading}
            value={this.state.email}
            onChange={this.handleChange('email')}
            placeholder="Enter your e-mail address"
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
            placeholder="Enter your password"
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              },
            }}
          />
          {errorSubmit !== '' && <FormHelperText error className={classes.error}>{errorSubmit}</FormHelperText>}
          <div className={classes.wrapper}>
            <Button
              raised
              color="accent"
              type="submit"
              disabled={loading}
              className={classes.button}
            >
              create my resume
            </Button>
            {loading && <CircularProgress size={40} className={classes.buttonProgress} />}
          </div>
        </form>
        <Typography type="caption" className={classes.terms}>
          {'¿No recuerdas tu clave? '}
          <Button
            color="contrast"
            disabled={loading}
            className={classes.termsButton}
            onClick={this.handleReset}
          >
            Recuperar contraseña
          </Button>
        </Typography>
      </div>
    );
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errorEmail: PropTypes.string.isRequired,
  errorSubmit: PropTypes.string.isRequired,
  handleResetSubmit: PropTypes.func.isRequired,
};

Signin.defaultProps = {
  loading: false,
};

export default withStyles(styles)(Signin);
