// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
import { translate } from 'react-i18next';
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
  handleChange = (event, value) => {
    switch (value) {
      case 0:
        Router.push('/user/cv');
        break;
      case 1:
        Router.push('/user/tests');
        break;
      case 2:
        Router.push('/user/coaching');
        break;
      default:
        break;
    }
  };
  renderItems = () => ([
    <HeaderItem
      key="pricing"
      title={this.props.t('header.menu.0.title')}
      link={this.props.t('header.menu.0.link')}
    />,
    <HeaderItem
      key="help"
      title={this.props.t('header.menu.1.title')}
      link={this.props.t('header.menu.1.link')}
      menu
      menuItem={[
        {
          title: this.props.t('header.menu.1.menuItem.0.title'),
          link: this.props.t('header.menu.1.menuItem.0.link'),
        },
        {
          title: this.props.t('header.menu.1.menuItem.1.title'),
          link: this.props.t('header.menu.1.menuItem.1.link'),
        },
      ]}
    />,
    <HeaderItem
      key="account"
      title={this.props.t('header.menu.2.title')}
      link={this.props.t('header.menu.2.link')}
      menu
      menuItem={[
        {
          title: this.props.t('header.menu.2.menuItem.0.title'),
          link: this.props.t('header.menu.2.menuItem.0.link'),
        },
        {
          title: this.props.t('header.menu.2.menuItem.1.title'),
          link: this.props.t('header.menu.2.menuItem.1.link'),
        },
        {
          title: this.props.t('header.menu.2.menuItem.2.title'),
          link: this.props.t('header.menu.2.menuItem.2.link'),
          divider: true,
        },
        {
          title: this.props.t('header.menu.2.menuItem.3.title'),
          link: this.props.t('header.menu.2.menuItem.3.link'),
        },
        {
          title: this.props.t('header.menu.2.menuItem.4.title'),
          link: this.props.t('header.menu.2.menuItem.4.link'),
        },
      ]}
    />,
  ])
  render() {
    const {
      classes,
      options,
      index,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div className={classes.flex}>
              <img src={t('header.image.link')} alt={t('header.image.alt')} className={classes.image} />
            </div>
            <div className={classes.menuExtended}>
              {this.renderItems()}
            </div>
            <div className={classes.menu}>
              <HeaderMenu
                items={[
                  {
                    title: this.props.t('header.menu.0.title'),
                    link: this.props.t('header.menu.0.link'),
                  },
                  {
                    title: this.props.t('header.menu.1.title'),
                    link: this.props.t('header.menu.1.link'),
                  },
                  {
                    title: this.props.t('header.menu.2.title'),
                    link: this.props.t('header.menu.2.link'),
                  },
                ]}
              />
            </div>
          </Toolbar>
          {
            options && (
              <div className={classes.options}>
                <Tabs
                  value={index}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                >
                  <Tab label={t('header.options.cv')} />
                  <Tab label={t('header.options.test')} />
                  <Tab label={t('header.options.coaching')} />
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
  options: PropTypes.bool,
  index: PropTypes.number,
};

Header.defaultProps = {
  options: false,
  index: 0,
};

export default translate('user')(withStyles(styles)(Header));
