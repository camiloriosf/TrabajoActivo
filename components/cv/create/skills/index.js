// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import _ from 'lodash';
import { translate } from 'react-i18next';
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
import Item from './item';
import AddNew from './addNew';
// local imports
import {
  doSectionDBUpdate,
  doUpdateSectionDataArray,
  doReorderSectionItems,
  doAddNewSkill,
  doDeleteSectionItem,
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
  onInputChange = ({ name, index }) => (event) => {
    this.props.doUpdateSectionDataArray({
      name, value: event.target.value, index,
    });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onSkillAdd = ({ index }) => () => {
    this.props.doAddNewSkill({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onSkillDelete = ({ index }) => () => {
    this.props.doDeleteSectionItem({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onStarChange = ({ name, value, index }) => {
    this.props.doUpdateSectionDataArray({ name, value, index });
    this.delayedSaving({ selected: this.props.cv.id });
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
          title={cv.text !== '' ? cv.text : t('create.sections.skills.title')}
          subtitle={t('create.sections.skills.subtitle')}
          id={cv.id}
          editable
          handleTitleEdit={this.onSectionTitleEdit}
        >
          <div className={classes.content}>
            <Divider />
            <Grid container >
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.skills.tips.title')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.skills.tips.text1')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.skills.tips.text2')}<strong>{t('create.sections.skills.tips.text3')}</strong>
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.skills.tips.text4')}<strong>{t('create.sections.skills.tips.text5')}</strong>
                </Typography>
                <TipCard text={t('create.sections.skills.tips.tip1')} />
                <TipCard text={t('create.sections.skills.tips.tip2')} wrong />
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.skills.tips.text6')}<strong>{t('create.sections.skills.tips.text7')}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ExamplesSteppter
                  items={[
                    <Typography type="body2">{t('create.sections.skills.examples.0')}</Typography>,
                    <Typography type="body2">{t('create.sections.skills.examples.1')}</Typography>,
                    <Typography type="body2">{t('create.sections.skills.examples.2')}</Typography>,
                    <Typography type="body2">{t('create.sections.skills.examples.3')}</Typography>,
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
                    {(providedDraggable, snapshotDraggable) => (
                      <div>
                        <div
                          ref={providedDraggable.innerRef}
                          style={getItemStyle(
                                      providedDraggable.draggableStyle,
                                      snapshotDraggable.isDragging,
                                    )}
                        >
                          <Item
                            index={item.index}
                            skill={item.skill}
                            description={item.description}
                            stars={item.stars}
                            dragprops={providedDraggable.dragHandleProps}
                            handleChange={this.onInputChange}
                            handleSkillAdd={this.onSkillAdd}
                            handleSkillDelete={this.onSkillDelete}
                            handleStarChange={this.onStarChange}
                          />
                        </div>
                        {providedDraggable.placeholder}
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
          handleSkillAdd={this.onSkillAdd}
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
  doSectionDBUpdate: bindActionCreators(doSectionDBUpdate, dispatch),
  doReorderSectionItems: bindActionCreators(doReorderSectionItems, dispatch),
  doUpdateSectionDataArray: bindActionCreators(doUpdateSectionDataArray, dispatch),
  doAddNewSkill: bindActionCreators(doAddNewSkill, dispatch),
  doDeleteSectionItem: bindActionCreators(doDeleteSectionItem, dispatch),
  doChangeSectionTitle: bindActionCreators(doChangeSectionTitle, dispatch),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(Index)));
