// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import LayersIcon from 'material-ui-icons/Layers';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
  },
  nav: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing.unit * 3,
  },
  navLeft: {
    marginRight: theme.spacing.unit * 3,
  },
  menu: {
    marginRight: theme.spacing.unit * 3,
  },
});

class NavButtons extends Component {
  render() {
    const {
      classes,
      first,
      last,
      onNavChange,
      onMenuClick,
    } = this.props;
    return (
      <div>
        <div className={classes.nav}>
          <Hidden mdUp>
            <Button
              fab
              mini
              aria-label="sections"
              color="primary"
              className={classes.menu}
              onClick={onMenuClick}
            >
              <LayersIcon />
            </Button>
          </Hidden>
          <Button
            raised
            color="accent"
            dense
            className={classes.navLeft}
            disabled={first}
            onClick={onNavChange('left')}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <Button
            raised
            color="accent"
            dense
            disabled={last}
            onClick={onNavChange('right')}
          >
            <KeyboardArrowRightIcon />
          </Button>
        </div>
      </div>
    );
  }
}

NavButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  onNavChange: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

NavButtons.defaultProps = {
  first: false,
  last: false,
};

export default withStyles(styles)(NavButtons);
