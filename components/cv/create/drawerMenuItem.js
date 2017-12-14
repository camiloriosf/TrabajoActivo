// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import classNames from 'classnames';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';
import ButtonBase from 'material-ui/ButtonBase';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';
import ReorderIcon from 'material-ui-icons/Reorder';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import DescriptionIcon from 'material-ui-icons/Description';
import BuildIcon from 'material-ui-icons/Build';
import WorkIcon from 'material-ui-icons/Work';
import SchoolIcon from 'material-ui-icons/School';
import LanguageIcon from 'material-ui-icons/Language';
import CardMembershipIcon from 'material-ui-icons/CardMembership';
import GroupIcon from 'material-ui-icons/Group';
import AttachMoneyIcon from 'material-ui-icons/AttachMoney';
import DateRangeIcon from 'material-ui-icons/DateRange';
import ErrorIcon from 'material-ui-icons/Error';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  selected: {
    background: theme.palette.primary[500],
  },
  listItem: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemButton: {
    padding: 5,
  },
  listItemIcon: {
    color: theme.palette.grey[700],
  },
  listItemIconSelected: {
    color: theme.palette.grey[200],
  },
  grabCursor: {
    cursor: 'move',
  },
});

class DrawerMenuItem extends Component {
  renderIcon = () => {
    switch (this.props.icon) {
      case 'AccountBoxIcon':
        return <AccountBoxIcon />;
      case 'DescriptionIcon':
        return <DescriptionIcon />;
      case 'BuildIcon':
        return <BuildIcon />;
      case 'WorkIcon':
        return <WorkIcon />;
      case 'SchoolIcon':
        return <SchoolIcon />;
      case 'LanguageIcon':
        return <LanguageIcon />;
      case 'CardMembershipIcon':
        return <CardMembershipIcon />;
      case 'GroupIcon':
        return <GroupIcon />;
      case 'AttachMoneyIcon':
        return <AttachMoneyIcon />;
      case 'DateRangeIcon':
        return <DateRangeIcon />;
      default:
        return <ErrorIcon />;
    }
  }
  render() {
    const {
      classes,
      id,
      text,
      hideButton,
      hidden,
      dragButton,
      dragprops,
      selected,
      handleClick,
      handleItemHiddenClick,
    } = this.props;
    return (
      <div className={classNames(classes.root, selected && classes.selected)}>
        <ListItem dense button onClick={handleClick(id)}>
          <ListItemIcon
            className={
              classNames(selected && classes.listItemIconSelected)
            }
          >
            {this.renderIcon()}
          </ListItemIcon>
          <ListItemText
            primary={text}
            classes={{
              text: classNames(selected && classes.listItemIconSelected),
            }}
          />
          {
            (hideButton || dragButton)
            && (
              <ListItemSecondaryAction className={classes.listItem}>
                {
                  hideButton && (
                    <ButtonBase
                      className={classes.listItemButton}
                      onClick={handleItemHiddenClick(id)}
                    >
                      {
                        hidden
                          ? <VisibilityOffIcon
                            className={
                              classNames(
                                classes.listItemIcon,
                                selected && classes.listItemIconSelected,
                              )
                            }
                          />
                          : <VisibilityIcon
                            className={
                              classNames(
                                classes.listItemIcon,
                                selected && classes.listItemIconSelected,
                              )
                            }
                          />
                      }
                    </ButtonBase>
                  )
                }
                {
                  dragButton && (
                    <ButtonBase
                      className={classNames(classes.listItemButton, classes.grabCursor)}
                      {...dragprops}
                    >
                      <ReorderIcon
                        className={
                          classNames(classes.listItemIcon, selected && classes.listItemIconSelected)
                        }
                      />
                    </ButtonBase>
                  )
                }
              </ListItemSecondaryAction>
            )
          }
        </ListItem>
      </div>
    );
  }
}

DrawerMenuItem.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  hideButton: PropTypes.bool,
  hidden: PropTypes.bool,
  dragButton: PropTypes.bool,
  selected: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  handleItemHiddenClick: PropTypes.func.isRequired,
};

DrawerMenuItem.defaultProps = {
  hideButton: false,
  hidden: false,
  dragButton: false,
  selected: false,
};

export default withStyles(styles)(DrawerMenuItem);
