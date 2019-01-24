import {} from "../actions/types";
import {STUDENT_FETCHED, STUDENT_DELETED, STUDENT_BOOK_FETCHED} from "../actions/types";
import {STUDENT_BOOK_DELETED} from "../actions/types";

const initialState = {
    studentList: {
        docs:[]
    },
    bookList: {
        docs:[]
    },
    retry_book_student: 0,

};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case STUDENT_FETCHED:
            return{
                ...state,
                studentList: action.students
            };
        case STUDENT_DELETED:
            return{
                ...state,
                studentList: {
                    ...state.studentList,
                    docs: state.studentList.docs.filter((student)=>student._id !== action._id),
                }
            };
        case STUDENT_BOOK_DELETED:
            state.bookList.total--;
            state.bookList.pages = Math.ceil(state.bookList.total/state.bookList.limit);
            state.bookList.pages = state.bookList.pages<1?1:state.bookList.pages;
            state.retry_book_student = state.bookList.docs.length === 1? ( state.retry_book_student + 1 ): state.retry_book_student;
            return{
                ...state,
                bookList: {
                    ...state.bookList,
                    docs: state.bookList.docs.filter((book)=>book._id !== action._id),
                }
            };
        case STUDENT_BOOK_FETCHED:
            return{
                ...state,
                bookList: action.bookList
            };
        default: return state;
    }

}