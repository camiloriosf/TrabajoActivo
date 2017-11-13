// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import { common } from 'material-ui/colors';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import LockOutlineIcon from 'material-ui-icons/LockOutline';
import TimelineIcon from 'material-ui-icons/Timeline';
import AvTimerIcon from 'material-ui-icons/AvTimer';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import LightbulbOutlineIcon from 'material-ui-icons/LightbulbOutline';
import DescriptionIcon from 'material-ui-icons/Description';
import LanguageIcon from 'material-ui-icons/Language';
import CloudDownloadIcon from 'material-ui-icons/CloudDownload';
import SettingsIcon from 'material-ui-icons/Settings';
import BorderClearIcon from 'material-ui-icons/BorderClear';
import BorderInnerIcon from 'material-ui-icons/BorderInner';
import BorderAllIcon from 'material-ui-icons/BorderAll';
// component imports
import Header from '../components/index/header';
import Hero from '../components/index/hero';
import Press from '../components/index/press';
import PressItem from '../components/index/pressItem';
import Section from '../components/index/section';
import Features from '../components/index/features';
import FeaturesItem from '../components/index/featuresItem';
import Quote from '../components/index/quote';
import Benefits from '../components/index/benefits';
import BenefitsItem from '../components/index/benefitsItem';
import PublishLink from '../components/index/publishLink';
import PublishFeatures from '../components/index/publishFeatures';
import PublishFeaturesItem from '../components/index/publishFeaturesItem';
import Prices from '../components/index/prices';
import PricesItem from '../components/index/pricesItem';
import Footer from '../components/index/footer';
import FooterItem from '../components/index/footerItem';

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
  features: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  featuresIcon: {
    margin: theme.spacing.unit, color: theme.palette.primary[500], width: 36, height: 36,
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
  publishFeaturesItemIcon: {
    color: theme.palette.common.darkWhite,
    width: 50,
    height: 50,
    [theme.breakpoints.down('sm')]: {
      width: 20,
      height: 20,
    },
  },
  pricesItemIcon: {
    color: theme.palette.primary[500], width: 36, height: 36,
  },
  footerCallToAction: {
    marginTop: 20, fontSize: 20, marginBottom: 80,
  },
  footerCallToActionIcon: {
    color: theme.palette.common.white, width: 30, height: 30,
  },
});

const blogLinks = [
  { title: 'All posts', link: '/blog' },
  { title: 'Resume Examples', link: '/blog/resume-examples' },
  { title: 'Resume Writing', link: '/blog/resume-writing' },
  { title: 'Cover Letter', link: '/blog/cover-letter' },
  { title: 'Job Interviews', link: '/blog/job-interviews' },
  { title: 'Job Search', link: '/blog/job-search' },
];

const accountLinks = [
  { title: 'Log In', link: '/login' },
  { title: 'Sign Up', link: '/register' },
];

const links = [
  {
    title: 'Resume Builder', link: '/cv-templates', backdrop: common.white, menu: false, menuItem: null,
  },
  {
    title: 'Blog', link: '/blog', backdrop: common.white, menu: true, menuItem: blogLinks,
  },
  {
    title: 'About Us', link: '/about', backdrop: common.white, menu: false, menuItem: null,
  },
  {
    title: 'Contact Us', link: '/contact', backdrop: common.white, menu: false, menuItem: null,
  },
  {
    title: 'My Account', link: '/account', backdrop: common.white, menu: true, menuItem: accountLinks,
  },
];

const priceFeaturesStarter = [
  { text: 'Resume template' }, { text: 'Create 1 resume' }, { text: 'Expert tips' }, { text: 'Share resume online' },
];

const priceFeaturesPremium = [
  { text: 'Everything from Starter +' }, { text: 'Multiple resumes' }, { text: 'Online tests' }, { text: 'Track your resume' },
];

const priceFeaturesProfessional = [
  { text: 'Everything from Premium +' }, { text: 'Videos' }, { text: 'Expert feedback' }, { text: 'Applications tracking' },
];

