import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { EmployeeUnverified } from '../../types';
import { cleanPayload, handleAsyncError } from '@/shared/lib/utils/utils';

export const putEmployeeUnverifiedById = createAsyncThunk<EmployeeUnverified, EmployeeUnverified, ThunkConfig<string>>(
    'employeeunverified/putEmployeeUnverifiedById',
    async (employee, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        const { getState, dispatch } = thunkApi;

        try {
            const urlToRequest = `/dashboard/employees/${employee.id}`;
            const response = await extra.api.put<EmployeeUnverified>(urlToRequest, cleanPayload(employee));

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            return handleAsyncError(error as AxiosError, rejectWithValue);
        }
    },
);
