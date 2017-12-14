/* eslint-disable no-use-before-define */
import _ from 'lodash';
import update from 'immutability-helper';
import Router from 'next/router';
import { app, db } from '../../google/firebase';
import {
  CV_LOAD_ALL,
  CV_LOAD,
  CV_RESET,
  CV_SECTION_SELECTED_CHANGE,
  CV_NAV_CHANGE,
  CV_LOAD_ERROR,
  CV_SECTIONS_UPDATE,
  CV_SECTIONS_UPDATE_DB_OK,
  CV_SECTIONS_UPDATE_DB_ERROR,
  CV_SECTION_UPDATE_DB_OK,
  CV_SECTION_UPDATE_DB_ERROR,
  CV_SNACK_CHANGE,
  CV_NAME_CHANGE,
  CV_SECTION_DATA_CHANGE,
  CV_ACTION_DIALOG_OPEN,
  CV_BUTTONS_BLOCKED,
  CV_ACTIVE_STATUS_CHANGE,
  CV_EDIT_DIALOG_OPEN,
} from '../types';
import {
  createCVSections,
  loadCVSections,
} from '../utils/cv';

// **** CV ACTIONS ****
// get all CVs from DB of current user
// export const getData = () => async (dispatch, getState) => {
//   const {
//     uid,
//   } = getState().user;
//   const cvDoc = await db.collection('cvs').where('userId', '==', uid)
//     .get();
//   if (cvDoc.empty) dispatch({ type: CV_UPDATE_DATA, payload: [] });
//   else {
//     const data = cvDoc.docs.map((cv) => {
//       const {
//         name,
//         visits,
//         active,
//         updatedAt,
//       } = cv.data();
//       return {
//         id: cv.id, name, visits, active, updatedAt: updatedAt.toLocaleString(),
//       };
//     });
//     dispatch({ type: CV_UPDATE_DATA, payload: data });
//   }
// };
// create new CV in DB
// export const createCV = ({ name = '' }) => async (dispatch, getState) => {
//   dispatch({ type: CV_BLOCK_BUTTONS, payload: true });
//   const {
//     uid,
//   } = getState().user;
//   const userRef = await db.collection('users').doc(uid).get();
//   const cvsRef = await db.collection('cvs').where('userId', '==', uid).get();
//   if (userRef.data().plan === 'Starter' && cvsRef.docs.length > 0) {
//     dispatch({ type: COMMON_ACTION_DIALOG, payload: true });
//     dispatch({ type: CV_BLOCK_BUTTONS, payload: false });
//   } else {
//     const cvDoc = await db.collection('cvs')
//       .add({
//         userId: uid,
//         name,
//         updatedAt: app.firestore.FieldValue.serverTimestamp(),
//         visits: 0,
//         active: true,
//       });
//     const href = `/cv/create?id=${cvDoc.id}`;
//     const as = `/cv/create/${cvDoc.id}`;
//     Router.push(href, as);
//     dispatch(getData());
//     dispatch({ type: CV_BLOCK_BUTTONS, payload: false });
//   }
// };
// update active status of all CVs in DB
// export const saveActiveChange = () => async (dispatch, getState) => {
//   const { data } = getState().cv;
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const batch = db.batch();
//   data.forEach((item) => {
//     batch.update(
//       db.collection('cvs').doc(item.id),
//       {
//         active: item.active,
//       },
//     );
//   });
//   batch.commit()
//     .then(() => {
//       dispatch(handleSnack({ openSnackSaved: true }));
//     })
//     .catch(() => {
//       dispatch(handleSnack({ openSnackError: true }));
//     });
// };
// update store active status of cv
// export const changeItemActive = ({ id, value }) => async (dispatch, getState) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const {
//     data,
//   } = getState().cv;
//   const index = _.findIndex(data, cv => cv.id === id);
//   dispatch({ type: CV_CHANGE_ACTIVE, payload: { index, value } });
// };
// duplicate CV
// export const handleCVCopy = ({ id }) => async (dispatch, getState) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const { uid } = getState().user;
//   const { data } = getState().cv;
//   const userRef = await db.collection('users').doc(uid).get();
//   const cvsRef = await db.collection('cvs').where('userId', '==', uid).get();
//   if (userRef.data().plan === 'Starter' && cvsRef.docs.length > 0) {
//     dispatch({ type: COMMON_ACTION_DIALOG, payload: true });
//     dispatch({ type: CV_BLOCK_BUTTONS, payload: false });
//     dispatch(handleSnack({ openSnackError: true }));
//   } else {
//     const cv = _.find(data, item => item.id === id);
//     const cvDoc = await db.collection('cvs')
//       .add({
//         userId: uid,
//         name: `${cv.name}_copy`,
//         updatedAt: app.firestore.FieldValue.serverTimestamp(),
//         visits: 0,
//         active: true,
//       });
//     const sectionsDoc = await db.collection('cvs').doc(id).collection('sections').get();
//     if (!sectionsDoc.empty) {
//       const batch = db.batch();
//       sectionsDoc.docs.forEach((section) => {
//         batch.set(
//           db.collection('cvs').doc(cvDoc.id).collection('sections').doc(section.id),
//           {
//             order: section.data().order,
//             text: section.data().text,
//             hidden: section.data().hidden,
//             icon: section.data().icon,
//             dragButton: section.data().dragButton,
//             hideButton: section.data().hideButton,
//             data: !section.data().data ? null : section.data().data,
//           },
//           { merge: true },
//         );
//       });
//       batch.commit()
//         .then(async () => {
//           dispatch(getData());
//           dispatch(handleSnack({ openSnackSaved: true }));
//         })
//         .catch(() => {
//           dispatch(handleSnack({ openSnackError: true }));
//         });
//     }
//   }
// };
// delete CV
// export const handleCVDelete = ({ id }) => async (dispatch) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const sectionsDoc = await db.collection('cvs').doc(id).collection('sections').get();
//   if (!sectionsDoc.empty) {
//     const batch = db.batch();
//     sectionsDoc.docs.forEach((section) => {
//       batch.delete(section.ref);
//     });
//     batch.commit()
//       .then(async () => {
//         await db.collection('cvs').doc(id).delete()
//           .then(() => {
//             dispatch(getData());
//             dispatch(handleSnack({ openSnackSaved: true }));
//           })
//           .catch(() => {
//             dispatch(handleSnack({ openSnackError: true }));
//           });
//       })
//       .catch(() => {
//         dispatch(handleSnack({ openSnackError: true }));
//       });
//   } else {
//     await db.collection('cvs').doc(id).delete()
//       .then(() => {
//         dispatch(getData());
//         dispatch(handleSnack({ openSnackSaved: true }));
//       })
//       .catch(() => {
//         dispatch(handleSnack({ openSnackError: true }));
//       });
//   }
// };

