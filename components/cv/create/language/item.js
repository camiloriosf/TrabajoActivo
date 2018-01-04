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
    if (this.props.language !== nextProps.language ||
    this.props.description !== nextProps.description ||
    this.props.index !== nextProps.index ||
    this.props.stars !== nextProps.stars) return true;
    return false;
  }
  render() {
    const {
      classes,
      t,
      language,
      description,
      index,
      stars,
      dragprops,
      handleChange,
      handleLanguageAdd,
      handleLanguageDelete,
      handleStarChange,
    } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.paper}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Header
              index={index}
              dragprops={dragprops}
              handleLanguageAdd={handleLanguageAdd}
              handleLanguageDelete={handleLanguageDelete}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  id="language"
                  placeholder={t('create.sections.language.fields.language.placeholder')}
                  label={t('create.sections.language.fields.language.label')}
                  margin="normal"
                  value={language}
                  onChange={handleChange({ name: 'language', index })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="description"
                  placeholder={t('create.sections.language.fields.description.placeholder')}
                  label={t('create.sections.language.fields.description.label')}
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
  language: PropTypes.string,
  description: PropTypes.string,
  index: PropTypes.number,
  stars: PropTypes.number,
  dragprops: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleLanguageAdd: PropTypes.func.isRequired,
  handleLanguageDelete: PropTypes.func.isRequired,
  handleStarChange: PropTypes.func.isRequired,
};

Item.defaultProps = {
  language: '',
  description: '',
  index: 0,
  stars: 0,
};

export default translate('cv')(withStyles(styles)(Item));
