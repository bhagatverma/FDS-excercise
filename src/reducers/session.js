import { Map } from 'immutable';

import { SESSION_ACTIONS } from '../actions/types';

const initialState = Map({
  username: null,
  fullname: null
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_ACTIONS.LOGOUT:
      return state.merge({ fullname: null, username: null });
    case SESSION_ACTIONS.SET_USER_DETAILS:
      const { username, fullname } = action.payload;
      return state.merge({ fullname, username });
    default:
      return state;
  }
}
