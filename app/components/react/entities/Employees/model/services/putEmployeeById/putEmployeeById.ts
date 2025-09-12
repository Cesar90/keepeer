import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Employee } from '../../types';
import { cleanPayload, handleAsyncError } from '@/shared/lib/utils/utils';

export const putEmployeeById = createAsyncThunk<Employee, Employee, ThunkConfig<string>>(
    'employee/putEmployeeById',
    async (employee, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        const { getState, dispatch } = thunkApi;

        try {
            const urlToRequest = `/dashboard/employees/${employee.id}`;
            const response = await extra.api.put<Employee>(urlToRequest, cleanPayload(employee));

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            return handleAsyncError(error as AxiosError, rejectWithValue);
        }
    },
);
