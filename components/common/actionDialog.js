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
  handleRequestClose = () => {
    this.props.doShowActionDialog({ open: false });
  }
  render() {
    const {
      title,
      content,
      button,
      open,
      handleRequestClose,
    } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleRequestClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary" autoFocus>
            {button}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ActionDialog.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  open: PropTypes.bool,
  handleRequestClose: PropTypes.func.isRequired,
};

ActionDialog.defaultProps = {
  open: false,
};

export default withMobileDialog()(ActionDialog);
