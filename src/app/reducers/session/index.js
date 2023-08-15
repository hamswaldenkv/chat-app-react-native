const INITIAL_STATE = {
  authenticated: false,
  isOffline: false,
  accountId: null,
  accessToken: null,
  displayName: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SESSION_SET_VALUE':
      return {...state, [action.propKey]: action.propValue};
    case 'LOGOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
};
