// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import LockOutlineIcon from 'material-ui-icons/LockOutline';
import TimelineIcon from 'material-ui-icons/Timeline';
import AvTimerIcon from 'material-ui-icons/AvTimer';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import LightbulbOutlineIcon from 'material-ui-icons/LightbulbOutline';
import DescriptionIcon from 'material-ui-icons/Description';
// component imports
import FeaturesItem from './featuresItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  featuresIcon: {
    margin: theme.spacing.unit, color: theme.palette.primary[500], width: 36, height: 36,
  },
});

class Features extends Component {
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FeaturesItem
              title={t('features.items.0.title')}
              body={t('features.items.0.body')}
              icon={<LockOutlineIcon className={classes.featuresIcon} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturesItem
              title={t('features.items.1.title')}
              body={t('features.items.1.body')}
              icon={<TimelineIcon className={classes.featuresIcon} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturesItem
              title={t('features.items.2.title')}
              body={t('features.items.2.body')}
              icon={<AvTimerIcon className={classes.featuresIcon} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturesItem
              title={t('features.items.3.title')}
              body={t('features.items.3.body')}
              icon={<StarBorderIcon className={classes.featuresIcon} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturesItem
              title={t('features.items.4.title')}
              body={t('features.items.4.body')}
              icon={<LightbulbOutlineIcon className={classes.featuresIcon} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturesItem
              title={t('features.items.5.title')}
              body={t('features.items.5.body')}
              icon={<DescriptionIcon className={classes.featuresIcon} />}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Features.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('index')(withStyles(styles)(Features));
