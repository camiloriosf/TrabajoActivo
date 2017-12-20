// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
  button: {
    textAlign: 'right',
    marginTop: theme.spacing.unit * 3,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
});

class SectionHeader extends Component {
  state = {
    open: false,
    edit: false,
  }
  handleCollapse = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }
  handleClick = () => {
    this.setState(prevState => ({ edit: !prevState.edit }));
  }
  handleClickAway = () => {
    this.setState({ edit: false });
  }
  render() {
    const {
      classes,
      title,
      subtitle,
      children,
      t,
      id,
      editable,
      handleTitleEdit,
    } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
          <div className={classes.title}>
            {
              !this.state.edit ? ([
                <Typography key="title" type="headline" component="h3">
                  {title}
                </Typography>,
                  editable && (
                    <IconButton key="button" aria-label="Edit" onClick={this.handleClick}>
                      <ModeEditIcon />
                    </IconButton>
                  ),
              ]) : (
                <ClickAwayListener onClickAway={this.handleClickAway}>
                  <FormControl>
                    <InputLabel htmlFor="title">{t('create.sections.sectionTitle')}</InputLabel>
                    <Input
                      id="title"
                      type="text"
                      value={title}
                      onChange={handleTitleEdit({ id })}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={this.handleClick}>
                            <ModeEditIcon />
                          </IconButton>
                        </InputAdornment>
                        }
                    />
                  </FormControl>
                </ClickAwayListener>
                )
            }
          </div>
          <Typography type="body1" component="p">
            {subtitle}
          </Typography>
          <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
            {children}
          </Collapse>
          <div className={classes.button}>
            <Button raised color="primary" onClick={this.handleCollapse}>
              {
                this.state.open
                  ? t('create.sections.header.buttonHide')
                  : t('create.sections.header.buttonShow')
              }
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

SectionHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  id: PropTypes.string,
  editable: PropTypes.bool,
  handleTitleEdit: PropTypes.func,
};

SectionHeader.defaultProps = {
  id: '',
  editable: false,
  handleTitleEdit: () => null,
};

export default translate('cv')(withStyles(styles)(SectionHeader));
