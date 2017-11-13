// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import classnames from 'classnames';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginBottom: 20,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  reverse: {
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  imageDiv: {
    width: '40vw',
    margin: 50,
    [theme.breakpoints.down('md')]: {
      width: '80vw',
      maxWidth: 600,
      margin: 20,
    },
  },
  image: {
    maxWidth: '100%',
    maxHeight: 280,
  },
  textDiv: {
    width: '30vw',
    margin: 50,
    [theme.breakpoints.down('md')]: {
      width: '80vw',
      margin: 0,
    },
  },
  title: {
    color: theme.palette.common.darkBlack,
    textAlign: 'left',
    fontSize: 20,
  },
  subTitle: {
    color: theme.palette.common.lightBlack,
    textAlign: 'left',
  },
  divider: {
    margin: 20,
  },
});

class BenefitsItem extends Component {
  render() {
    const {
      classes,
      title,
      body,
      image,
      reverse,
      noDivider,
    } = this.props;
    return (
      <div className={classes.root}>
        <div
          className={classnames(classes.content, reverse && classes.reverse)}
        >
          <div className={classes.imageDiv}>
            <img src={image} alt={title} className={classes.image} />
          </div>
          <div className={classes.textDiv}>
            <Typography type="subheading" color="inherit" className={classes.title} paragraph >
              {title}
            </Typography>
            <Typography type="body2" color="inherit" className={classes.subTitle} >
              {body}
            </Typography>
          </div>
        </div>
        {
          !noDivider && <Divider light className={classes.divider} />
        }
      </div>
    );
  }
}

BenefitsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
  noDivider: PropTypes.bool,
};

BenefitsItem.defaultProps = {
  reverse: false,
  noDivider: false,
};

export default withStyles(styles)(BenefitsItem);
