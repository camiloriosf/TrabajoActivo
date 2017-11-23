// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import TimelineIcon from 'material-ui-icons/Timeline';
import LanguageIcon from 'material-ui-icons/Language';
import CloudDownloadIcon from 'material-ui-icons/CloudDownload';
import SettingsIcon from 'material-ui-icons/Settings';
// component imports
import PublishFeaturesItem from './publishFeaturesItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 20,
      paddingBottom: 20,
    },
  },
  publishFeaturesItemIcon: {
    color: theme.palette.common.darkWhite,
    width: 50,
    height: 50,
    [theme.breakpoints.down('sm')]: {
      width: 20,
      height: 20,
    },
  },
});

class PublishFeatures extends Component {
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <PublishFeaturesItem
          text={t('publish.items.0.text')}
          icon={<LanguageIcon className={classes.publishFeaturesItemIcon} />}
        />
        <PublishFeaturesItem
          text={t('publish.items.1.text')}
          icon={<CloudDownloadIcon className={classes.publishFeaturesItemIcon} />}
        />
        <PublishFeaturesItem
          text={t('publish.items.2.text')}
          icon={<TimelineIcon className={classes.publishFeaturesItemIcon} />}
        />
        <PublishFeaturesItem
          text={t('publish.items.3.text')}
          icon={<SettingsIcon className={classes.publishFeaturesItemIcon} />}
        />
      </div>
    );
  }
}

PublishFeatures.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('index')(withStyles(styles)(PublishFeatures));
