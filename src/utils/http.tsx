import axios from 'axios';

const baseURL = 'http://localhost:3101/MDb';

const http = axios.create({ baseURL });

export default http;
