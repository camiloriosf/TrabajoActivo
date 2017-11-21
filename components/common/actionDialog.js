// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class ActionDialog extends Component {
  render() {
    const {
      open,
      title,
      content,
      button,
      handleRequestClose,
    } = this.props;
    return (
      <Dialog
        open={open}
        onRequestClose={handleRequestClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary" autoFocus>
            {button}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ActionDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

ActionDialog.defaultProps = {
  open: false,
};

export default withMobileDialog()(ActionDialog);
