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
    if (this.props.name !== nextProps.name ||
    this.props.relationship !== nextProps.relationship ||
    this.props.email !== nextProps.email ||
    this.props.mobile !== nextProps.mobile ||
    this.props.index !== nextProps.index) return true;
    return false;
  }
  handleChange = name => (event) => {
    this.props.handleChange({ name, value: event.target.value, index: this.props.index });
  }
  render() {
    const {
      classes,
      t,
      index,
      name,
      relationship,
      email,
      mobile,
      dragprops,
      handleReferenceAdd,
      handleReferenceDelete,
    } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.paper}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Header
              index={index}
              dragprops={dragprops}
              handleReferenceAdd={handleReferenceAdd}
              handleReferenceDelete={handleReferenceDelete}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  id="name"
                  placeholder={t('create.sections.references.fields.name.placeholder')}
                  label={t('create.sections.references.fields.name.label')}
                  margin="normal"
                  value={name}
                  onChange={this.handleChange('name')}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="relationship"
                  placeholder={t('create.sections.references.fields.relationship.placeholder')}
                  label={t('create.sections.references.fields.relationship.label')}
                  margin="normal"
                  value={relationship}
                  onChange={this.handleChange('relationship')}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  placeholder={t('create.sections.references.fields.email.placeholder')}
                  label={t('create.sections.references.fields.email.label')}
                  margin="normal"
                  value={email}
                  onChange={this.handleChange('email')}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="mobile"
                  placeholder={t('create.sections.references.fields.mobile.placeholder')}
                  label={t('create.sections.references.fields.mobile.label')}
                  margin="normal"
                  value={mobile}
                  onChange={this.handleChange('mobile')}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
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
  name: PropTypes.string,
  relationship: PropTypes.string,
  email: PropTypes.string,
  mobile: PropTypes.string,
  index: PropTypes.number,
  dragprops: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReferenceAdd: PropTypes.func.isRequired,
  handleReferenceDelete: PropTypes.func.isRequired,
};

Item.defaultProps = {
  name: '',
  relationship: '',
  email: '',
  mobile: '',
  index: 0,
};

export default translate('cv')(withStyles(styles)(Item));
