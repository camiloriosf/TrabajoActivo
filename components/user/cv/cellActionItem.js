// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
});

class CellActionItem extends Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleOpen = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };
  handleClick = action => () => {
    this.setState({ open: false });
    console.log({ id: this.props.id, action });
  }
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleOpen}
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          title="Delete row"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleClick(t('table.actionItem.edit.action'))}>
            {t('table.actionItem.edit.text')}
          </MenuItem>
          <MenuItem onClick={this.handleClick(t('table.actionItem.pdf.action'))}>
            {t('table.actionItem.pdf.text')}
          </MenuItem>
          <MenuItem onClick={this.handleClick(t('table.actionItem.txt.action'))}>
            {t('table.actionItem.txt.text')}
          </MenuItem>
          <MenuItem onClick={this.handleClick(t('table.actionItem.copy.action'))}>
            {t('table.actionItem.copy.text')}
          </MenuItem>
          <MenuItem onClick={this.handleClick(t('table.actionItem.delete.action'))}>
            {t('table.actionItem.delete.text')}
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

CellActionItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default translate('cv')(withStyles(styles)(CellActionItem));
