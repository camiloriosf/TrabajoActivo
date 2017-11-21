// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
// component imports
import HeaderButton from './headerButton';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: theme.palette.common.white,
  },
  flex: {
    flex: 1,
  },
  image: {
    height: 30,
  },
});

class Header extends Component {
  renderButtons = () => {
    if (this.props.loggedIn) {
      return (
        <Button raised color="primary" onClick={this.props.handleClick(this.props.header.account.link)}>
          {this.props.header.account.button}
        </Button>
      );
    }
    return (
      <HeaderButton
        loading={this.props.loading}
        title={this.props.header.button.title}
        button={this.props.header.button.button}
        link={this.props.header.button.link}
        handleClick={this.props.handleClick}
      />
    );
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div className={classes.flex}>
              <img src="static/images/bittersweet.png" alt="Bittersweet.io" className={classes.image} />
            </div>
            {this.renderButtons()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Header.defaultProps = {
  loggedIn: false,
  loading: false,
};

export default withStyles(styles)(Header);
