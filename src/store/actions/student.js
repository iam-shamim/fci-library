import server from "../../server";
import errorCatch from "../../utils/errorCatch";
import {STUDENT_DELETED, STUDENT_FETCHED, STUDENT_BOOK_FETCHED, STUDENT_BOOK_DELETED} from "./types";
function studentFetched(students) {
    return {
        type: STUDENT_FETCHED,
        students
    }
}
function studentBooksFetched(bookList) {
    return {
        type: STUDENT_BOOK_FETCHED,
        bookList
    }
}
function studentDeleted(_id) {
    return {
        type: STUDENT_DELETED,
        _id
    }
}
function studentBookDeleted(_id) {
    return {
        type: STUDENT_BOOK_DELETED,
        _id
    }
}

export const saveStudent = (data) => {
    return dispatch => {
        return server.post('/api/students',data).then((res)=>{

        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const updateStudent = (data) => {
    return dispatch => {
        return server.put('/api/students',data).then((res)=>{

        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const getStudent = (data)=>{
    return dispatch => {
        return server.get('/api/students',{
            params: data
        }).then((res)=>{
            dispatch(studentFetched(res.data.students));
        }).catch((err)=>{
            return errorCatch(err);
        });
    }
};
export const studentDelete = (data) => {
    return dispatch => {
        return server.delete('/api/students',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(studentDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};

export const studentBooks = (_id,page=1) => {
    return dispatch => {
        return server.get('/api/students/'+_id+'/books',{
            params: { page }
        }).then((res)=>{
            dispatch(studentBooksFetched(res.data.bookList));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const studentBookDelete = (data) => {
    return dispatch => {
        return server.delete('/api/students/books',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(studentBookDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};