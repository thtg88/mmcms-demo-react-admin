import { combineReducers } from 'redux';
import auth from './auth/reducers';

const rootReducers = combineReducers({
    auth
});
export default rootReducers;
