import server from "../../server";
import {} from "./types";

export const createEvent = (data) => {
    return dispatch => {
        return server.post('/api/events',data).then((res)=>{

        }).catch((err)=>{
            const error = new Error(err.response.statusText);
            error.response = err.response.data;
            throw error;
        });
    };
};