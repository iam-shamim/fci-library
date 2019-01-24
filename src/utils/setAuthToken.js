import server from "../server";

export default function setAuthToken(token){
    if(token){
        server.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete server.defaults.headers.common['Authorization'];
    }
};
