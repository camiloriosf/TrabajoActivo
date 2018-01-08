// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
import { translate, Interpolate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
// component imports
import ResponsiveDialog from '../common/responsiveDialog';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
});

class CellActionItem extends Component {
  state = {
    anchorEl: null,
    open: false,
    openDialog: false,
    openShareDialog: false,
  };

  onOpen = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };
  onClose = () => {
    this.setState({ open: false });
  };
  onPDFDownload = () => {
    this.setState({ open: false });
    window.open(`https://app.trabajoactivo.com/${this.props.id}`, '_blank');
  };
  onShare = () => {
    this.setState({ open: false, openShareDialog: true });
  }
  onEditClick = () => {
    this.setState({ open: false });
    const href = `/cv/create?id=${this.props.id}`;
    const as = `/cv/create/${this.props.id}`;
    Router.push(href, as);
  };
  onCopyClick = () => {
    this.setState({ open: false });
    this.props.handleCVCopy({ id: this.props.id });
  };
  onDeleteClick = () => {
    this.setState({ open: false, openDialog: true });
  };
  onResponsiveShareDialogClose = () => {
    this.setState({ openShareDialog: false });
  }
  onResponsiveDialogClose = () => {
    this.setState({ openDialog: false });
  };
  onResponsiveDialogAccept = () => {
    this.setState({ openDialog: false });
    this.props.handleCVDelete({ id: this.props.id });
  };
  render() {
    const {
      classes,
      t,
      id,
      name,
    } = this.props;
    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.onOpen}
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
          onClose={this.onClose}
        >
          <MenuItem onClick={this.onPDFDownload}>
            {t('table.actionItem.pdf.text')}
          </MenuItem>
          <MenuItem onClick={this.onShare}>
            {t('table.actionItem.share.text')}
          </MenuItem>
          <MenuItem onClick={this.onEditClick}>
            {t('table.actionItem.edit.text')}
          </MenuItem>
          <MenuItem onClick={this.onCopyClick}>
            {t('table.actionItem.copy.text')}
          </MenuItem>
          <MenuItem onClick={this.onDeleteClick}>
            {t('table.actionItem.delete.text')}
          </MenuItem>
        </Menu>
        <ResponsiveDialog
          open={this.state.openShareDialog}
          handleClose={this.onResponsiveShareDialogClose}
          handleAccept={this.onResponsiveShareDialogClose}
          title={t('table.actionItem.share.dialog.title')}
          content={
            <div>
              <Typography type="subheading" paragraph>{t('table.actionItem.share.dialog.content')}</Typography>
              <Typography type="body2">{t('table.actionItem.share.dialog.link')}{id}</Typography>
            </div>
          }
          accept={t('table.actionItem.share.dialog.accept')}
        />
        <ResponsiveDialog
          open={this.state.openDialog}
          handleClose={this.onResponsiveDialogClose}
          handleAccept={this.onResponsiveDialogAccept}
          title={t('table.actionItem.delete.dialog.title')}
          content={
            <Typography type="subheading">
              <Interpolate i18nKey="cv:table.actionItem.delete.dialog.content" name={name} />
            </Typography>
          }
          accept={t('table.actionItem.delete.dialog.accept')}
          cancel={t('table.actionItem.delete.dialog.cancel')}
        />
      </div>
    );
  }
}

CellActionItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleCVCopy: PropTypes.func.isRequired,
  handleCVDelete: PropTypes.func.isRequired,
};

export default translate('cv')(withStyles(styles)(CellActionItem));
