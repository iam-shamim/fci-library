import axios from 'axios'
export default axios.create({
    baseURL: 'https://fci-library-api.herokuapp.com'
})