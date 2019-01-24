import { combineReducers } from 'redux';
import flashMessages from "./store/reducers/flashMessages";
import auth from './store/reducers/auth';
import setup from './store/reducers/setup';
import book from './store/reducers/book';
import student from './store/reducers/student';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default  combineReducers(( {
    flashMessages,
    auth,
    book,
    setup,
    student,
    toastr: toastrReducer
}))