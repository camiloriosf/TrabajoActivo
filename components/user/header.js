// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Tabs, { Tab } from 'material-ui/Tabs';
// component imports
import HeaderMenu from './headerMenu';
import HeaderItem from './headerItem';

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
  menuExtended: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  image: {
    height: 30,
  },
  options: {

  },
});

class Header extends Component {
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
  render() {
    const {
      classes,
      header,
      options,
      index,
      onChangeHandler,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div className={classes.flex}>
              <img src="/static/images/bittersweet.png" alt="Bittersweet.io" className={classes.image} />
            </div>
            <div className={classes.menuExtended}>
              {this.renderItems()}
            </div>
            <div className={classes.menu}>
              <HeaderMenu
                items={this.props.header.menu}
                onClickHandler={this.props.onClickHandler}
              />
            </div>
          </Toolbar>
          {
            options && (
              <div className={classes.options}>
                <Tabs
                  value={index}
                  onChange={onChangeHandler}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                >
                  <Tab label={header.options.cvs} />
                  <Tab label={header.options.tests} />
                  <Tab label={header.options.videos} />
                </Tabs>
              </div>
            )
          }
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  options: PropTypes.bool,
  index: PropTypes.number,
  onChangeHandler: PropTypes.func,
};

Header.defaultProps = {
  options: false,
  index: 0,
  onChangeHandler: null,
};

export default withStyles(styles)(Header);