class Index extends Component {
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
        <Header title="eCV" onClickHandler={this.onHeaderClickHandler} items={links} />
        <Hero image="/static/images/editor_bg.jpg">
          <Typography type="display1" color="inherit" className={classes.heroTitle} >
            {'Resume Builder Online'}
          </Typography>
          <Typography type="display1" color="inherit" className={classes.heroSubTitle} >
            {'Fast. Easy to Use. Professional.'}
          </Typography>
          <Button raised color="primary" className={classes.heroCallToAction} onClick={this.onHeroClickHandler} >
            {'create my resume now'}
          </Button>
        </Hero>
        <Press >
          <PressItem
            image="/static/images/press/the-guardian"
            link="/we-are-famous"
            alt="the-guardian"
            handleClick={this.onPressClickHandler}
          />
          <PressItem
            image="/static/images/press/the-huffington-post"
            link="/we-are-famous"
            alt="the-huffington-post"
            handleClick={this.onPressClickHandler}
          />
          <PressItem
            image="/static/images/press/lifehacker"
            link="/we-are-famous"
            alt="lifehacker"
            handleClick={this.onPressClickHandler}
          />
          <PressItem
            image="/static/images/press/business"
            link="/we-are-famous"
            alt="business"
            handleClick={this.onPressClickHandler}
          />
          <PressItem
            image="/static/images/press/tech-co"
            link="/we-are-famous"
            alt="tech-co"
            handleClick={this.onPressClickHandler}
          />
          <PressItem
            image="/static/images/press/recruiter"
            link="/we-are-famous"
            alt="recruiter"
            handleClick={this.onPressClickHandler}
          />
          <PressItem
            image="/static/images/press/workopolis"
            link="/we-are-famous"
            alt="workopolis"
            handleClick={this.onPressClickHandler}
          />
        </Press>
        <Section title="What are the benefits of Uptowork’s online resume maker?">
          <Features>
            <FeaturesItem
              title="Cover Letter Builder"
              body="Write a cover letter using the same templates as your resume."
              icon={<LockOutlineIcon className={classes.featuresIcon} />}
            />
            <FeaturesItem
              title="Track Your Resume"
              body="Find out if employers are reading and downloading your resumes."
              icon={<TimelineIcon className={classes.featuresIcon} />}
            />
            <FeaturesItem
              title="It's Fast and Easy to Use"
              body="Our online resume builder will help you write a perfect resume in minutes."
              icon={<AvTimerIcon className={classes.featuresIcon} />}
            />
            <FeaturesItem
              title="20 Best Resume Templates"
              body="Create a modern and professional resume and cover letter."
              icon={<StarBorderIcon className={classes.featuresIcon} />}
            />
            <FeaturesItem
              title="Follow Tips From Experts"
              body="Our experts' tips will show you how to write a resume."
              icon={<LightbulbOutlineIcon className={classes.featuresIcon} />}
            />
            <FeaturesItem
              title="Flexible Text Editor"
              body="You will have access to the best text editor available."
              icon={<DescriptionIcon className={classes.featuresIcon} />}
            />
          </Features>
        </Section>
        <Quote
          quote="I found an article about how to write a professional resume on Uptowork. Then I discovered the application. It's useful and simple to use. It's not a free resume builder, but I guess you can't have everything."
          author="~ Thomas Freeman"
        />
        <Section title="Why is Uptowork the best resume builder online?">
          <Benefits>
            <BenefitsItem
              title="Professional Resume Templates"
              body="Choose professional, elegant, creative, or modern resume templates. Uptowork's resume maker offers 20 templates in 400 colors. You can easily adapt the designs to any resume format you choose: functional, reverse-chronological, or combination."
              image="/static/images/benefits/uptowork-resume-builder-screenshot-editor.png"
            />
            <BenefitsItem
              title="Tips From Recruiters"
              body="You no longer have to worry about how to make a resume. Our resume generator will guide you through the process of writing each section, step-by-step. Resume writing tips will help you get more job offers."
              image="/static/images/benefits/tooltip.png"
              reverse
            />
            <BenefitsItem
              title="Edit Your Resume As You Like"
              body="Choose font types, sizes, and spacing. You can bold, italicize, and underline your text. Want to add live URLs? We've got you covered. It's like creating your resume in Word, but we take care of the formatting, and give you access to the best resume templates."
              image="/static/images/benefits/uptowork-resume-builder-screenshot-editor.png"
            />
            <BenefitsItem
              title="Cover Letter and Resume Builder"
              body="Create your professional Cover Letter in just a few simple steps. Use the same template for your cover letter and resume. Convince hiring managers to set up an interview with you."
              image="/static/images/benefits/iconic-9.png"
              reverse
              noDivider
            />
          </Benefits>
        </Section>
        <Hero image="/static/images/editor_bg.jpg">
          <Typography type="body1" color="inherit" className={classes.publishTitle} >
            {'Write and publish your professional resume online.'}
          </Typography>
          <Typography type="body1" color="inherit" className={classes.publishSubTitle} >
            {'Use your online resume to attract employers. Track your performance.'}
          </Typography>
          <PublishLink link="https://uptowork.com/mycv/johnsmith" />
          <Button raised color="primary" className={classes.publishCallToAction} onClick={this.onHeroPublishClickHandler} >
            {'go to resume builder'}
          </Button>
          <PublishFeatures>
            <PublishFeaturesItem
              text="Create an individual URL for your online resume."
              icon={<LanguageIcon className={classes.publishFeaturesItemIcon} />}
            />
            <PublishFeaturesItem
              text="Employers can view and download your resume."
              icon={<CloudDownloadIcon className={classes.publishFeaturesItemIcon} />}
            />
            <PublishFeaturesItem
              text="Track how many employers view and download your resume."
              icon={<TimelineIcon className={classes.publishFeaturesItemIcon} />}
            />
            <PublishFeaturesItem
              text="Edit, publish and download your resumes any time you want."
              icon={<SettingsIcon className={classes.publishFeaturesItemIcon} />}
            />
          </PublishFeatures>
        </Hero>
        <Section title="Choose the plan that best fits you">
          <Prices>
            <PricesItem
              icon={<BorderClearIcon className={classes.pricesItemIcon} />}
              name="Starter"
              features={priceFeaturesStarter}
              price="Free"
              free
              handleClick={this.onPriceClickHandler}
            />
            <PricesItem
              icon={<BorderInnerIcon className={classes.pricesItemIcon} />}
              name="Premium"
              features={priceFeaturesPremium}
              price="9"
              handleClick={this.onPriceClickHandler}
            />
            <PricesItem
              icon={<BorderAllIcon className={classes.pricesItemIcon} />}
              name="Professional"
              features={priceFeaturesProfessional}
              price="19"
              handleClick={this.onPriceClickHandler}
            />
          </Prices>
        </Section>
        <Quote
          quote="Uptowork's CV builder is fast and easy to use. I loved the great resume templates, and I loved the fact that I can have my cover letter in the same design."
          author="~ Mark Horotsky"
        />
        <Section title="Try Uptowork's professional resume builder now." icon={<LightbulbOutlineIcon className={classes.footerCallToActionIcon} />}>
          <Button raised color="accent" className={classes.footerCallToAction} onClick={this.onFooterCallToActionClickHandler}>
            Create my resume now
          </Button>
        </Section>
        <Footer text="© 2016 - 2017 Uptowork. All rights reserved.">
          <FooterItem handleClick={this.onFooterClickHandler} link="/about" text="About Us" divider />
          <FooterItem handleClick={this.onFooterClickHandler} link="/contact" text="Contact Us" divider />
          <FooterItem handleClick={this.onFooterClickHandler} link="/terms" text="Terms of Service" divider />
          <FooterItem handleClick={this.onFooterClickHandler} link="/privacy" text="Privacy Policy" />
        </Footer>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
