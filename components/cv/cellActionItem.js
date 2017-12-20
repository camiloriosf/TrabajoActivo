// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
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
  handleEditClick = () => {
    this.setState({ open: false });
    const href = `/cv/create?id=${this.props.id}`;
    const as = `/cv/create/${this.props.id}`;
    Router.push(href, as);
  }
  handlePDFDownload = () => {
    this.setState({ open: false });
    window.open(`/cv/view/${this.props.id}`, '_blank');
  }
  handleCopyClick = () => {
    this.setState({ open: false });
    this.props.handleCVCopy({ id: this.props.id });
  }
  handleDeleteClick = () => {
    this.setState({ open: false });
    this.props.handleCVDelete({ id: this.props.id });
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
          <MenuItem onClick={this.handleEditClick}>
            {t('table.actionItem.edit.text')}
          </MenuItem>
          <MenuItem onClick={this.handlePDFDownload}>
            {t('table.actionItem.pdf.text')}
          </MenuItem>
          <MenuItem onClick={this.handleCopyClick}>
            {t('table.actionItem.copy.text')}
          </MenuItem>
          <MenuItem onClick={this.handleDeleteClick}>
            {t('table.actionItem.delete.text')}
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

CellActionItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  handleCVCopy: PropTypes.func.isRequired,
  handleCVDelete: PropTypes.func.isRequired,
};

export default translate('cv')(withStyles(styles)(CellActionItem));
