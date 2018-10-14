import { combineReducers } from 'redux';
import auth from './auth/reducers';
import roles from './role/reducers';
import users from './user/reducers';

const rootReducers = combineReducers({
    auth,
    roles,
    users
});

export default rootReducers;
