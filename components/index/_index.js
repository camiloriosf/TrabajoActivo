/* eslint-disable jsx-a11y/anchor-is-valid */
// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Link from 'next/link';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import LightbulbOutlineIcon from 'material-ui-icons/LightbulbOutline';
// component imports
import Header from './header';
import Hero from './hero';
// import Press from './press';
import Section from './section';
import Features from './features';
import Quote from './quote';
import Benefits from './benefits';
import PublishLink from './publishLink';
import PublishFeatures from './publishFeatures';
// import Prices from './prices';
import Footer from './footer';
// local imports
import { app } from '../../lib/google/firebase';

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
  link: {
    textDecoration: 'none',
  },
});

class Index extends Component {
  state = {
    loggedIn: false,
  }
  componentDidMount = () => {
    this.mounted = true;
    app.auth().onAuthStateChanged((user) => {
      if (user && this.mounted) this.setState({ loggedIn: true });
    });
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.loggedIn === nextState.loggedIn) return false;
    return true;
  }
  componentWillUnmount = () => {
    this.mounted = false;
  }
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header loggedIn={this.state.loggedIn} />
        <Hero image={t('hero.0.image')}>
          <Typography type="display1" color="inherit" className={classes.heroTitle} >
            {t('hero.0.text1')}
          </Typography>
          <Typography type="display1" color="inherit" className={classes.heroSubTitle} >
            {t('hero.0.text2')}
          </Typography>
          <Link href="/register">
            <a className={classes.link}>
              <Button raised color="primary" className={classes.heroCallToAction} >
                {t('hero.0.button')}
              </Button>
            </a>
          </Link>
        </Hero>
        {/* <Press /> */}
        <Section title={t('features.title')}>
          <Features />
        </Section>
        <Quote
          quote={t('quotes.0.quote')}
          author={t('quotes.0.author')}
        />
        <Section title={t('benefits.title')}>
          <Benefits />
        </Section>
        <Hero image={t('hero.1.image')}>
          <Typography type="body1" color="inherit" className={classes.publishTitle} >
            {t('hero.1.text1')}
          </Typography>
          <Typography type="body1" color="inherit" className={classes.publishSubTitle} >
            {t('hero.1.text2')}
          </Typography>
          <PublishLink link={t('publish.link')} />
          <Link href="/register">
            <a className={classes.link}>
              <Button raised color="primary" className={classes.publishCallToAction} >
                {t('hero.1.button')}
              </Button>
            </a>
          </Link>
          <PublishFeatures />
        </Hero>
        {/* <Section title={t('prices.title')}>
          <Prices />
        </Section>
        <Quote
          quote={t('quotes.1.quote')}
          author={t('quotes.1.author')}
        /> */}
        <Section
          title={t('section.title')}
          icon={<LightbulbOutlineIcon className={classes.footerCallToActionIcon} />}
        >
          <Link href="/register">
            <a className={classes.link}>
              <Button raised color="accent" className={classes.footerCallToAction} onClick={this.onFooterCallToActionClickHandler}>
                {t('section.button')}
              </Button>
            </a>
          </Link>
        </Section>
        <Footer />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('index')(withStyles(styles)(Index));
