import { Map } from 'immutable';

import { APP_ACTIONS } from '../actions/types';

const initialState = Map({
  locale: 'en'
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case APP_ACTIONS.CHANGE_LOCALE:
      return state.set('locale', action.payload);
    default:
      return state;
  }
}