// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 10,
    padding: 10,
  },
  typography: {
    color: theme.palette.common.darkWhite,
  },
  divider: {

  },
});

class FooterItem extends Component {
  render() {
    const {
      classes,
      handleClick,
      link,
      text,
      divider,
    } = this.props;
    return (
      <div className={classes.root}>
        <ButtonBase
          key="footerButton"
          focusRipple
          className={classes.button}
          onClick={handleClick(link)}
        >
          <Typography type="body1" color="inherit" className={classes.typography} >
            {text}
          </Typography>
        </ButtonBase>
        {divider && <Typography type="body1" color="inherit" className={classes.typography} >|</Typography>}
      </div>
    );
  }
}

FooterItem.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  divider: PropTypes.bool,
};

FooterItem.defaultProps = {
  divider: false,
};

export default withStyles(styles)(FooterItem);
