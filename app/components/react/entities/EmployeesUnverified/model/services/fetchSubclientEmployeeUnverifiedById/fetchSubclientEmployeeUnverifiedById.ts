import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createQueryString, handleAsyncError } from '@/shared/lib/utils/utils';
import { EmployeeUnverified } from '../../types';

interface IFilterParams {
    subclient_id: number;
    paycor_id: number;
}

export const fetchSubclientEmployeeUnverifiedById = createAsyncThunk<EmployeeUnverified, IFilterParams, ThunkConfig<string>>(
    'subclient/fetchSubclientEmployeeUnverifiedById',
    async (iFilterParams, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        const { getState } = thunkApi;
        const { subclient_id: subclientId, paycor_id: paycorId } = iFilterParams;

        if (!subclientId) {
            return rejectWithValue('error');
        }

        const queryParams = { paycor_id: paycorId };
        const requestUrl = `/dashboard/subclients/${subclientId}/employee${createQueryString(queryParams)}`;

        try {
            const response = await extra.api.get<EmployeeUnverified>(requestUrl);

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            return handleAsyncError(error as AxiosError, rejectWithValue);
        }
    },
);
