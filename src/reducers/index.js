import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
//short hand property name
const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
