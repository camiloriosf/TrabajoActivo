// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import FormatQuoteIcon from 'material-ui-icons/FormatQuote';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.palette.common.lightBlack,
    [theme.breakpoints.down('sm')]: {
      display: 'inline',
    },
  },
  quote: {
    fontStyle: 'italic',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 90,
    marginRight: 90,
    color: theme.palette.common.darkWhite,
    [theme.breakpoints.down('md')]: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 40,
      marginRight: 40,
    },
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: 10,
      backgroundColor: theme.palette.common.lightBlack,
    },
  },
  authorDiv: {
    width: 200,
    textAlign: 'center',
    marginRight: 90,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      paddingBottom: 10,
      width: '100%',
      backgroundColor: theme.palette.common.lightBlack,
    },
  },
  icon: {
    color: theme.palette.common.darkWhite,
    width: 100,
    height: 100,
  },
  author: {
    color: theme.palette.common.darkWhite,
  },
});

class Quote extends Component {
  render() {
    const {
      classes,
      quote,
      author,
    } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Typography type="subheading" className={classes.quote} align="center" >
            {quote}
          </Typography>
        </div>
        <div className={classes.authorDiv}>
          <FormatQuoteIcon className={classes.icon} />
          <Typography type="body2" className={classes.author} >
            {author}
          </Typography>
        </div>
      </div>
    );
  }
}

Quote.propTypes = {
  classes: PropTypes.object.isRequired,
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default withStyles(styles)(Quote);
