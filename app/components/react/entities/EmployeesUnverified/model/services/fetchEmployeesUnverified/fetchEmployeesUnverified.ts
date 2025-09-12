import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getEmployesUnverifiedPageSize,
    getEmployesUnverifiedIndexPage,
} from '../../selectors';
import { EmployeeUnverifiedResult } from '../../types';
import { createQueryString, handleAsyncError } from '@/shared/lib/utils/utils';

interface IFilterParams {
    name?: string;
    lastname?: string;
}

export const fetchEmployeesUnverified = createAsyncThunk<EmployeeUnverifiedResult, IFilterParams, ThunkConfig<string>>(
    'employeesunverified/fetchEmployeesUnverified',
    async (iFilterParams, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        const { getState } = thunkApi;
        const { name, lastname } = iFilterParams;

        const pageSize = getEmployesUnverifiedPageSize(getState());
        const indexPage = getEmployesUnverifiedIndexPage(getState());

        const params = {
            page: indexPage + 1, // Django API expects 1-based page index
            page_size: pageSize,
        };

        const queryParams = { name, lastname };
        const requestUrl = `/employeesunverified${createQueryString(queryParams)}`;

        try {
            const response = await extra.api.get<EmployeeUnverifiedResult>(requestUrl, {
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
