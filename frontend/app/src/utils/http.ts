import axios from 'axios';

const HTTP = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT || '/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export default HTTP;
