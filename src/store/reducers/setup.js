import {
    CATEGORY_DELETED, CATEGORY_FETCHED, CATEGORY_SAVED, CATEGORY_UPDATED,
    DEPARTMENT_DELETED,
    DEPARTMENT_FETCHED,
    DEPARTMENT_SAVED,
    DEPARTMENT_UPDATED,
    LANGUAGE_DELETED, LANGUAGE_FETCHED,
    LANGUAGE_SAVED,
    LANGUAGE_UPDATED,
    SHIFT_DELETED,
    SHIFT_FETCHED,
    SHIFT_SAVED,
    SHIFT_UPDATED,
    YEAR_DELETED,
    YEAR_FETCHED,
    YEAR_SAVED,
    YEAR_UPDATED
} from "../actions/types";

const initialState = {
    years: [],
    departments: [],
    shifts: [],
    languages: [],
    categories: [],

};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        // for year
        case YEAR_DELETED:
            return {
                ...state,
                years: state.years.filter((year)=> year._id !== action._id)
            };
        case YEAR_UPDATED:
            return {
                ...state,
                years: state.years.map(year=>{
                    if(year._id === action.year._id) {
                        return action.year
                    }else{
                        return year;
                    }
                })
            };
        case YEAR_SAVED:
            return {
                ...state,
                years: [
                    ...state.years,
                    action.year
                ]
            };
        case YEAR_FETCHED:return {...state, years: action.years};

        // for department
        case DEPARTMENT_DELETED:
            return {
                ...state,
                departments: state.departments.filter((department)=> department._id !== action._id)
            };
        case DEPARTMENT_UPDATED:
            return {
                ...state,
                departments: state.departments.map(department=>{
                    if(department._id === action.department._id) {
                        return action.department
                    }else{
                        return department;
                    }
                })
            };
        case DEPARTMENT_SAVED:
            return {
                ...state,
                departments: [
                    ...state.departments,
                    action.department
                ]
            };
        case DEPARTMENT_FETCHED:return {...state, departments: action.departments};

        // for shift
        case SHIFT_DELETED:
            return {
                ...state,
                shifts: state.shifts.filter((shift)=> shift._id !== action._id)
            };
        case SHIFT_UPDATED:
            return {
                ...state,
                shifts: state.shifts.map(shift=>{
                    if(shift._id === action.shift._id) {
                        return action.shift
                    }else{
                        return shift;
                    }
                })
            };
        case SHIFT_SAVED:
            return {
                ...state,
                shifts: [
                    ...state.shifts,
                    action.shift
                ]
            };
        case SHIFT_FETCHED: return {...state, shifts: action.shifts};

        // for language
        case LANGUAGE_DELETED:
            return {
                ...state,
                languages: state.languages.filter((language)=> language._id !== action._id)
            };
        case LANGUAGE_UPDATED:
            return {
                ...state,
                languages: state.languages.map(language=>{
                    if(language._id === action.language._id) {
                        return action.language
                    }else{
                        return language;
                    }
                })
            };
        case LANGUAGE_SAVED:
            return {
                ...state,
                languages: [
                    ...state.languages,
                    action.language
                ]
            };
        case LANGUAGE_FETCHED: return {...state, languages: action.languages};

        // for category
        case CATEGORY_DELETED:
            return {
                ...state,
                categories: state.categories.filter((category)=> category._id !== action._id)
            };
        case CATEGORY_UPDATED:
            return {
                ...state,
                categories: state.categories.map(category=>{
                    if(category._id === action.category._id) {
                        return action.category
                    }else{
                        return category;
                    }
                })
            };
        case CATEGORY_SAVED:
            return {
                ...state,
                categories: [
                    ...state.categories,
                    action.category
                ]
            };
        case CATEGORY_FETCHED: return {...state, categories: action.categories};

        default: return state;
    }

}