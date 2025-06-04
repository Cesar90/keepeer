import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: __API__,
        baseUrl: '/api',
        // prepareHeaders: (headers) => {
        //     const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
        //     if (token) {
        //         headers.set('Authorization', token);
        //     }
        //     return headers;
        // },
        prepareHeaders: (headers) => {
            const csrfToken = window!.csrfToken || '';
            if (csrfToken) {
                headers.set('X-CSRFToken', csrfToken);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
