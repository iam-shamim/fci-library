import {
    YEAR_FETCHED,
    YEAR_SAVED,
    YEAR_UPDATED,
    YEAR_DELETED,
    DEPARTMENT_SAVED,
    DEPARTMENT_FETCHED,
    DEPARTMENT_UPDATED,
    DEPARTMENT_DELETED,
    SHIFT_SAVED,
    SHIFT_FETCHED,
    SHIFT_UPDATED,
    SHIFT_DELETED,
    LANGUAGE_SAVED,
    LANGUAGE_FETCHED,
    LANGUAGE_UPDATED,
    LANGUAGE_DELETED, CATEGORY_SAVED, CATEGORY_FETCHED, CATEGORY_UPDATED, CATEGORY_DELETED
} from "./types";
import server from "../../server";
import errorCatch from "../../utils/errorCatch";

export function addYear(year) {
    return {
        type: YEAR_SAVED,
        year
    }
}
export function yearUpdated(year) {
    return {
        type: YEAR_UPDATED,
        year
    }
}
function yearFetched(years) {
    return {
        type: YEAR_FETCHED,
        years
    }
}
function yearDeleted(_id) {
    return {
        type: YEAR_DELETED,
        _id
    }
}

export const getYear = ()=>{
    return dispatch => {
        return server.get('/api/setup/years').then((res)=>{
            dispatch(yearFetched(res.data.years));
        }).catch((err)=>{
            return errorCatch(err);
        });
    }
};
export const saveYear = (data) => {
    return dispatch => {
        return server.post('/api/setup/years',data).then((res)=>{
            dispatch(addYear(res.data.year));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const updateYear = (data) => {
    return dispatch => {
        return server.put('/api/setup/years',data).then((res)=>{
            dispatch(yearUpdated(res.data.year));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const deleteYear = (data) => {
    return dispatch => {
        return server.delete('/api/setup/years',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(yearDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};


// department
export function addDepartment(department) {
    return {
        type: DEPARTMENT_SAVED,
        department
    }
}
function departmentFetched(departments) {
    return {
        type: DEPARTMENT_FETCHED,
        departments
    }
}
export function departmentUpdated(department) {
    return {
        type: DEPARTMENT_UPDATED,
        department
    }
}
function departmentDeleted(_id) {
    return {
        type: DEPARTMENT_DELETED,
        _id
    }
}
export const saveDepartment = (data) => {
    return dispatch => {
        return server.post('/api/setup/departments',data).then((res)=>{
            dispatch(addDepartment(res.data.department));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const getDepartment = ()=>{
    return dispatch => {
        return server.get('/api/setup/departments').then((res)=>{
            dispatch(departmentFetched(res.data.departments));
        }).catch((err)=>{
            return errorCatch(err);
        });
    }
};
export const updateDepartment = (data) => {
    return dispatch => {
        return server.put('/api/setup/departments',data).then((res)=>{
            dispatch(departmentUpdated(res.data.department));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const departmentDelete = (data) => {
    return dispatch => {
        return server.delete('/api/setup/departments',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(departmentDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};

// shift
export function addShift(shift) {
    return {
        type: SHIFT_SAVED,
        shift
    }
}
function shiftFetched(shifts) {
    return {
        type: SHIFT_FETCHED,
        shifts
    }
}
export function updatedShift(shift) {
    return {
        type: SHIFT_UPDATED,
        shift
    }
}
function shiftDeleted(_id) {
    return {
        type: SHIFT_DELETED,
        _id
    }
}
export const saveShift = (data) => {
    return dispatch => {
        return server.post('/api/setup/shifts',data).then((res)=>{
            dispatch(addShift(res.data.shift));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const getShift = ()=>{
    return dispatch => {
        return server.get('/api/setup/shifts').then((res)=>{
            dispatch(shiftFetched(res.data.shifts));
        }).catch((err)=>{
            return errorCatch(err);
        });
    }
};
export const updateShift = (data) => {
    return dispatch => {
        return server.put('/api/setup/shifts',data).then((res)=>{
            dispatch(updatedShift(res.data.shift));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const shiftDelete = (data) => {
    return dispatch => {
        return server.delete('/api/setup/shifts',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(shiftDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};

// language
export function addLanguage(language) {
    return {
        type: LANGUAGE_SAVED,
        language
    }
}
function languageFetched(languages) {
    return {
        type: LANGUAGE_FETCHED,
        languages
    }
}
 function updatedLanguage(language) {
    return {
        type: LANGUAGE_UPDATED,
        language
    }
}
function languageDeleted(_id) {
    return {
        type: LANGUAGE_DELETED,
        _id
    }
}
export const saveLanguage = (data) => {
    return dispatch => {
        return server.post('/api/setup/languages',data).then((res)=>{
            dispatch(addLanguage(res.data.language));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const getLanguage = ()=>{
    return dispatch => {
        return server.get('/api/setup/languages').then((res)=>{
            dispatch(languageFetched(res.data.languages));
        }).catch((err)=>{
            return errorCatch(err);
        });
    }
};
export const updateLanguage = (data) => {
    return dispatch => {
        return server.put('/api/setup/languages',data).then((res)=>{
            dispatch(updatedLanguage(res.data.language));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const languageDelete = (data) => {
    return dispatch => {
        return server.delete('/api/setup/languages',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(languageDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};


// category
export function addCategory(category) {
    return {
        type: CATEGORY_SAVED,
        category
    }
}
function categoryFetched(categories) {
    return {
        type: CATEGORY_FETCHED,
        categories
    }
}
function updatedCategory(category) {
    return {
        type: CATEGORY_UPDATED,
        category
    }
}
function categoryDeleted(_id) {
    return {
        type: CATEGORY_DELETED,
        _id
    }
}
export const saveCategory = (data) => {
    return dispatch => {
        return server.post('/api/setup/categories',data).then((res)=>{
            dispatch(addCategory(res.data.category));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const getCategory = ()=>{
    return dispatch => {
        return server.get('/api/setup/categories').then((res)=>{
            dispatch(categoryFetched(res.data.categories));
        }).catch((err)=>{
            return errorCatch(err);
        });
    }
};
export const updateCategory = (data) => {
    return dispatch => {
        return server.put('/api/setup/categories',data).then((res)=>{
            dispatch(updatedCategory(res.data.category));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const categoryDelete = (data) => {
    return dispatch => {
        return server.delete('/api/setup/categories',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(categoryDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};


