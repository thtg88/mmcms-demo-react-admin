import { combineReducers } from 'redux';
import auth from './auth/reducers';
import users from './user/reducers';

const rootReducers = combineReducers({
    auth,
    users
});
export default rootReducers;
