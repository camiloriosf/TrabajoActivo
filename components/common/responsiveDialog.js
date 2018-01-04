// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class ResponsiveDialog extends Component {
  render() {
    const {
      open,
      fullScreen,
      handleClose,
      handleAccept,
      title,
      content,
      cancel,
      accept,
    } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          {
            cancel !== '' && <Button onClick={handleClose} raised color="accent" autoFocus>{cancel}</Button>
          }
          {
            accept !== '' && <Button onClick={handleAccept} color="primary">{accept}</Button>
          }
        </DialogActions>
      </Dialog>
    );
  }
}

ResponsiveDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func,
  title: PropTypes.any.isRequired,
  content: PropTypes.any.isRequired,
  accept: PropTypes.any,
  cancel: PropTypes.any,
};

ResponsiveDialog.defaultProps = {
  open: false,
  handleAccept: () => null,
  accept: '',
  cancel: '',
};

export default withMobileDialog()(ResponsiveDialog);
