// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ButtonBase from 'material-ui/ButtonBase';
import Fade from 'material-ui/transitions/Fade';
import FormatQuoteIcon from 'material-ui-icons/FormatQuote';
import LensIcon from 'material-ui-icons/Lens';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    maxWidth: 500,
    textAlign: 'center',
    padding: 40,
    flexGrow: 1,
    flexBasis: 0,
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
    },
  },
  textWhite: {
    color: theme.palette.common.darkWhite,
  },
  quoteDiv: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.common.lightBlack,
    borderRadius: 10,
  },
  icon: {
    height: 40,
    width: 40,
    padding: 10,
    color: theme.palette.common.darkWhite,
  },
  quoteText: {
    color: theme.palette.common.darkWhite,
    textAlign: 'left',
    padding: 20,
  },
  author: {
    color: theme.palette.common.darkWhite,
    textAlign: 'left',
    marginLeft: 30,
    marginTop: 15,
  },
  role: {
    color: theme.palette.common.darkWhite,
    textAlign: 'left',
    marginLeft: 30,
    fontStyle: 'italic',
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '10px solid',
    borderTopColor: theme.palette.common.lightBlack,
    marginLeft: 20,
  },
  dotButton: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  whiteDot: {
    color: theme.palette.common.darkWhite,
    height: 18,
    width: 18,
  },
  blackDot: {
    color: theme.palette.common.lightBlack,
    height: 18,
    width: 18,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.common.darkWhite,
    },
  },
});

class Reviews extends Component {
  state = {
    dot: 0,
  }
  componentDidMount() {
    this.timer = setInterval(this.changeActiveReview, 4000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  changeActiveReview = () => {
    if (this.state.dot === this.props.reviews.length - 1) {
      this.setState({ dot: 0 });
    } else {
      this.setState(prevState => ({ dot: prevState.dot + 1 }));
    }
  }
  handleDotClick = dot => () => {
    this.setState({ dot });
    this.forceUpdate();
  }
  renderReview = () => (
    <Fade in timeout={1000}>
      <div>
        <div className={this.props.classes.quoteDiv}>
          <FormatQuoteIcon className={this.props.classes.icon} />
          <Typography type="body1" className={this.props.classes.quoteText} paragraph>
            {this.props.reviews[this.state.dot].quote}
          </Typography>
        </div>
        <div className={this.props.classes.arrowUp} />
        <Typography type="body1" className={this.props.classes.author}>
          {this.props.reviews[this.state.dot].author}
        </Typography>
        <Typography type="body1" className={this.props.classes.role}>
          {this.props.reviews[this.state.dot].role}
        </Typography>
      </div>
    </Fade>
  );
  render() {
    const {
      classes,
      title,
      reviews,
    } = this.props;
    const { dot } = this.state;
    return (
      <div className={classes.root}>
        <Typography type="headline" className={classes.textWhite} paragraph>
          {title}
        </Typography>
        {this.renderReview()}
        <div>
          {
            reviews.map((review, index) => (
              <ButtonBase
                key={review.author}
                disableRipple
                className={classes.dotButton}
                onClick={this.handleDotClick(index)}
              >
                <LensIcon className={dot === index ? classes.whiteDot : classes.blackDot} />
              </ButtonBase>
            ))
          }
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
};

export default withStyles(styles)(Reviews);
