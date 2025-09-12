import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getEmployessPageSize,
    getEmployessIndexPage,
} from '../../selectors';
import { EmployeeResult } from '../../types';
import { createQueryString, handleAsyncError } from '@/shared/lib/utils/utils';

interface IFilterParams {
    name?: string;
    lastname?: string;
}

export const fetchEmployees = createAsyncThunk<EmployeeResult, IFilterParams, ThunkConfig<string>>(
    'employees/fetchEmployees',
    async (iFilterParams, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        const { getState } = thunkApi;
        const { name, lastname } = iFilterParams;

        const pageSize = getEmployessPageSize(getState());
        const indexPage = getEmployessIndexPage(getState());

        const params = {
            page: indexPage + 1, // Django API expects 1-based page index
            page_size: pageSize,
        };

        const queryParams = { name, lastname };
        const requestUrl = `/employees${createQueryString(queryParams)}`;

        try {
            const response = await extra.api.get<EmployeeResult>(requestUrl, {
                params,
            });

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            return handleAsyncError(error as AxiosError, rejectWithValue);
        }
    },
);
