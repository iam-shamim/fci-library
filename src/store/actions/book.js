import server from "../../server";
import errorCatch from "../../utils/errorCatch";
import {
    BOOK_SAVED,
    BOOK_FETCHED,
    BOOK_DELETED,
    BOOK_GIVE_TO,
    BOOK_STUDENT_FETCHED,
    BOOK_STUDENT_DELETED,
    BOOK_GIVE_TO_FOR_VIEW
} from "./types";

function addCategory(book) {
    return {
        type: BOOK_SAVED,
        book
    }
}
function booksFetched(books) {
    return {
        type: BOOK_FETCHED,
        books
    }
}
function bookDeleted(_id) {
    return {
        type: BOOK_DELETED,
        _id
    }
}
function giveTo(bookTo) {
    return {
        type: BOOK_GIVE_TO,
        bookTo
    }
}
function giveToForView(bookTo) {
    return {
        type: BOOK_GIVE_TO_FOR_VIEW,
        bookTo
    }
}
function bookStudentFetched(studentList) {
    return {
        type: BOOK_STUDENT_FETCHED,
        studentList
    }
}
function bookStudentDeleted(_id) {
    return {
        type: BOOK_STUDENT_DELETED,
        _id
    }
}



export const saveBook = (data) => {
    return dispatch => {
        return server.post('/api/books',data).then((res)=>{
            //dispatch(addCategory(res.data.category));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const updateBook = (data) => {
    return dispatch => {
        return server.put('/api/books',data).then((res)=>{
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const bookGiveTo = (data,fromView=false) => {
    return dispatch => {
        return server.post('/api/books/give',data).then((res)=>{
            if(res.data.status === "success"){
                if(fromView){
                    dispatch(giveToForView(res.data.bookTo))
                }else{
                    dispatch(giveTo(res.data.bookTo))
                }
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const getBooks = (data)=>{
    return dispatch => {
        return server.get('/api/books',{
            params: data
        }).then((res)=>{
            dispatch(booksFetched(res.data.books));
        }).catch((err)=>{
            return errorCatch(err);
        });
    }
};
export const bookDelete = (data) => {
    return dispatch => {
        return server.delete('/api/books',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(bookDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};

export const bookStudents = (_id,page=1) => {
    return dispatch => {
        return server.get('/api/books/'+_id+'/students',{
            params: { page }
        }).then((res)=>{
            dispatch(bookStudentFetched(res.data.studentList));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const bookStudentsDelete = (data) => {
    return dispatch => {
        return server.delete('/api/books/students',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(bookStudentDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};