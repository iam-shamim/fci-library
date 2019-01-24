import server from "../../server";
import setAuthToken from '../../utils/setAuthToken'
import jwt from 'jsonwebtoken';
import {SET_CURRENT_USER} from "./types";
import errorCatch from "../../utils/errorCatch";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user,
    };
}
export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
};
export const login = (data) => {
    return dispatch => {
        return server.post('/api/auth',data).then((res)=>{
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            dispatch(setCurrentUser(jwt.decode(token)));
            return {
                status: true
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};