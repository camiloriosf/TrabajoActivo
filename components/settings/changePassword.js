// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    validOld: false,
    validNew: false,
    errorText: '',
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const oldPassword = this.state.oldPassword.trim();
    const newPassword = this.state.newPassword.trim();
    this.props.handlePasswordChange({ oldPassword, newPassword });
  }
  handleOldPasswordChange = (event) => {
    this.setState({ oldPassword: event.target.value });
    if (event.target.value.length > 0) this.setState({ validOld: true });
    else this.setState({ validOld: false });
  };
  handleNewPasswordChange = (event) => {
    this.setState({ newPassword: event.target.value });
    const hasNumber = /\d/;
    const hasAlpha = /[a-z]/i;
    if (
      event.target.value.length < 8 ||
      !hasAlpha.test(event.target.value) ||
      !hasNumber.test(event.target.value)
    ) {
      this.setState({
        errorText: this.props.t('dialogs.changePassword.errorText'),
        validNew: false,
      });
    } else {
      this.setState({ errorText: '', validNew: true });
    }
  }
  handleClose = () => {
    this.setState({
      oldPassword: '',
      newPassword: '',
      errorText: '',
      validOld: false,
      validNew: false,
    });
    this.props.handleClose();
  }
  render() {
    const {
      open,
      fullScreen,
      t,
    } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="changePasswordDialog"
      >
        <DialogTitle id="changePasswordDialog">{t('dialogs.changePassword.title')}</DialogTitle>
        <form noValidate onSubmit={this.handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="oldPassword"
              type="password"
              label={t('dialogs.changePassword.fields.oldPassword.label')}
              onChange={this.handleOldPasswordChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="newPassword"
              type="password"
              label={t('dialogs.changePassword.fields.newPassword.label')}
              error={this.state.errorText !== ''}
              helperText={this.state.errorText}
              onChange={this.handleNewPasswordChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="accent">
              {t('dialogs.changePassword.buttons.cancel')}
            </Button>
            <Button color="primary" type="submit" disabled={!this.state.validOld || !this.state.validNew}>
              {t('dialogs.changePassword.buttons.accept')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

ChangePassword.propTypes = {
  open: PropTypes.bool,
  fullScreen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};

ChangePassword.defaultProps = {
  open: false,
};

export default translate('settings')(withMobileDialog()(ChangePassword));
