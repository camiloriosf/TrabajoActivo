// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/es';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import {
  FormLabel,
  FormControlLabel,
} from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import { DatePicker } from 'material-ui-pickers';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// component imports
import Header from './header';
import ListItem from './listItem';

moment.locale('es');

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
  date: {
    width: '100%',
  },
});

class Item extends Component {
  shouldComponentUpdate = (nextProps) => {
    if (this.props.role !== nextProps.role ||
    this.props.company !== nextProps.company ||
    this.props.from !== nextProps.from ||
    this.props.to !== nextProps.to ||
    this.props.actual !== nextProps.actual ||
    this.props.index !== nextProps.index ||
    this.props.responsibilities !== nextProps.responsibilities ||
    this.props.achievements !== nextProps.responsibilities) return true;
    return false;
  }
  handleChange = name => (event) => {
    this.props.handleChange({ name, value: event.target.value, index: this.props.index });
  }
  handleDateChange = name => (date) => {
    this.props.handleChange({ name, value: date.format('DD-MM-YYYY'), index: this.props.index });
  }
  handleSwitchChange = name => (event, checked) => {
    this.props.handleChange({ name, value: checked, index: this.props.index });
  }
  render() {
    const {
      classes,
      t,
      role,
      company,
      from,
      to,
      actual,
      responsibilities,
      achievements,
      index,
      dragprops,
      handleExperienceAdd,
      handleExperienceDelete,
      handleListItemChange,
      handleListItemAdd,
      handleListItemDelete,
      handleListItemKeyPress,
    } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.paper}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Header
              index={index}
              role={role}
              company={company}
              dragprops={dragprops}
              handleExperienceAdd={handleExperienceAdd}
              handleExperienceDelete={handleExperienceDelete}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  id="role"
                  placeholder={t('create.sections.experience.fields.role.placeholder')}
                  label={t('create.sections.experience.fields.role.label')}
                  margin="normal"
                  value={role}
                  onChange={this.handleChange('role')}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="company"
                  placeholder={t('create.sections.experience.fields.company.placeholder')}
                  label={t('create.sections.experience.fields.company.label')}
                  margin="normal"
                  value={company}
                  onChange={this.handleChange('company')}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormLabel>
                  <Typography type="caption" component="p">
                    {t('create.sections.experience.fields.from.label')}
                  </Typography>
                </FormLabel>
                <DatePicker
                  id="from"
                  className={classes.date}
                  value={moment(from, 'DD-MM-YYYY')}
                  disableFuture
                  openToYearSelection
                  autoOk
                  format="DD-MM-YYYY"
                  invalidLabel={t('create.sections.experience.fields.from.placeholder')}
                  onChange={this.handleDateChange('from')}
                  leftArrowIcon={<KeyboardArrowLeftIcon />}
                  rightArrowIcon={<KeyboardArrowRightIcon />}
                />
              </Grid>
              {
                !actual && (
                  <Grid item xs={12} sm={4}>
                    <FormLabel>
                      <Typography type="caption" component="p">
                        {t('create.sections.experience.fields.to.label')}
                      </Typography>
                    </FormLabel>
                    <DatePicker
                      id="to"
                      className={classes.date}
                      value={!actual ? moment(to, 'DD-MM-YYYY') : ''}
                      disableFuture
                      openToYearSelection
                      autoOk
                      disabled={actual}
                      format="DD-MM-YYYY"
                      invalidLabel={t('create.sections.experience.fields.to.placeholder')}
                      onChange={this.handleDateChange('to')}
                      leftArrowIcon={<KeyboardArrowLeftIcon />}
                      rightArrowIcon={<KeyboardArrowRightIcon />}
                    />
                  </Grid>
                )
              }
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={actual}
                      onChange={this.handleSwitchChange('actual')}
                    />
                  }
                  label={t('create.sections.experience.fields.actual.label')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography type="caption" component="p">
                  {t('create.sections.experience.fields.responsibilities.title')}
                </Typography>
                {responsibilities.map(item =>
                  (<ListItem
                    key={item.index}
                    companyIndex={index}
                    index={item.index}
                    text={item.text}
                    type="responsibilities"
                    handleChange={handleListItemChange}
                    handleAddClick={handleListItemAdd}
                    handleDeleteClick={handleListItemDelete}
                    handleKeyPress={handleListItemKeyPress}
                  />))}
              </Grid>
              <Grid item xs={12}>
                <Typography type="caption" component="p">
                  {t('create.sections.experience.fields.achievements.title')}
                </Typography>
                {achievements.map(item =>
                  (<ListItem
                    key={item.index}
                    companyIndex={index}
                    index={item.index}
                    text={item.text}
                    type="achievements"
                    handleChange={handleListItemChange}
                    handleAddClick={handleListItemAdd}
                    handleDeleteClick={handleListItemDelete}
                    handleKeyPress={handleListItemKeyPress}
                  />))}
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
  role: PropTypes.string,
  company: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  actual: PropTypes.bool,
  responsibilities: PropTypes.array,
  achievements: PropTypes.array,
  index: PropTypes.number,
  dragprops: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleExperienceAdd: PropTypes.func.isRequired,
  handleExperienceDelete: PropTypes.func.isRequired,
  handleListItemChange: PropTypes.func.isRequired,
  handleListItemAdd: PropTypes.func.isRequired,
  handleListItemDelete: PropTypes.func.isRequired,
  handleListItemKeyPress: PropTypes.func.isRequired,
};

Item.defaultProps = {
  role: '',
  company: '',
  from: '',
  to: '',
  actual: false,
  responsibilities: [],
  achievements: [],
  index: 0,
};

export default translate('cv')(withStyles(styles)(Item));
