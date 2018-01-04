// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Router from 'next/router';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import DoneIcon from 'material-ui-icons/Done';
import ClearIcon from 'material-ui-icons/Clear';
// component imports
import Header from '../common/header';
import SnackFeedback from '../common/snackFeedback';
import ChangePassword from './changePassword';
import DeleteAccount from './deleteAccount';
// local imports
import { getUserDataState } from '../../lib/reselect/user';
import { getSettingsUIState } from '../../lib/reselect/ui';
import {
  doChangeUserName,
  doChangeUserUserName,
  doChangeUserPassword,
  doDeleteAccount,
  doSaveUserNameToDB,
  doSaveUserUserNameToDB,
  doChangeSnack,
} from '../../lib/redux/actions/user';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  container: {
    padding: 100,
    [theme.breakpoints.down('lg')]: {
      padding: 80,
    },
    [theme.breakpoints.down('md')]: {
      padding: 40,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    },
  },
  head: {
    marginBottom: 50,
  },
  textField: {
    maxWidth: 600,
  },
  buttons: {
    maxWidth: 600,
  },
  button: {
    textAlign: 'right',
  },
});

class Index extends Component {
  state = {
    openChangePassword: false,
    openDeleteAccount: false,
  }
  componentDidMount = async () => {
    this.delayedNameSaving = _.debounce(this.props.doSaveUserNameToDB, 3000);
    this.delayedUserNameSaving = _.debounce(this.props.doSaveUserUserNameToDB, 3000);
  }
  onChangeName = (event) => {
    this.props.doChangeUserName({ name: event.target.value });
    this.delayedNameSaving();
  }
  onChangeUserName = (event) => {
    this.props.doChangeUserUserName({ username: event.target.value });
    this.delayedUserNameSaving();
  }
  onChangePassword = () => {
    this.setState({ openChangePassword: true });
  }
  onPasswordClose = () => {
    this.setState({ openChangePassword: false });
  }
  onPasswordChange = ({ oldPassword, newPassword }) => {
    this.setState({ openChangePassword: false });
    this.props.doChangeUserPassword({ oldPassword, newPassword });
  }
  onLogout = () => {
    Router.push('/logout');
  }
  onDeleteAccount = () => {
    this.setState({ openDeleteAccount: true });
  }
  onDeleteAccountClose = () => {
    this.setState({ openDeleteAccount: false });
  }
  onAccountDelete = () => {
    this.setState({ openDeleteAccount: false });
    this.props.doDeleteAccount();
  }
  onSnackFeedbackRequestClose = () => {
    this.props.doChangeSnack({
      openSnackLoading: false,
      openSnackSaving: false,
      openSnackSaved: false,
      openSnackError: false,
    });
  }
  render() {
    const {
      classes,
      t,
      user,
      ui,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header email={user.email} />
        <div className={classes.container}>
          <div className={classes.head}>
            <Typography type="headline" color="default" >
              {t('title')}
            </Typography>
          </div>
          <Grid container >
            <Grid item xs={12}>
              <TextField
                id="name"
                label={t('fields.name')}
                margin="normal"
                className={classes.textField}
                value={user.name ? user.name : ''}
                onChange={this.onChangeName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label={t('fields.email')}
                margin="normal"
                className={classes.textField}
                value={user.email}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.textField} error={ui.username === 2} >
                <InputLabel htmlFor="username">{t('fields.username')}</InputLabel>
                <Input
                  id="username"
                  value={user.username ? user.username : ''}
                  onChange={this.onChangeUserName}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      {ui.username === 1 && <CircularProgress size={30} />}
                      {ui.username === 2 && <ClearIcon color="accent" />}
                      {ui.username === 3 && <DoneIcon color="primary" />}
                    </InputAdornment>
                  }
                />
                {
                  ui.username === 2 && <FormHelperText>{t('fields.errors.usernameExists')}</FormHelperText>
                }
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttons}>
                <Grid container >
                  <Grid item xs={12} sm={4} className={classes.button} >
                    <Button raised color="primary" onClick={this.onChangePassword}>
                      {t('buttons.changePassword')}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.button}>
                    <Button raised color="primary" onClick={this.onLogout}>
                      {t('buttons.logout')}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.button}>
                    <Button color="accent" onClick={this.onDeleteAccount}>
                      {t('buttons.deleteAccount')}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <ChangePassword
            open={this.state.openChangePassword}
            handleClose={this.onPasswordClose}
            handlePasswordChange={this.onPasswordChange}
          />
          <DeleteAccount
            open={this.state.openDeleteAccount}
            handleClose={this.onDeleteAccountClose}
            handleDeleteAccount={this.onAccountDelete}
          />
          <SnackFeedback
            key="saving"
            open={ui.openSnackSaving}
            text={t('snackFeedback.saving')}
            saving
          />
          <SnackFeedback
            key="saved"
            open={ui.openSnackSaved}
            autoHideDuration={2000}
            onClose={this.onSnackFeedbackRequestClose}
            text={t('snackFeedback.saved')}
            saved
          />
          <SnackFeedback
            key="error"
            open={ui.openSnackError}
            autoHideDuration={2000}
            onClose={this.onSnackFeedbackRequestClose}
            text={t('snackFeedback.error')}
            error
          />
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: getUserDataState(state),
  ui: getSettingsUIState(state),
});

const mapDispatchToProps = dispatch => ({
  doChangeUserName: bindActionCreators(doChangeUserName, dispatch),
  doChangeUserUserName: bindActionCreators(doChangeUserUserName, dispatch),
  doChangeUserPassword: bindActionCreators(doChangeUserPassword, dispatch),
  doDeleteAccount: bindActionCreators(doDeleteAccount, dispatch),
  doSaveUserNameToDB: bindActionCreators(doSaveUserNameToDB, dispatch),
  doSaveUserUserNameToDB: bindActionCreators(doSaveUserUserNameToDB, dispatch),
  doChangeSnack: bindActionCreators(doChangeSnack, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('settings')(withStyles(styles)(Index)));
