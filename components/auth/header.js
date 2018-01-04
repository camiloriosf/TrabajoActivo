// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Link from 'next/link';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
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
    cursor: 'pointer',
  },
});

class Header extends Component {
  render() {
    const {
      classes,
      title,
      button,
      link,
      loading,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div className={classes.flex}>
              <Link href="/">
                <img src={t('header.image')} alt={t('header.alt')} className={classes.image} />
              </Link>
            </div>
            <HeaderButton
              title={title}
              button={button}
              link={link}
              loading={loading}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Header.defaultProps = {
  loading: false,
};

export default translate('auth')(withStyles(styles)(Header));
