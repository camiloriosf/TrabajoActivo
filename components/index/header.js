// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
// component imports
import HeaderMenu from './headerMenu';
import HeaderItem from './headerItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: theme.palette.common.transparent,
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.common.white,
      position: 'fixed',
    },
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
    },
  },
  flex: {
    flex: 1,
  },
  menuExtended: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  menu: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  image: {
    height: 30,
  },
});

class Header extends Component {
  renderCTA = () => {
    if (this.props.loggedIn) {
      return (
        <HeaderItem
          title={this.props.header.callToAction.title}
          link={this.props.header.callToAction.linkAuth}
          menu={this.props.header.callToAction.menu}
          menuItem={this.props.header.callToAction.menuAuth}
          onClickHandler={this.props.onClickHandler}
        />
      );
    }
    return (
      <HeaderItem
        title={this.props.header.callToAction.title}
        link={this.props.header.callToAction.linkNoAuth}
        menu={this.props.header.callToAction.menu}
        menuItem={this.props.header.callToAction.menuAuth}
        onClickHandler={this.props.onClickHandler}
      />
    );
  }
  renderItems = () => (
    this.props.header.menu.map(item => (
      <HeaderItem
        key={item.title}
        title={item.title}
        link={item.link}
        menu={item.menu}
        menuItem={item.menuItem}
        onClickHandler={this.props.onClickHandler}
      />
    ))
  )
  renderAccount = () => {
    if (this.props.loggedIn) {
      return (
        <HeaderItem
          title={this.props.header.account.title}
          link={this.props.header.account.link}
          menu={this.props.header.account.menu}
          menuItem={this.props.header.account.menuAuth}
          onClickHandler={this.props.onClickHandler}
        />
      );
    }
    return (
      <HeaderItem
        title={this.props.header.account.title}
        link={this.props.header.account.link}
        menu={this.props.header.account.menu}
        menuItem={this.props.header.account.menuNoAuth}
        onClickHandler={this.props.onClickHandler}
      />
    );
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <div className={classes.flex}>
              <img src="static/images/bittersweet.png" alt="Bittersweet.io" className={classes.image} />
            </div>
            <div className={classes.menuExtended}>
              {this.renderCTA()}
              {this.renderItems()}
              {this.renderAccount()}
            </div>
            <div className={classes.menu}>
              <HeaderMenu
                items={this.props.header}
                onClickHandler={this.props.onClickHandler}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
};

Header.defaultProps = {
  loggedIn: false,
};

export default withStyles(styles)(Header);
