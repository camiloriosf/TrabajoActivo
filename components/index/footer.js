// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
// component imports
import FooterItem from './footerItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.darkBlack,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
    color: theme.palette.common.darkWhite,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  menu: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
});

class Footer extends Component {
  render() {
    const {
      classes,
      text,
      items,
      handleClick,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="subheading" className={classes.flex} color="inherit">
          {text}
        </Typography>
        <div className={classes.menu}>
          {
            items.map(item => (
              <FooterItem
                key={item.link}
                handleClick={handleClick}
                link={item.link}
                text={item.text}
                divider={item.divider}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Footer);
