import { createAction } from 'redux-actions';

import { SESSION_ACTIONS } from './types';

export const logout = createAction(SESSION_ACTIONS.LOGOUT);
export const setUserDetails = createAction(SESSION_ACTIONS.SET_USER_DETAILS, (username, fullname) => ({ username, fullname }));