// **** CV CREATE ACTIONS ****
// get all data of selected CV
// export const getCvData = id => async (dispatch) => {
//   const cv = await db.collection('cvs').doc(id)
//     .get();
//   if (cv.exists) {
//     const baseDoc = await db.collection('cvs').doc('base').get();
//     if (baseDoc.exists) {
//       const {
//         sections,
//       } = baseDoc.data();
//       const sectionsDoc = await db.collection('cvs').doc(id).collection('sections').get();
//       if (sectionsDoc.empty) {
//         await Promise.all(sections.map(async (item) => {
//           await db.collection('cvs').doc(id).collection('sections').doc(item.id)
//             .set({
//               order: item.order,
//               text: item.text,
//               hidden: item.hidden,
//               icon: item.icon,
//               dragButton: item.dragButton,
//               hideButton: item.hideButton,
//             }, { merge: true });
//         }));
//         dispatch({
//           type: CV_CREATE_GET_DATA,
//           payload: { id: cv.id, name: cv.data().name, sections },
//         });
//       } else {
//         const items = [];
//         sectionsDoc.docs.forEach((item) => {
//           const {
//             order,
//             hidden,
//             data = null,
//           } = item.data();
//           const newItem = _.find(sections, section => section.id === item.id);
//           newItem.order = order;
//           newItem.hidden = hidden;
//           newItem.data = data;
//           items.push(newItem);
//         });
//         const sortedItems = _.sortBy(items, ['order']);
//         if (sortedItems.length >= sections.length) {
//           dispatch({
//             type: CV_CREATE_GET_DATA,
//             payload: { id: cv.id, name: cv.data().name, sections: sortedItems },
//           });
//         } else {
//           const batch = db.batch();
//           sections.forEach(async (item) => {
//             if (!_.find(sortedItems, section => section.id === item.id)) {
//               const newItem = item;
//               newItem.order = sortedItems.length;
//               batch.set(
//                 db.collection('cvs').doc(id).collection('sections').doc(newItem.id),
//                 {
//                   order: newItem.order,
//                   text: newItem.text,
//                   hidden: newItem.hidden,
//                   icon: newItem.icon,
//                   dragButton: newItem.dragButton,
//                   hideButton: newItem.hideButton,
//                 },
//                 { merge: true },
//               );
//               sortedItems.push(newItem);
//             }
//           });
//           batch.commit()
//             .then(() => {
//               dispatch({
//                 type: CV_CREATE_GET_DATA,
//                 payload: { id: cv.id, name: cv.data().name, sections: sortedItems },
//               });
//             });
//         }
//       }
//     }
//   }
// };
// reset store create.data when user leaves CV/Create page
// export const resetData = () => async (dispatch) => {
//   dispatch({ type: CV_CREATE_RESET_DATA });
// };
// update selected section
// export const handleItemClick = id => async (dispatch, getState) => {
//   dispatch({ type: CV_CREATE_CHANGE_SELECTED, payload: id });

