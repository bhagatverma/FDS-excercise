import { createAction } from 'redux-actions';

import { APP_ACTIONS } from './types';

export const changeLocale = createAction(APP_ACTIONS.CHANGE_LOCALE);
