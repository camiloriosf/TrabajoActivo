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
  shouldComponentUpdate = () => false
  render() {
    const {
      classes,
      t,
      index,
      dragprops,
      handleSkillAdd,
      handleSkillDelete,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="button" color="secondary" className={classes.flex}>
          {t('create.sections.skills.fields.header')}{index + 1}
        </Typography>
        <IconButton
          className={classes.button}
          color="primary"
          aria-label="Add"
          onClick={handleSkillAdd({ index })}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          color="accent"
          aria-label="Delete"
          onClick={handleSkillDelete({ index })}
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
  handleSkillAdd: PropTypes.func.isRequired,
  handleSkillDelete: PropTypes.func.isRequired,
};

export default translate('cv')(withStyles(styles)(Header));
