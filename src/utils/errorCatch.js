export default function errorCatch(err) {
    const error = new Error(err.response.statusText);
    error.response = err.response.data;
    if(typeof err.response.data !== 'object'){
        error.response = {};
        error.response.errors= {};
        error.response.errors._flash = 'Server Error. Try again!';
    }
    throw error;
}