//   const items = getState().cv.create.sections;
//   const index = _.findIndex(items, section => section.id === id);
//   if (
//     id === 'personal'
//   ) dispatch({ type: CV_CREATE_CHANGE_NAV, payload: { first: true, last: false } });
//   else if (
//     index + 1 === items.length
//   ) dispatch({ type: CV_CREATE_CHANGE_NAV, payload: { first: false, last: true } });
//   else dispatch({ type: CV_CREATE_CHANGE_NAV, payload: { first: false, last: false } });
// };
// update store nav arrows
// export const handleNavClick = action => async (dispatch, getState) => {
//   const {
//     sections,
//     selected,
//   } = getState().cv.create;
//   const item = _.find(sections, section => section.id === selected);
//   if (action === 'right') {
//     const toItem = _.find(sections, section => section.order === item.order + 1);
//     if (toItem && toItem.order === 0) {
//       dispatch({ type: CV_CREATE_CHANGE_SELECTED, payload: toItem.id });
//       dispatch({ type: CV_CREATE_CHANGE_NAV, payload: { first: true, last: false } });
//     } else if (toItem && toItem.order + 1 === sections.length) {
//       dispatch({ type: CV_CREATE_CHANGE_SELECTED, payload: toItem.id });
//       dispatch({ type: CV_CREATE_CHANGE_NAV, payload: { first: false, last: true } });
//     } else if (toItem) {
//       dispatch({ type: CV_CREATE_CHANGE_SELECTED, payload: toItem.id });
//       dispatch({ type: CV_CREATE_CHANGE_NAV, payload: { first: false, last: false } });
//     }
//   } else {
//     const toItem = _.find(sections, section => section.order === item.order - 1);
//     if (toItem && toItem.order === 0) {
//       dispatch({ type: CV_CREATE_CHANGE_SELECTED, payload: toItem.id });
//       dispatch({ type: CV_CREATE_CHANGE_NAV, payload: { first: true, last: false } });
//     } else if (toItem && toItem.order + 1 === sections.length) {
//       dispatch({ type: CV_CREATE_CHANGE_SELECTED, payload: toItem.id });
//       dispatch({ type: CV_CREATE_CHANGE_NAV, payload: { first: false, last: true } });
//     } else if (toItem) {
//       dispatch({ type: CV_CREATE_CHANGE_SELECTED, payload: toItem.id });
//       dispatch({ type: CV_CREATE_CHANGE_NAV, payload: { first: false, last: false } });
//     }
//   }
// };
// update store section hidden status
// export const handleItemHiddenClick = id => async (dispatch, getState) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const { sections } = getState().cv.create;
//   const items = sections.map((item) => {
//     if (item.id === id) return update(item, { hidden: { $apply(x) { return !x; } } });
//     return item;
//   });
//   dispatch({ type: CV_CREATE_UPDATE_DATA, payload: items });
// };

