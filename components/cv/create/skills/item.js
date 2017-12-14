// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import TextField from 'material-ui/TextField';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// component imports
import Header from './header';
import Rating from './rating';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
});

class Item extends Component {
  shouldComponentUpdate = (nextProps) => {
    if (this.props.skill !== nextProps.skill ||
    this.props.description !== nextProps.description ||
    this.props.index !== nextProps.index ||
    this.props.stars !== nextProps.stars) return true;
    return false;
  }
  render() {
    const {
      classes,
      t,
      skill,
      description,
      index,
      stars,
      dragprops,
      handleChange,
      handleSkillAdd,
      handleSkillDelete,
      handleStarChange,
    } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.paper}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Header
              index={index}
              dragprops={dragprops}
              handleSkillAdd={handleSkillAdd}
              handleSkillDelete={handleSkillDelete}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  id="skill"
                  placeholder={t('create.sections.skills.fields.skill.placeholder')}
                  label={t('create.sections.skills.fields.skill.label')}
                  margin="normal"
                  value={skill}
                  onChange={handleChange({ name: 'skill', index })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="description"
                  placeholder={t('create.sections.skills.fields.description.placeholder')}
                  label={t('create.sections.skills.fields.description.label')}
                  margin="normal"
                  value={description}
                  onChange={handleChange({ name: 'description', index })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Rating stars={stars} index={index} handleChange={handleStarChange} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
  skill: PropTypes.string,
  description: PropTypes.string,
  index: PropTypes.number,
  stars: PropTypes.number,
  dragprops: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSkillAdd: PropTypes.func.isRequired,
  handleSkillDelete: PropTypes.func.isRequired,
  handleStarChange: PropTypes.func.isRequired,
};

Item.defaultProps = {
  skill: '',
  description: '',
  index: 0,
  stars: 0,
};

export default translate('cv')(withStyles(styles)(Item));
