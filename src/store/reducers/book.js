import {} from "../actions/types";
import {BOOK_FETCHED, BOOK_DELETED, BOOK_GIVE_TO, BOOK_STUDENT_FETCHED, BOOK_STUDENT_DELETED, BOOK_GIVE_TO_FOR_VIEW} from "../actions/types";
import {bookStudents} from '../actions/book';
const initialState = {
    bookList: {
        docs:[]
    },
    studentList: {
        docs:[]
    },
    retry_book_student: 0,

};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case BOOK_FETCHED:
            return{
                ...state,
                bookList: action.books
            };
        case BOOK_GIVE_TO:
            state.bookList.docs.map((book)=>{
                if(book._id === action.bookTo.book_id){
                    book.current_stock--;
                    return book;
                }
            });
            return state;
        case BOOK_GIVE_TO_FOR_VIEW:
            state.studentList.total++;
            state.studentList.pages = Math.ceil(state.studentList.total/state.studentList.limit);
            state.studentList.pages = state.studentList.pages<1?1:state.studentList.pages;
            state.studentList.page = 1;
            if(state.studentList.docs.length >= state.studentList.limit){
                state.studentList.docs.pop();
            }
            state.studentList.docs.unshift(action.bookTo);
            return state;
        case BOOK_DELETED:
            return{
                ...state,
                bookList: {
                    ...state.bookList,
                    docs: state.bookList.docs.filter((book)=>book._id !== action._id),
                }
            };
        case BOOK_STUDENT_FETCHED:
            action.studentList.for_sl = action.studentList.total;
            return{
                ...state,
                studentList: action.studentList
            };
        case BOOK_STUDENT_DELETED:
            state.studentList.total--;
            if(state.studentList.docs.length === 1){
                state.retry_book_student++;
                const newPages = Math.ceil(state.studentList.total/state.studentList.limit);
                state.studentList.pages = newPages<1?1:newPages;
            }

            return{
                ...state,
                studentList: {
                    ...state.studentList,
                    docs: state.studentList.docs.filter((student)=>student._id !== action._id),
                }
            };
        default: return state;
    }

}