// **** CV CREATE SECTION ACTIONS ****
// update store when section with data object schema changes
// export const handleObjectFormChange = ({ name, value }) => async (dispatch, getState) => {
//   const { selected, sections, openSnackSaving } = getState().cv.create;
//   if (!openSnackSaving) dispatch(handleSnack({ openSnackSaving: true }));
//   const items = sections.map((item) => {
//     if (item.id === selected) {
//       if (item.data) {
//         return update(item, {
//           data: {
//             [name]: { $set: value },
//           },
//         });
//       }
//       return update(item, {
//         data: {
//           $set: {
//             [name]: value,
//           },
//         },
//       });
//     }
//     return item;
//   });
//   dispatch({ type: CV_CREATE_UPDATE_DATA, payload: items });
// };
// update store when section with data array schema changes
// export const handleArrayFormChange = ({ name, value, index }) => async (dispatch, getState) => {
//   // console.time('handleArrayFormChange');
//   const { selected, sections, openSnackSaving } = getState().cv.create;
//   if (!openSnackSaving) dispatch(handleSnack({ openSnackSaving: true }));
//   const itemIndex = _.findIndex(sections, section => section.id === selected);
//   // const sectionIndex = _.findIndex(sections, section => section.id === selected);
//   const updatedData = update(sections, {
//     [itemIndex]: {
//       data: {
//         [index]: {
//           [name]: { $set: value },
//         },
//       },
//     },
//   });
//   dispatch({
//     type: CV_CREATE_UPDATE_DATA,
//     payload: updatedData,
//   });
//   // console.timeEnd('handleArrayFormChange');
// };
// update store when cv name changes
// export const handleCVNameChange = ({ value }) => async (dispatch) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   dispatch({ type: CV_CREATE_CHANGE_NAME, payload: value });
// };
// update store when items inside section change order
// const sortSectionItems = ({ items, sections, selected }) => async (dispatch) => {
//   const sortedItems = items.map((item, newIndex) =>
//     update(item, {
//       index: { $set: newIndex },
//     }));
//   const updatedData = sections.map((section) => {
//     if (section.id === selected) {
//       return update(section, {
//         data: { $set: sortedItems },
//       });
//     }
//     return section;
//   });
//   dispatch({ type: CV_CREATE_UPDATE_DATA, payload: updatedData });
// };
// update store when item is added to section
// const addSectionItem = ({ index, fields }) => async (dispatch, getState) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const { selected, sections } = getState().cv.create;
//   const item = _.find(sections, section => section.id === selected);
//   const data = _.sortBy(item.data, ['index']);
//   const items = update(data, {
//     $apply: (dataItems) => {
//       const newArray = Array.from(dataItems);
//       newArray.splice(index + 1, 0, {
//         index: index + 1,
//         ...fields,
//       });
//       return update(dataItems, {
//         $set: newArray,
//       });
//     },
//   });
//   dispatch(sortSectionItems({ items, sections, selected }));
// };
// update store when item is removed from section
// export const deleteSectionItem = ({ index }) => async (dispatch, getState) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const { selected, sections } = getState().cv.create;
//   const item = _.find(sections, section => section.id === selected);
//   const data = _.sortBy(item.data, ['index']);
//   const items = update(data, {
//     $apply: (dataItem) => {
//       const newArray = Array.from(dataItem);
//       newArray.splice(index, 1);
//       return update(dataItem, {
//         $set: newArray,
//       });
//     },
//   });
//   dispatch(sortSectionItems({ items, sections, selected }));
// };
// update store when items inside sections are reordered
// export const reorderSectionItems = result => async (dispatch, getState) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   if (!result.destination) {
//     return;
//   }

//   const { sections, selected } = getState().cv.create;
//   const item = _.find(sections, section => section.id === selected);
//   const data = _.sortBy(item.data, ['index']);

//   const items = update(data, {
//     $apply: (dataItem) => {
//       const newArray = Array.from(dataItem);
//       const [removed] = newArray.splice(result.source.index, 1);
//       newArray.splice(result.destination.index, 0, removed);
//       return update(dataItem, {
//         $set: newArray,
//       });
//     },
//   });

//   dispatch(sortSectionItems({ items, sections, selected }));
// };
// action called when new item is added to Skill Section
// export const addNewSkill = ({ index }) => async (dispatch) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const fields = {
//     skill: '',
//     description: '',
//     stars: 0,
//   };
//   dispatch(addSectionItem({ index, fields }));
// };
// action called when new item is added to Experience Section
// export const addNewExperience = ({ index }) => async (dispatch) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const fields = {
//     role: '',
//     company: '',
//     from: '',
//     to: '',
//     actual: false,
//     description: '',
//   };
//   dispatch(addSectionItem({ index, fields }));
// };

// **** CV UPDATE DATA IN DB ****
// update all sections in DB
// export const handleDataChange = () => async (dispatch, getState) => {
//   const { id, sections } = getState().cv.create;
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const batch = db.batch();
//   sections.forEach((item) => {
//     batch.update(
//       db.collection('cvs').doc(id).collection('sections').doc(item.id),
//       {
//         order: item.order,
//         text: item.text,
//         hidden: item.hidden,
//       },
//     );
//   });
//   batch.commit()
//     .then(() => {
//       dispatch(handleSnack({ openSnackSaved: true }));
//     })
//     .catch(() => {
//       dispatch(handleSnack({ openSnackError: true }));
//     });
// };
// update 1 section in DB
// export const handleSectionDataChange = selected => async (dispatch, getState) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const { id, sections } = getState().cv.create;
//   const item = _.find(sections, section => section.id === selected);
//   db.collection('cvs').doc(id).collection('sections').doc(item.id)
//     .update({
//       data: item.data,
//     })
//     .then(() => {
//       dispatch(handleSnack({ openSnackSaved: true }));
//     })
//     .catch(() => {
//       dispatch(handleSnack({ openSnackError: true }));
//     });
// };
// update CV Name in DB
// export const saveCVName = id => async (dispatch, getState) => {
//   dispatch(handleSnack({ openSnackSaving: true }));
//   const { name } = getState().cv.create;
//   db.collection('cvs').doc(id)
//     .update({
//       name,
//     })
//     .then(() => {
//       dispatch(handleSnack({ openSnackSaved: true }));
//     })
//     .catch(() => {
//       dispatch(handleSnack({ openSnackError: true }));
//     });
// };


