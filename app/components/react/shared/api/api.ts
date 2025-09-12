import axios from 'axios';
// import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const $api = axios.create({
    baseURL: '/api',
    // headers: {
    //     authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    // },
    headers: {
        'X-CSRFToken': window!.csrfToken || '',
    },
});

$api.interceptors.request.use((config) => {
    // if (config.headers) {
    //     config.headers.authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    // }
    if (config.headers) {
        config.headers['X-CSRFToken'] = window!.csrfToken || '';
    }
    return config;
});
