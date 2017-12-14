// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import ReorderIcon from 'material-ui-icons/Reorder';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  button: {
    width: 30,
    height: 30,
  },
  buttonReorder: {
    cursor: 'move',
    width: 30,
    height: 30,
  },
});

class Header extends Component {
  shouldComponentUpdate = (nextProps) => {
    if (
      nextProps.role !== this.props.role || nextProps.company !== this.props.company
    ) return true;
    return false;
  }
  renderExtra = () => {
    const {
      role, company,
    } = this.props;
    if (role !== '' || company !== '') {
      return ` (${role}-${company})`;
    }
    return null;
  }
  render() {
    const {
      classes,
      t,
      index,
      dragprops,
      handleExperienceAdd,
      handleExperienceDelete,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="button" color="secondary" className={classes.flex}>
          {t('create.sections.experience.fields.header')}{index + 1}<strong>{this.renderExtra()}</strong>
        </Typography>
        <IconButton
          className={classes.button}
          color="primary"
          aria-label="Add"
          onClick={handleExperienceAdd({ index })}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          color="accent"
          aria-label="Delete"
          onClick={handleExperienceDelete({ index })}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          className={classes.buttonReorder}
          aria-label="Reorder"
          {...dragprops}
        >
          <ReorderIcon />
        </IconButton>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  handleExperienceAdd: PropTypes.func.isRequired,
  handleExperienceDelete: PropTypes.func.isRequired,
};

export default translate('cv')(withStyles(styles)(Header));
