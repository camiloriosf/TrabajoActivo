// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { Manager, Target, Popper } from 'react-popper';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ButtonBase from 'material-ui/ButtonBase';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  button: {
    position: 'relative',
    height: 65,
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 60,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $backdrop': {
      opacity: 0.15,
    },
  },
  backdrop: {
    position: 'absolute',
    background: theme.palette.common.white,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
});

class HeaderItem extends Component {
  state = {
    open: false,
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.open !== nextState.open) return true;
    return false;
  }

  handleClick = () => {
    if (this.props.menu) this.setState({ open: !this.state.open });
    else this.props.onClickHandler(this.props.link);
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleMenuItemClick = link => () => {
    this.setState({ open: false });
    this.props.onClickHandler(link);
  }

  render() {
    const {
      classes,
      title,
      menu,
      menuItem,
    } = this.props;
    const { open } = this.state;
    return (
      <Manager>
        <Target>
          <ButtonBase
            key="headerButton"
            aria-owns={this.state.open ? 'menu-list' : null}
            aria-haspopup="true"
            focusRipple
            className={classes.button}
            onClick={this.handleClick}
          >
            <div className={classes.backdrop} />
            <Typography type="body1" color="inherit" >
              {title}
            </Typography>
            {menu && !open && <ArrowDropDownIcon color="inherit" />}
            {menu && open && <ArrowDropUpIcon color="inherit" />}
          </ButtonBase>
        </Target>
        <Popper placement="bottom-start" eventsEnabled={open}>
          <ClickAwayListener onClickAway={this.handleRequestClose}>
            <Grow in={open} id="menu-list" timeout={300} style={{ transformOrigin: '0 0 0' }}>
              <Paper>
                <MenuList role="menu">
                  {
                    open && menuItem.map(item =>
                      (
                        [
                          <MenuItem
                            key={item.link}
                            onClick={this.handleMenuItemClick(item.link)}
                          >
                            <Typography type="body1" color="default" >
                              {item.title}
                            </Typography>
                          </MenuItem>,
                          item.divider && <Divider />,
                        ]
                      ))
                  }
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    );
  }
}

HeaderItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  menu: PropTypes.bool,
  menuItem: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
  })),
  onClickHandler: PropTypes.func.isRequired,
};

HeaderItem.defaultProps = {
  menu: false,
  link: '',
  menuItem: [],
};

export default withStyles(styles)(HeaderItem);
