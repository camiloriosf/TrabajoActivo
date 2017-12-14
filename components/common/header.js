// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import DescriptionIcon from 'material-ui-icons/Description';
import EventSeatIcon from 'material-ui-icons/EventSeat';
import VideoLibraryIcon from 'material-ui-icons/VideoLibrary';
import SettingsIcon from 'material-ui-icons/Settings';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';
import HelpIcon from 'material-ui-icons/Help';
import EmailIcon from 'material-ui-icons/Email';
import ViewCarousel from 'material-ui-icons/ViewCarousel';

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
  menuButton: {
    marginLeft: 20,
    marginRight: 12,
  },
  email: {
    padding: 20,
    backgroundColor: theme.palette.common.faintBlack,
  },
});

class Header extends Component {
  state = {
    open: false,
  }
  handleClick = link => () => {
    Router.push(link);
  }
  toggleDrawer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }
  render() {
    const sideList = (
      <div className={this.props.classes.list}>
        <div className={this.props.classes.email}>
          <Typography type="body1" color="default" >
            {this.props.t('header.menu.welcome')} <span style={{ fontWeight: 'bold' }}>{this.props.email}</span>!
          </Typography>
        </div>
        <List subheader={<ListSubheader>{this.props.t('header.menu.accountTitle')}</ListSubheader>}>
          <ListItem button onClick={this.handleClick(this.props.t('links.cv'))}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={this.props.t('header.menu.cv')} />
          </ListItem>
          <ListItem button onClick={this.handleClick(this.props.t('links.test'))}>
            <ListItemIcon>
              <EventSeatIcon />
            </ListItemIcon>
            <ListItemText primary={this.props.t('header.menu.test')} />
          </ListItem>
          <ListItem button onClick={this.handleClick(this.props.t('links.coaching'))}>
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary={this.props.t('header.menu.coaching')} />
          </ListItem>
          <ListItem button onClick={this.handleClick(this.props.t('links.settings'))}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={this.props.t('header.menu.settings')} />
          </ListItem>
          <ListItem button onClick={this.handleClick(this.props.t('links.logout'))}>
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary={this.props.t('header.menu.logout')} />
          </ListItem>
        </List>
        <Divider inset />
        <List subheader={<ListSubheader>{this.props.t('header.menu.helpTitle')}</ListSubheader>}>
          <ListItem button onClick={this.handleClick(this.props.t('links.help'))}>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary={this.props.t('header.menu.help')} />
          </ListItem>
          <ListItem button onClick={this.handleClick(this.props.t('links.contact'))}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={this.props.t('header.menu.contact')} />
          </ListItem>
          <ListItem button onClick={this.handleClick(this.props.t('links.plans'))}>
            <ListItemIcon>
              <ViewCarousel />
            </ListItemIcon>
            <ListItemText primary={this.props.t('header.menu.plans')} />
          </ListItem>
        </List>
      </div>
    );
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div className={classes.flex}>
              <img src={t('header.image.link')} alt={t('header.image.alt')} className={classes.image} />
            </div>
            <IconButton
              aria-label="open drawer"
              onClick={this.toggleDrawer}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={this.state.open}
          onRequestClose={this.toggleDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
};

export default translate('common')(withStyles(styles)(Header));

