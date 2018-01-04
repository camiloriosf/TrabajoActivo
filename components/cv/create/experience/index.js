// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// component imports
import SectionHeader from '../sectionHeader';
import TipCard from '../tipCard';
import ExamplesSteppter from '../examplesStepper';
import Example from './example';
import Item from './item';
import AddNew from './addNew';
// local imports
import {
  doReorderSectionItems,
  doSectionDBUpdate,
  doUpdateSectionDataArray,
  doAddNewExperience,
  doDeleteSectionItem,
  doUpdateExperienceListItem,
  doAddExperienceListItem,
  doDeleteExperienceListItem,
  doChangeSectionTitle,
} from '../../../../lib/redux/actions/cv';
import { makeGetSectionDataState } from '../../../../lib/reselect/cv';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  content: {
    marginTop: theme.spacing.unit * 3,
  },
  tipTitle: {
    marginTop: theme.spacing.unit * 3,
  },
  tipSubtitle: {
    marginTop: theme.spacing.unit,
  },
});

const getItemStyle = (draggableStyle, isDragging) => ({
  background: isDragging ? 'rgba(0, 0, 0, 0.12)' : 'inherit',
  ...draggableStyle,
});

class Index extends Component {
  componentDidMount = () => {
    this.delayedSaving = _.debounce(this.props.doSectionDBUpdate, 2000);
  }
  onDragEnd = (result) => {
    this.props.doReorderSectionItems(result);
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onInputChange = ({ name, value, index }) => {
    this.props.doUpdateSectionDataArray({ name, value, index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onExperienceAdd = ({ index }) => () => {
    this.props.doAddNewExperience({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onExperienceDelete = ({ index }) => () => {
    this.props.doDeleteSectionItem({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onListItemChange = ({ type, companyIndex, index }) => (event) => {
    this.props.doUpdateExperienceListItem({
      type, companyIndex, index, value: event.target.value,
    });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onListItemAdd = ({ type, companyIndex, index }) => () => {
    this.props.doAddExperienceListItem({ type, companyIndex, index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onListItemDelete = ({ type, companyIndex, index }) => () => {
    this.props.doDeleteExperienceListItem({ type, companyIndex, index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onListItemKeyPress = ({ type, companyIndex, index }) => (event) => {
    if (event.keyCode === 13) {
      this.props.doAddExperienceListItem({ type, companyIndex, index });
      this.delayedSaving({ selected: this.props.cv.id });
    }
  }
  onSectionTitleEdit = ({ id }) => (event) => {
    this.props.doChangeSectionTitle({ id, value: event.target.value });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  render() {
    const {
      classes,
      t,
      cv,
    } = this.props;
    return (
      <div className={classes.root}>
        <SectionHeader
          title={cv.text !== '' ? cv.text : t('create.sections.experience.title')}
          subtitle={t('create.sections.experience.subtitle')}
          id={cv.id}
          editable
          handleTitleEdit={this.onSectionTitleEdit}
        >
          <div className={classes.content}>
            <Divider />
            <Grid container >
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.experience.tips.title1')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.experience.tips.text1')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.experience.tips.title2')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.experience.tips.text2')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.experience.tips.title3')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.experience.tips.text3')}
                </Typography>
                <TipCard text={t('create.sections.experience.tips.tip1')} />
              </Grid>
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.experience.tips.title4')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.experience.tips.text4')}
                </Typography>
                <TipCard text={t('create.sections.experience.tips.tip2')} />
              </Grid>
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.experience.tips.title5')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.experience.tips.text5')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.experience.tips.title6')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.experience.tips.text6')}
                </Typography>
                <TipCard text={t('create.sections.experience.tips.tip3')} />
              </Grid>
              <Grid item xs={12}>
                <ExamplesSteppter
                  items={[
                    <Example
                      position={t('create.sections.experience.examples.items.0.position')}
                      company={t('create.sections.experience.examples.items.0.company')}
                      dates={t('create.sections.experience.examples.items.0.dates')}
                      responsibilities={t('create.sections.experience.examples.items.0.responsibilities')}
                      achievements={t('create.sections.experience.examples.items.0.achievements')}
                      responsibility={t('create.sections.experience.examples.responsibility')}
                      achievement={t('create.sections.experience.examples.achievement')}
                    />,
                    <Example
                      position={t('create.sections.experience.examples.items.1.position')}
                      company={t('create.sections.experience.examples.items.1.company')}
                      dates={t('create.sections.experience.examples.items.1.dates')}
                      responsibilities={t('create.sections.experience.examples.items.1.responsibilities')}
                      achievements={t('create.sections.experience.examples.items.1.achievements')}
                      responsibility={t('create.sections.experience.examples.responsibility')}
                      achievement={t('create.sections.experience.examples.achievement')}
                    />,
                    <Example
                      position={t('create.sections.experience.examples.items.2.position')}
                      company={t('create.sections.experience.examples.items.2.company')}
                      dates={t('create.sections.experience.examples.items.2.dates')}
                      responsibilities={t('create.sections.experience.examples.items.2.responsibilities')}
                      achievements={t('create.sections.experience.examples.items.2.achievements')}
                      responsibility={t('create.sections.experience.examples.responsibility')}
                      achievement={t('create.sections.experience.examples.achievement')}
                    />,
                    <Example
                      position={t('create.sections.experience.examples.items.3.position')}
                      company={t('create.sections.experience.examples.items.3.company')}
                      dates={t('create.sections.experience.examples.items.3.dates')}
                      responsibilities={t('create.sections.experience.examples.items.3.responsibilities')}
                      achievements={t('create.sections.experience.examples.items.3.achievements')}
                      responsibility={t('create.sections.experience.examples.responsibility')}
                      achievement={t('create.sections.experience.examples.achievement')}
                    />,
                  ]}
                />
              </Grid>
            </Grid>
          </div>
        </SectionHeader>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                ref={provided.innerRef}
              >
                {_.sortBy(cv.data, ['index']).map(item => (
                  <Draggable key={item.index} draggableId={item.index}>
                    {(providedDraggabke, snapshotDraggable) => (
                      <div>
                        <div
                          ref={providedDraggabke.innerRef}
                          style={getItemStyle(
                                      providedDraggabke.draggableStyle,
                                      snapshotDraggable.isDragging,
                                    )}
                        >
                          <Item
                            index={item.index}
                            role={item.role}
                            company={item.company}
                            from={item.from}
                            to={item.to}
                            actual={item.actual}
                            responsibilities={item.responsibilities}
                            achievements={item.achievements}
                            description={item.description}
                            dragprops={providedDraggabke.dragHandleProps}
                            handleChange={this.onInputChange}
                            handleExperienceAdd={this.onExperienceAdd}
                            handleExperienceDelete={this.onExperienceDelete}
                            handleListItemChange={this.onListItemChange}
                            handleListItemAdd={this.onListItemAdd}
                            handleListItemDelete={this.onListItemDelete}
                            handleListItemKeyPress={this.onListItemKeyPress}
                          />
                        </div>
                        {providedDraggabke.placeholder}
                      </div>
                              )}
                  </Draggable>
                          ))}
                {provided.placeholder}
              </div>
                  )}
          </Droppable>
        </DragDropContext>
        <AddNew
          index={cv.data.length}
          handleExperienceAdd={this.onExperienceAdd}
        />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const makeMapStateToProps = () => {
  const getDataState = makeGetSectionDataState();
  return (state, props) => getDataState(state, props);
};

const mapDispatchToProps = dispatch => ({
  doReorderSectionItems: bindActionCreators(doReorderSectionItems, dispatch),
  doSectionDBUpdate: bindActionCreators(doSectionDBUpdate, dispatch),
  doUpdateSectionDataArray: bindActionCreators(doUpdateSectionDataArray, dispatch),
  doAddNewExperience: bindActionCreators(doAddNewExperience, dispatch),
  doDeleteSectionItem: bindActionCreators(doDeleteSectionItem, dispatch),
  doUpdateExperienceListItem: bindActionCreators(doUpdateExperienceListItem, dispatch),
  doAddExperienceListItem: bindActionCreators(doAddExperienceListItem, dispatch),
  doDeleteExperienceListItem: bindActionCreators(doDeleteExperienceListItem, dispatch),
  doChangeSectionTitle: bindActionCreators(doChangeSectionTitle, dispatch),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(Index)));
