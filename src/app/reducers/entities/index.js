const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ENTITIES_SET_VALUE':
      return {...state, [action.propKey]: action.propValue};
    case 'LOGOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
};
