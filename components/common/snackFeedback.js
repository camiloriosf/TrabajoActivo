// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import { CircularProgress } from 'material-ui/Progress';
import CheckCircleIcon from 'material-ui-icons/CheckCircle';
import ErrorIcon from 'material-ui-icons/Error';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
});

class SnackFeedback extends Component {
  renderAction = () => {
    if (this.props.saving) return <CircularProgress size={30} />;
    if (this.props.saved) return <CheckCircleIcon />;
    if (this.props.error) return <ErrorIcon />;
    return null;
  }
  render() {
    const {
      classes,
      key,
      text,
      open,
      autoHideDuration,
      onRequestClose,
    } = this.props;
    return (
      <div className={classes.root}>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={autoHideDuration}
          onRequestClose={onRequestClose}
          open={open}
          action={this.renderAction()}
          SnackbarContentProps={{
            'aria-describedby': key,
          }}
          message={<span id={key}>{text}</span>}
        />
      </div>
    );
  }
}

SnackFeedback.propTypes = {
  classes: PropTypes.object.isRequired,
  key: PropTypes.string,
  text: PropTypes.string.isRequired,
  open: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  onRequestClose: PropTypes.func,
  saving: PropTypes.bool,
  saved: PropTypes.bool,
  error: PropTypes.bool,
};

SnackFeedback.defaultProps = {
  key: 'snackFeedback',
  open: false,
  autoHideDuration: null,
  onRequestClose: null,
  saving: false,
  saved: false,
  error: false,
};

export default withStyles(styles)(SnackFeedback);
