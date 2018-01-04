// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
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
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  }),
  title: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
});

class SectionTitle extends Component {
  state = {
    edit: false,
  }
  handleClick = () => {
    this.setState(prevState => ({ edit: !prevState.edit }));
  }
  handleClickAway = () => {
    this.setState({ edit: false });
  }
  handleDownloadClick = () => {
    window.open(`/cv/view/${this.props.id}`, '_blank');
  }
  render() {
    const {
      classes,
      t,
      name,
      handleChange,
    } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
          <div className={classes.title}>
            {
              !this.state.edit ? ([
                <Typography key="name" type="headline" component="h3">
                  {name}
                </Typography>,
                <IconButton key="button" className={classes.button} aria-label="Edit" onClick={this.handleClick}>
                  <ModeEditIcon />
                </IconButton>,
              ]) : (
                <ClickAwayListener onClickAway={this.handleClickAway}>
                  <FormControl>
                    <InputLabel htmlFor="name">{t('create.sections.name')}</InputLabel>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={handleChange}
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
          <Button raised color="primary" onClick={this.handleDownloadClick}>
            {t('create.sections.download')}
          </Button>
        </Paper>
      </div>
    );
  }
}

SectionTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};


export default translate('cv')(withStyles(styles)(SectionTitle));
