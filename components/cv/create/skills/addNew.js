// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: theme.mixins.gutters({

  }),
  button: {
    width: '100%',
    height: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.palette.common.minBlack,
    '&:hover': {
      borderColor: theme.palette.primary[500],
    },
    '&:hover $icon': {
      color: theme.palette.primary[500],
    },
    '&:hover $text': {
      color: theme.palette.primary[500],
    },
  },
  icon: {
    color: theme.palette.common.minBlack,
  },
  text: {
    color: theme.palette.common.minBlack,
  },
});

class AddNew extends Component {
  render() {
    const {
      classes,
      t,
      index,
      handleSkillAdd,
    } = this.props;
    return (
      <div className={classes.root}>
        <ButtonBase className={classes.button} onClick={handleSkillAdd({ index })}>
          <AddIcon className={classes.icon} />
          <Typography type="button" className={classes.text}>
            {t('create.sections.skills.fields.add')}
          </Typography>
        </ButtonBase>
      </div>
    );
  }
}

AddNew.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleSkillAdd: PropTypes.func.isRequired,
};

export default translate('cv')(withStyles(styles)(AddNew));
