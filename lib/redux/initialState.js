export default {
  user: {
    uid: null,
    email: null,
  },
  cv: {
    data: null,
    editing: {
      id: null,
      name: '',
      sections: [],
    },
  },
  ui: {
    cv: {
      editDialog: false,
      buttonsBlocked: false,
      dialog: {
        open: false,
      },
      first: true,
      last: false,
      openSnackSaving: false,
      openSnackSaved: false,
      openSnackError: false,
      selected: 'personal',
    },
  },
};
