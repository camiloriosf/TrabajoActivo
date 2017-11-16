// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Hidden from 'material-ui/Hidden';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  typography: {
    marginRight: 20,
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class HeaderButton extends Component {
  render() {
    const {
      classes,
      title,
      button,
      link,
      handleClick,
      loading,
    } = this.props;
    return (
      <div className={classes.root}>
        <Hidden xsDown>
          <Typography type="body1" className={classes.typography} color="inherit">
            {title}
          </Typography>
        </Hidden>
        <div className={classes.wrapper}>
          <Button raised color="primary" disabled={loading} onClick={handleClick(link)}>
            {button}
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </div>
    );
  }
}

HeaderButton.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

HeaderButton.defaultProps = {
  loading: false,
};

export default withStyles(styles)(HeaderButton);