/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* REFACTOR */
/* ----DATA ACTIONS---- */
// get all CVs from DB of current user
export const doGetAllCVs = () => async (dispatch, getState) => {
  const {
    uid,
  } = getState().user;
  const cvDoc = await db.collection('cvs').where('userId', '==', uid)
    .get();
  if (cvDoc.empty) dispatch({ type: CV_LOAD_ALL, payload: [] });
  else {
    const data = cvDoc.docs.map((cv) => {
      const {
        name,
        visits,
        active,
        updatedAt,
      } = cv.data();
      return {
        id: cv.id, name, visits, active, updatedAt: updatedAt.toLocaleString(),
      };
    });
    dispatch({ type: CV_LOAD_ALL, payload: data });
  }
};
// create new CV in DB
export const doCreateCV = ({ name = '' }) => async (dispatch, getState) => {
  dispatch({ type: CV_BUTTONS_BLOCKED, payload: true });
  const {
    uid,
  } = getState().user;
  const cvDoc = await db.collection('cvs')
    .add({
      userId: uid,
      name,
      updatedAt: app.firestore.FieldValue.serverTimestamp(),
      visits: 0,
      active: true,
    });
  const href = `/cv/create?id=${cvDoc.id}`;
  const as = `/cv/create/${cvDoc.id}`;
  Router.push(href, as);
  dispatch(doGetAllCVs());
  dispatch({ type: CV_BUTTONS_BLOCKED, payload: false });
};
// duplicate CV
export const doDuplicateCV = ({ id }) => async (dispatch, getState) => {
  const { uid } = getState().user;
  const { data } = getState().cv;
  const { openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const cv = _.find(data, item => item.id === id);
  const cvDoc = await db.collection('cvs')
    .add({
      userId: uid,
      name: `${cv.name}_copy`,
      updatedAt: app.firestore.FieldValue.serverTimestamp(),
      visits: 0,
      active: true,
    });
  const sectionsDoc = await db.collection('cvs').doc(id).collection('sections').get();
  if (!sectionsDoc.empty) {
    const batch = db.batch();
    sectionsDoc.docs.forEach((section) => {
      batch.set(
        db.collection('cvs').doc(cvDoc.id).collection('sections').doc(section.id),
        {
          order: section.data().order,
          text: section.data().text,
          hidden: section.data().hidden,
          icon: section.data().icon,
          dragButton: section.data().dragButton,
          hideButton: section.data().hideButton,
          data: !section.data().data ? null : section.data().data,
        },
        { merge: true },
      );
    });
    batch.commit()
      .then(async () => {
        dispatch(doGetAllCVs());
        dispatch(doChangeSnack({ openSnackSaved: true }));
      })
      .catch(() => {
        dispatch(doChangeSnack({ openSnackError: true }));
      });
  }
};
// delete CV
export const doDeleteCV = ({ id }) => async (dispatch, getState) => {
  const { openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const sectionsDoc = await db.collection('cvs').doc(id).collection('sections').get();
  if (!sectionsDoc.empty) {
    const batch = db.batch();
    sectionsDoc.docs.forEach((section) => {
      batch.delete(section.ref);
    });
    batch.commit()
      .then(async () => {
        await db.collection('cvs').doc(id).delete()
          .then(() => {
            dispatch(doGetAllCVs());
            dispatch(doChangeSnack({ openSnackSaved: true }));
          })
          .catch(() => {
            dispatch(doChangeSnack({ openSnackError: true }));
          });
      })
      .catch(() => {
        dispatch(doChangeSnack({ openSnackError: true }));
      });
  } else {
    await db.collection('cvs').doc(id).delete()
      .then(() => {
        dispatch(doGetAllCVs());
        dispatch(doChangeSnack({ openSnackSaved: true }));
      })
      .catch(() => {
        dispatch(doChangeSnack({ openSnackError: true }));
      });
  }
};
// update store active status of cv
export const doChangeCVActiveStatus = ({ id, value }) => async (dispatch, getState) => {
  const { openSnackSaving } = getState().ui.cv;
  const { data } = getState().cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const index = _.findIndex(data, cv => cv.id === id);
  dispatch({ type: CV_ACTIVE_STATUS_CHANGE, payload: { index, value } });
};
// get all data of selected CV
export const doGetCVData = ({ id }) => async (dispatch) => {
  const cv = await db.collection('cvs').doc(id).get();
  if (cv.exists) {
    const baseDoc = await db.collection('cvs').doc('base').get();
    if (baseDoc.exists) {
      const { sections } = baseDoc.data();
      const sectionsDoc = await db.collection('cvs').doc(id).collection('sections').get();
      if (sectionsDoc.empty) {
        await createCVSections({ id, sections });
        dispatch({ type: CV_LOAD, payload: { id: cv.id, name: cv.data().name, sections } });
        return;
      }
      const sortedItems = await loadCVSections({ sectionsDoc, sections, id });
      dispatch({
        type: CV_LOAD,
        payload: { id: cv.id, name: cv.data().name, sections: sortedItems },
      });
      return;
    }
  }
  dispatch({ type: CV_LOAD_ERROR });
  Router.push('/cv');
};
// update store when sections are reordered
export const doDragEnd = ({
  result, sections, selected, openSnackSaving,
}) => async (dispatch) => {
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  if (!result.destination) {
    return;
  }
  const items = update(sections, {
    $apply: (sectionItems) => {
      const newArray = Array.from(sectionItems);
      const [removed] = newArray.splice(result.source.index + 1, 1);
      newArray.splice(result.destination.index + 1, 0, removed);
      return update(sectionItems, {
        $set: newArray,
      });
    },
  });

  const sortedItems = items.map((item, index) =>
    update(item, {
      order: { $set: index },
    }));
  dispatch({ type: CV_SECTIONS_UPDATE, payload: sortedItems });
  dispatch(doUpdateSelectedSection(selected));
};
// update store section hidden status
export const doItemHiddenChange = id => async (dispatch, getState) => {
  const { sections } = getState().cv.editing;
  const { openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const items = sections.map((item) => {
    if (item.id === id) return update(item, { hidden: { $apply(x) { return !x; } } });
    return item;
  });
  dispatch({ type: CV_SECTIONS_UPDATE, payload: items });
};
// update store when cv name changes
export const doChangeCVName = ({ value }) => async (dispatch, getState) => {
  const { openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  dispatch({ type: CV_NAME_CHANGE, payload: value });
};
// update store when section with data object schema changes
export const doUpdateSectionDataObject = ({ name, value }) => async (dispatch, getState) => {
  const { sections } = getState().cv.editing;
  const { selected, openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const items = sections.map((item) => {
    if (item.id === selected) {
      if (item.data) {
        return update(item, {
          data: {
            [name]: { $set: value },
          },
        });
      }
      return update(item, {
        data: {
          $set: {
            [name]: value,
          },
        },
      });
    }
    return item;
  });
  dispatch({ type: CV_SECTION_DATA_CHANGE, payload: items });
};
// update store when section with data array schema changes
export const doUpdateSectionDataArray = ({ name, value, index }) => async (dispatch, getState) => {
  const { sections } = getState().cv.editing;
  const { selected, openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const itemIndex = _.findIndex(sections, section => section.id === selected);
  const updatedData = update(sections, {
    [itemIndex]: {
      data: {
        [index]: {
          [name]: { $set: value },
        },
      },
    },
  });
  dispatch({ type: CV_SECTION_DATA_CHANGE, payload: updatedData });
};
// update store when items inside sections are reordered
export const doReorderSectionItems = result => async (dispatch, getState) => {
  const { openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  if (!result.destination) {
    return;
  }

  const { sections } = getState().cv.editing;
  const { selected } = getState().ui.cv;
  const item = _.find(sections, section => section.id === selected);
  const data = _.sortBy(item.data, ['index']);

  const items = update(data, {
    $apply: (dataItem) => {
      const newArray = Array.from(dataItem);
      const [removed] = newArray.splice(result.source.index, 1);
      newArray.splice(result.destination.index, 0, removed);
      return update(dataItem, {
        $set: newArray,
      });
    },
  });

  dispatch(doSortSectionItems({ items, sections, selected }));
};
// update store when items inside section change order
const doSortSectionItems = ({ items, sections, selected }) => async (dispatch) => {
  const sortedItems = items.map((item, newIndex) =>
    update(item, {
      index: { $set: newIndex },
    }));
  const updatedData = sections.map((section) => {
    if (section.id === selected) {
      return update(section, {
        data: { $set: sortedItems },
      });
    }
    return section;
  });
  dispatch({ type: CV_SECTION_DATA_CHANGE, payload: updatedData });
};
// update store when item is added to section
const doAddSectionItem = ({ index, fields }) => async (dispatch, getState) => {
  const { sections } = getState().cv.editing;
  const { selected, openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const item = _.find(sections, section => section.id === selected);
  const data = _.sortBy(item.data, ['index']);
  const items = update(data, {
    $apply: (dataItems) => {
      const newArray = Array.from(dataItems);
      newArray.splice(index + 1, 0, {
        index: index + 1,
        ...fields,
      });
      return update(dataItems, {
        $set: newArray,
      });
    },
  });
  // console.log(sections, selected, items);
  dispatch(doSortSectionItems({ items, sections, selected }));
};
// update store when item is removed from section
export const doDeleteSectionItem = ({ index }) => async (dispatch, getState) => {
  const { sections } = getState().cv.editing;
  const { selected, openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const item = _.find(sections, section => section.id === selected);
  const data = _.sortBy(item.data, ['index']);
  const items = update(data, {
    $apply: (dataItem) => {
      const newArray = Array.from(dataItem);
      newArray.splice(index, 1);
      return update(dataItem, {
        $set: newArray,
      });
    },
  });
  dispatch(doSortSectionItems({ items, sections, selected }));
};
// action called when new item is added to Skill Section
export const doAddNewSkill = ({ index }) => async (dispatch) => {
  const fields = {
    skill: '',
    description: '',
    stars: 0,
  };
  dispatch(doAddSectionItem({ index, fields }));
};
// action called when new item is added to Experience Section
export const doAddNewExperience = ({ index }) => async (dispatch) => {
  const fields = {
    role: '',
    company: '',
    from: '',
    to: '',
    actual: false,
    responsibilities: [{ text: '', index: 0 }],
    achievements: [{ text: '', index: 0 }],
  };
  dispatch(doAddSectionItem({ index, fields }));
};
export const doAddNewEducation = ({ index }) => async (dispatch) => {
  const fields = {
    career: '',
    university: '',
    from: '',
    to: '',
    studying: false,
    description: '',
  };
  dispatch(doAddSectionItem({ index, fields }));
};
export const doAddNewLanguage = ({ index }) => async (dispatch) => {
  const fields = {
    language: '',
    description: '',
    stars: 0,
  };
  dispatch(doAddSectionItem({ index, fields }));
};
export const doAddNewCertificate = ({ index }) => (dispatch) => {
  const fields = {
    title: '',
    from: '',
    to: '',
    noExpiration: false,
  };
  dispatch(doAddSectionItem({ index, fields }));
};
export const doAddNewReference = ({ index }) => (dispatch) => {
  const fields = {
    name: '',
    relationship: '',
    email: '',
    mobile: '',
  };
  dispatch(doAddSectionItem({ index, fields }));
};
const doSortExperienceListItems = ({
  listItems, companyIndex, type, sections, selected,
}) => async (dispatch) => {
  const sortedlistItems = listItems.map((listItem, newIndex) =>
    update(listItem, {
      index: { $set: newIndex },
    }));
  const updatedData = sections.map((section) => {
    if (section.id === selected) {
      return update(section, {
        data: {
          [companyIndex]: {
            [type]: { $set: sortedlistItems },
          },
        },
      });
    }
    return section;
  });
  dispatch({ type: CV_SECTION_DATA_CHANGE, payload: updatedData });
};
export const doAddExperienceListItem = ({ type, companyIndex, index }) => (dispatch, getState) => {
  const { sections } = getState().cv.editing;
  const { selected, openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const item = _.find(sections, section => section.id === selected);
  const data = _.sortBy(item.data, ['index']);
  const listItems = update(data[companyIndex][type], {
    $apply: (dataItems) => {
      const newArray = Array.from(dataItems);
      newArray.splice(index + 1, 0, {
        index: index + 1,
        text: '',
      });
      return update(dataItems, {
        $set: newArray,
      });
    },
  });
  dispatch(doSortExperienceListItems({
    listItems, companyIndex, type, sections, selected,
  }));
};
export const doDeleteExperienceListItem = ({
  type, companyIndex, index,
}) => (dispatch, getState) => {
  const { sections } = getState().cv.editing;
  const { selected, openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const item = _.find(sections, section => section.id === selected);
  const data = _.sortBy(item.data, ['index']);
  if (data[companyIndex][type].length === 1) {
    dispatch(doChangeSnack({ openSnackError: true }));
  } else {
    const listItems = update(data[companyIndex][type], {
      $apply: (dataItems) => {
        const newArray = Array.from(dataItems);
        newArray.splice(index, 1);
        return update(dataItems, {
          $set: newArray,
        });
      },
    });
    dispatch(doSortExperienceListItems({
      listItems, companyIndex, type, sections, selected,
    }));
  }
};
export const doUpdateExperienceListItem = ({
  type, companyIndex, index, value,
}) => async (dispatch, getState) => {
  const { sections } = getState().cv.editing;
  const { selected, openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const item = _.find(sections, section => section.id === selected);
  const data = _.sortBy(item.data, ['index']);
  const listItems = update(data[companyIndex][type], {
    [index]: {
      text: { $set: value },
    },
  });
  dispatch(doSortExperienceListItems({
    listItems, companyIndex, type, sections, selected,
  }));
};
// reset store editing when user leaves CV/Create page
export const doResetData = () => (dispatch) => {
  dispatch({ type: CV_RESET });
};
/* ----UI ACTIONS---- */
// update selected section
export const doChangeSelectedSection = ({ id, sections }) => async (dispatch) => {
  dispatch({ type: CV_SECTION_SELECTED_CHANGE, payload: id });
  dispatch(doChangeNav({ id, sections }));
};
// update CV Nav Buttons
const doChangeNav = ({ id, sections }) => (dispatch) => {
  const index = _.findIndex(sections, section => section.id === id);
  let first = false;
  let last = false;
  if (id === 'personal') first = true;
  else if (index + 1 === sections.length) last = true;
  dispatch({ type: CV_NAV_CHANGE, payload: { first, last } });
};
// show/hide snacks
export const doChangeSnack = ({
  openSnackSaving = false, openSnackSaved = false, openSnackError = false,
}) => async (dispatch) => {
  dispatch({
    type: CV_SNACK_CHANGE,
    payload: { openSnackSaving, openSnackSaved, openSnackError },
  });
};
// update selected section
export const doUpdateSelectedSection = id => async (dispatch, getState) => {
  dispatch({ type: CV_SECTION_SELECTED_CHANGE, payload: id });
  const { sections } = getState().cv.editing;
  dispatch(doChangeNav({ id, sections }));
};
// update store nav arrows
export const doUpdateNavArrows = ({ action, sections, selected }) => async (dispatch) => {
  const item = _.find(sections, section => section.id === selected);
  const toItem = action === 'right'
    ? _.find(sections, section => section.order === item.order + 1)
    : _.find(sections, section => section.order === item.order - 1);
  dispatch({ type: CV_SECTION_SELECTED_CHANGE, payload: toItem.id });
  dispatch({
    type: CV_NAV_CHANGE,
    payload: {
      first: toItem && toItem.order === 0,
      last: toItem && toItem.order + 1 === sections.length,
    },
  });
};
// show action dialog
export const doChangeEditDialogOpenState = ({ open = false }) => (dispatch) => {
  dispatch({
    type: CV_EDIT_DIALOG_OPEN,
    payload: open,
  });
};
// show action dialog
export const doShowActionDialog = ({ open = false }) => (dispatch) => {
  dispatch({
    type: CV_ACTION_DIALOG_OPEN,
    payload: open,
  });
};
/* ----DB ACTIONS---- */
// update all sections in DB
export const doCVSectionsDBUpdate = ({ id }) => async (dispatch, getState) => {
  const { openSnackSaving } = getState().ui.cv;
  const { sections } = getState().cv.editing;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const batch = db.batch();
  sections.forEach((item) => {
    batch.update(
      db.collection('cvs').doc(id).collection('sections').doc(item.id),
      {
        order: item.order,
        text: item.text,
        hidden: item.hidden,
      },
    );
  });
  batch.commit()
    .then(() => {
      dispatch(doChangeSnack({ openSnackSaved: true }));
      dispatch({ type: CV_SECTIONS_UPDATE_DB_OK });
    })
    .catch(() => {
      dispatch(doChangeSnack({ openSnackError: true }));
      dispatch({ type: CV_SECTIONS_UPDATE_DB_ERROR });
    });
};
// update CV Name in DB
export const doCVNameDBUpdate = ({ id }) => async (dispatch, getState) => {
  const { openSnackSaving } = getState().ui.cv;
  const { name } = getState().cv.editing;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  db.collection('cvs').doc(id)
    .update({
      name,
    })
    .then(() => {
      dispatch(doChangeSnack({ openSnackSaved: true }));
    })
    .catch(() => {
      dispatch(doChangeSnack({ openSnackError: true }));
    });
};
// update 1 section in DB
export const doSectionDBUpdate = ({ selected }) => async (dispatch, getState) => {
  const { id, sections } = getState().cv.editing;
  const { openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const item = _.find(sections, section => section.id === selected);
  db.collection('cvs').doc(id).collection('sections').doc(item.id)
    .update({
      data: item.data,
    })
    .then(() => {
      dispatch({ type: CV_SECTION_UPDATE_DB_OK });
      dispatch(doChangeSnack({ openSnackSaved: true }));
    })
    .catch(() => {
      dispatch({ type: CV_SECTION_UPDATE_DB_ERROR });
      dispatch(doChangeSnack({ openSnackError: true }));
    });
};
// update active status of all CVs in DB
export const doCVActiveDBUpdate = () => async (dispatch, getState) => {
  const { data } = getState().cv;
  const { openSnackSaving } = getState().ui.cv;
  if (!openSnackSaving) dispatch(doChangeSnack({ openSnackSaving: true }));
  const batch = db.batch();
  data.forEach((item) => {
    batch.update(
      db.collection('cvs').doc(item.id),
      {
        active: item.active,
      },
    );
  });
  batch.commit()
    .then(() => {
      dispatch(doChangeSnack({ openSnackSaved: true }));
    })
    .catch(() => {
      dispatch(doChangeSnack({ openSnackError: true }));
    });
};
