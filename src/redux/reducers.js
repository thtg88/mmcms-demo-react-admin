import { combineReducers } from 'redux';
import auth from './auth/reducers';
import roles from './roles/reducers';
import users from './users/reducers';

const rootReducers = combineReducers({
    auth,
    roles,
    users
});

export default rootReducers;
