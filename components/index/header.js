// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import withWidth from 'material-ui/utils/withWidth';
import HeaderMenu from './headerMenu';
import HeaderItem from './headerItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: theme.palette.common.transparent,
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.primary[500],
    },
  },
  flex: {
    flex: 1,
  },
});

class Header extends Component {
  renderItems = () => {
    if (this.props.width === 'sm' || this.props.width === 'xs') return <HeaderMenu items={this.props.items} onClickHandler={this.props.onClickHandler} />;
    return (
      this.props.items.map(item => (
        <HeaderItem
          key={item.title}
          backdrop={item.backdrop}
          title={item.title}
          link={item.link}
          menu={item.menu}
          menuItem={item.menuItem}
          onClickHandler={this.props.onClickHandler}
        />
      ))
    );
  }
  render() {
    const {
      classes,
      title,
      width,
    } = this.props;
    return (
      <div className={classes.root}>
        <Slide in >
          <AppBar position={width === 'sm' || width === 'xs' ? 'fixed' : 'absolute'} className={classes.appBar}>
            <Toolbar>
              <Typography type="title" className={classes.flex} color="inherit">
                {title}
              </Typography>
              {
                this.renderItems()
              }
            </Toolbar>
          </AppBar>
        </Slide>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.any.isRequired,
  items: PropTypes.array.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default compose(withStyles(styles), withWidth())(Header);
