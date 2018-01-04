// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { Manager, Target, Popper } from 'react-popper';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

const styles = theme => ({ // eslint-disable-line no-unused-vars

});

class HeaderMenu extends Component {
  state = {
    open: false,
  };
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.open !== nextState.open) {
      console.log('update index/header/headerMenu');
      return true;
    }
    return false;
  }

  handleClick = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleMenuItemClick = link => () => {
    this.setState({ open: false });
    Router.push(link);
  }
  render() {
    const {
      classes,
      items,
    } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <Manager>
          <Target>
            <IconButton
              color="default"
              aria-label="Menu"
              aria-owns={this.state.open ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
          </Target>
          <Popper placement="bottom-end" eventsEnabled={open}>
            <ClickAwayListener onClickAway={this.handleRequestClose}>
              <Grow in={open} id="menu-list" timeout={300} style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    {
                      open && items.map(item =>
                        ([
                          <MenuItem
                            key={item.title}
                            onClick={this.handleMenuItemClick(item.link)}
                          >
                            {item.title}
                          </MenuItem>,
                          item.divider && <Divider />,
                        ]))
                    }
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

HeaderMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default withStyles(styles)(HeaderMenu);
