export default {
  user: {
    uid: null,
    email: null,
    name: null,
    username: null,
    usernameOrig: null,
    plan: null,
  },
  cv: {
    data: null,
    editing: {
      id: null,
      name: '',
      sections: [],
    },
    toDelete: null,
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
    settings: {
      username: 3,
      openSnackSaving: false,
      openSnackSaved: false,
      openSnackError: false,
    },
  },
};
