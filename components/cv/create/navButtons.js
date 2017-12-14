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
    position: 'fixed',
    bottom: 0,
    left: 0,
    margin: theme.spacing.unit * 3,
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
          {
            !first && (
              <Button
                raised
                color="accent"
                dense
                className={classes.navLeft}
                onClick={onNavChange('left')}
              >
                <KeyboardArrowLeftIcon />
              </Button>
            )
          }
          {
            !last && (
              <Button
                raised
                color="accent"
                dense
                onClick={onNavChange('right')}
              >
                <KeyboardArrowRightIcon />
              </Button>
            )
          }
        </div>
        <Hidden mdUp>
          <div className={classes.menu}>
            <Button
              fab
              mini
              aria-label="sections"
              color="primary"
              onClick={onMenuClick}
            >
              <LayersIcon />
            </Button>
          </div>
        </Hidden>
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
