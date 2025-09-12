import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { State } from '../../types';
import { handleAsyncError } from '@/shared/lib/utils/utils';

export const fetchStates = createAsyncThunk<State[], void, ThunkConfig<string>>(
    'states/fetchStates',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const requestUrl = '/states';

        try {
            const response = await extra.api.get<State[]>(requestUrl);

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
