import axios from 'axios';

const baseURL = 'http://localhost:3101';

const http = axios.create({ baseURL });

export const getQueryString = (reqQueries: { [key: string]: string }) => {
    return Object.entries(reqQueries)
        .map(([key, value]) => value && `${key}=${`${value}`.trim()}`)
        .filter((i) => i)
        .join('&');
};

export default http;
