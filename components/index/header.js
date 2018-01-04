// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Link from 'next/link';
import classnames from 'classnames';
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
  },
  appBarFixed: {
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.common.white,
      position: 'fixed',
    },
  },
  appBarNoShadow: {
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
    },
  },
  appBarStatic: {
    backgroundColor: theme.palette.primary[500],
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
    cursor: 'pointer',
  },
});

class Header extends Component {
  state = {
    ctaLink: this.props.t('header.callToAction.linkNoAuth'),
    accountItems: [
      {
        title: this.props.t('header.account.menuNoAuth.0.title'),
        link: this.props.t('header.account.menuNoAuth.0.link'),
      },
      {
        title: this.props.t('header.account.menuNoAuth.1.title'),
        link: this.props.t('header.account.menuNoAuth.1.link'),
      },
    ],
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.loggedIn) {
      this.setState({
        ctaLink: this.props.t('header.callToAction.linkAuth'),
        accountItems: [
          {
            title: this.props.t('header.account.menuAuth.0.title'),
            link: this.props.t('header.account.menuAuth.0.link'),
            divider: true,
          },
          // {
          //   title: this.props.t('header.account.menuAuth.1.title'),
          //   link: this.props.t('header.account.menuAuth.1.link'),
          // },
          // {
          //   title: this.props.t('header.account.menuAuth.2.title'),
          //   link: this.props.t('header.account.menuAuth.2.link'),
          //   divider: true,
          // },
          {
            title: this.props.t('header.account.menuAuth.3.title'),
            link: this.props.t('header.account.menuAuth.3.link'),
          },
          {
            title: this.props.t('header.account.menuAuth.4.title'),
            link: this.props.t('header.account.menuAuth.4.link'),
          },
        ],
      });
    }
  }
  shouldComponentUpdate = (nextProps) => {
    if (this.props.loggedIn !== nextProps.loggedIn) {
      console.log('update index/header');
      return true;
    }
    return false;
  }
  renderItems = () => ([
    <HeaderItem
      key={this.props.t('header.callToAction.linkAuth')}
      title={this.props.t('header.callToAction.title')}
      link={this.state.ctaLink}
    />,
    // <HeaderItem
    //   key={this.props.t('header.blog.link')}
    //   title={this.props.t('header.blog.title')}
    //   link={this.props.t('header.blog.link')}
    //   menu
    //   menuItem={[
    //     {
    //       title: this.props.t('header.blog.menuItem.0.title'),
    //       link: this.props.t('header.blog.menuItem.0.link'),
    //       divider: true,
    //     },
    //     {
    //       title: this.props.t('header.blog.menuItem.1.title'),
    //       link: this.props.t('header.blog.menuItem.1.link'),
    //     },
    //     {
    //       title: this.props.t('header.blog.menuItem.2.title'),
    //       link: this.props.t('header.blog.menuItem.2.link'),
    //     },
    //     {
    //       title: this.props.t('header.blog.menuItem.3.title'),
    //       link: this.props.t('header.blog.menuItem.3.link'),
    //     },
    //     {
    //       title: this.props.t('header.blog.menuItem.4.title'),
    //       link: this.props.t('header.blog.menuItem.4.link'),
    //     },
    //   ]}
    // />,
    // <HeaderItem
    //   key={this.props.t('header.pricing.link')}
    //   title={this.props.t('header.pricing.title')}
    //   link={this.props.t('header.pricing.link')}
    // />,
    // <HeaderItem
    //   key={this.props.t('header.about.link')}
    //   title={this.props.t('header.about.title')}
    //   link={this.props.t('header.about.link')}
    // />,
    <HeaderItem
      key={this.props.t('header.contact.link')}
      title={this.props.t('header.contact.title')}
      link={this.props.t('header.contact.link')}
    />,
  ]);
  renderAccount = () => (
    <HeaderItem
      title={this.props.t('header.account.title')}
      link={this.props.t('header.account.link')}
      menu
      menuItem={this.state.accountItems}
    />
  )
  render() {
    const {
      classes,
      t,
      absolute,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position={!absolute ? 'static' : 'absolute'}
          className={classnames(
            classes.appBar,
            absolute && classes.appBarNoShadow,
            absolute && classes.appBarFixed,
            !absolute && classes.appBarStatic,
          )}
        >
          <Toolbar>
            <div className={classes.flex}>
              <Link href="/">
                <img src={t('header.image.link')} alt={t('header.image.alt')} className={classes.image} />
              </Link>
            </div>
            <div className={classes.menuExtended}>
              {this.renderItems()}
              {this.renderAccount()}
            </div>
            <div className={classes.menu}>
              <HeaderMenu
                items={[
                  {
                    title: this.props.t('header.callToAction.title'),
                    link: this.state.ctaLink,
                  },
                  // {
                  //   title: this.props.t('header.blog.title'),
                  //   link: this.props.t('header.blog.link'),
                  // },
                  // {
                  //   title: this.props.t('header.pricing.title'),
                  //   link: this.props.t('header.pricing.link'),
                  // },
                  // {
                  //   title: this.props.t('header.about.title'),
                  //   link: this.props.t('header.about.link'),
                  // },
                  {
                    title: this.props.t('header.contact.title'),
                    link: this.props.t('header.contact.link'),
                    divider: true,
                  },
                  {
                    title: this.props.t('header.account.title'),
                    link: this.props.t('header.account.link'),
                  },
                ]}
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
  loggedIn: PropTypes.bool,
  absolute: PropTypes.bool,
};

Header.defaultProps = {
  loggedIn: false,
  absolute: true,
};

export default translate('index')(withStyles(styles)(Header));
