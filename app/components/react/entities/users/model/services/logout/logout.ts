import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Login } from '../../types';
import { handleAsyncError } from '@/shared/lib/utils/utils';

export const logout = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>>(
        'users/logout',
        async (_, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.post<Login>('/auth/logout');

                if (!response.data) {
                    throw new Error();
                }
                return response.data;
            } catch (error) {
                return handleAsyncError(error as AxiosError, rejectWithValue);
            }
        },
    );
