// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class DeleteAccount extends Component {
  render() {
    const {
      fullScreen,
      open,
      handleClose,
      handleDeleteAccount,
      t,
    } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{t('dialogs.deleteAccount.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('dialogs.deleteAccount.content')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t('dialogs.deleteAccount.buttons.cancel')}
          </Button>
          <Button onClick={handleDeleteAccount} color="accent">
            {t('dialogs.deleteAccount.buttons.accept')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteAccount.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
};

DeleteAccount.defaultProps = {
  open: false,
};

export default translate('settings')(withMobileDialog()(DeleteAccount));
