// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
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
    this.props.handleClick({ id: this.props.id, action });
  }
  render() {
    const {
      classes,
      actionItem,
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
          <MenuItem onClick={this.handleClick('edit')}>{actionItem.edit}</MenuItem>
          <MenuItem onClick={this.handleClick('pdf')}>{actionItem.pdf}</MenuItem>
          <MenuItem onClick={this.handleClick('txt')}>{actionItem.txt}</MenuItem>
          <MenuItem onClick={this.handleClick('copy')}>{actionItem.copy}</MenuItem>
          <MenuItem onClick={this.handleClick('delete')}>{actionItem.delete}</MenuItem>
        </Menu>
      </div>
    );
  }
}

CellActionItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  actionItem: PropTypes.object.isRequired,
};

export default withStyles(styles)(CellActionItem);
