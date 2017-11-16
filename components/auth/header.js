// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
// component imports
import HeaderButton from './headerButton';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: theme.palette.common.faintBlack,
    boxShadow: 'none',
  },
  flex: {
    flex: 1,
  },
});

class Header extends Component {
  renderButtons = () => {
    if (this.props.loggedIn) {
      return 'My account';
    } else if (this.props.register) {
      return (
        <HeaderButton
          loading={this.props.loading}
          title="Already have an account?"
          button="Log in now"
          link="/login"
          handleClick={this.props.handleClick}
        />
      );
    }
    return (
      <HeaderButton
        loading={this.props.loading}
        title="Need an account?"
        button="Sign up"
        link="/register"
        handleClick={this.props.handleClick}
      />
    );
  }
  render() {
    const {
      classes,
      title,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography type="title" className={classes.flex} color="inherit">
              {title}
            </Typography>
            {this.renderButtons()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool,
  register: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Header.defaultProps = {
  loggedIn: false,
  register: true,
  loading: false,
};

export default withStyles(styles)(Header);
