import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { StateCity } from '../../types';
import { handleAsyncError } from '@/shared/lib/utils/utils';

export const fetchCitiesByState = createAsyncThunk<StateCity[], number, ThunkConfig<string>>(
    'states/fetchCitiesByState',
    async (stateId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const requestUrl = `/states/${stateId}/cities`;

        try {
            const response = await extra.api.get<StateCity[]>(requestUrl);

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            console.log(error);
            return handleAsyncError(error as AxiosError, rejectWithValue);
        }
    },
);
