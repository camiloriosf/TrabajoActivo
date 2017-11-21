// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import LightbulbOutlineIcon from 'material-ui-icons/LightbulbOutline';
// component imports
import Header from '../components/index/header';
import Hero from '../components/index/hero';
import Press from '../components/index/press';
import Section from '../components/index/section';
import Features from '../components/index/features';
import Quote from '../components/index/quote';
import Benefits from '../components/index/benefits';
import PublishLink from '../components/index/publishLink';
import PublishFeatures from '../components/index/publishFeatures';
import Prices from '../components/index/prices';
import Footer from '../components/index/footer';
// local imports
import { index } from '../lang/es.json';
import { app } from '../lib/google/firebase';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  heroTitle: {
    paddingTop: 250, color: theme.palette.common.white,
  },
  heroSubTitle: {
    paddingTop: 10, color: theme.palette.common.white,
  },
  heroCallToAction: {
    marginTop: 20, fontSize: 20,
  },
  publishTitle: {
    fontSize: 30, paddingTop: 50, color: theme.palette.common.white,
  },
  publishSubTitle: {
    fontSize: 20, paddingTop: 10, color: theme.palette.common.white,
  },
  publishCallToAction: {
    marginTop: 20, fontSize: 20,
  },
  footerCallToAction: {
    marginTop: 20, fontSize: 20, marginBottom: 80,
  },
  footerCallToActionIcon: {
    color: theme.palette.common.white, width: 30, height: 30,
  },
});

class Index extends Component {
  state = {
    loggedIn: false,
  }
  componentDidMount = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }
    });
  }
  onHeaderClickHandler = (page) => {
    Router.push(page);
  };
  onHeroClickHandler = () => {
    Router.push('/register');
  };
  onPressClickHandler = link => () => {
    Router.push(link);
  };
  onHeroPublishClickHandler = () => {
    Router.push('/register');
  };
  onPriceClickHandler = plan => () => {
    Router.push({ pathname: '/register', query: { plan } });
  };
  onFooterCallToActionClickHandler = () => {
    Router.push('/register');
  };
  onFooterClickHandler = link => () => {
    Router.push(link);
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header
          header={index.header}
          onClickHandler={this.onHeaderClickHandler}
          loggedIn={this.state.loggedIn}
        />
        <Hero image={index.hero[0].image}>
          <Typography type="display1" color="inherit" className={classes.heroTitle} >
            {index.hero[0].text1}
          </Typography>
          <Typography type="display1" color="inherit" className={classes.heroSubTitle} >
            {index.hero[0].text2}
          </Typography>
          <Button raised color="primary" className={classes.heroCallToAction} onClick={this.onHeroClickHandler} >
            {index.hero[0].button}
          </Button>
        </Hero>
        <Press press={index.press} handleClick={this.onPressClickHandler} />
        <Section title={index.features.title}>
          <Features features={index.features.items} />
        </Section>
        <Quote
          quote={index.quotes[0].quote}
          author={index.quotes[0].author}
        />
        <Section title={index.benefits.title}>
          <Benefits benefits={index.benefits.items} />
        </Section>
        <Hero image={index.hero[1].image}>
          <Typography type="body1" color="inherit" className={classes.publishTitle} >
            {index.hero[1].text1}
          </Typography>
          <Typography type="body1" color="inherit" className={classes.publishSubTitle} >
            {index.hero[1].text2}
          </Typography>
          <PublishLink link={index.publish.link} />
          <Button raised color="primary" className={classes.publishCallToAction} onClick={this.onHeroPublishClickHandler} >
            {index.hero[1].button}
          </Button>
          <PublishFeatures items={index.publish.items} />
        </Hero>
        <Section title={index.prices.title}>
          <Prices items={index.prices.items} handleClick={this.onPriceClickHandler} />
        </Section>
        <Quote
          quote={index.quotes[1].quote}
          author={index.quotes[1].author}
        />
        <Section
          title={index.section.title}
          icon={<LightbulbOutlineIcon className={classes.footerCallToActionIcon} />}
        >
          <Button raised color="accent" className={classes.footerCallToAction} onClick={this.onFooterCallToActionClickHandler}>
            {index.section.button}
          </Button>
        </Section>
        <Footer
          text={index.footer.text}
          items={index.footer.items}
          handleClick={this.onFooterClickHandler}
        />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
