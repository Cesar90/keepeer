import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Login } from '../../types';
import { handleAsyncError } from '@/shared/lib/utils/utils';

export interface LoginPayload {
    email: string;
    password: string
}

export const login = createAsyncThunk<
    Login,
    LoginPayload,
    ThunkConfig<string>>(
        'users/login',
        async (login, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            if (!login) {
                return rejectWithValue('error');
            }

            try {
                const response = await extra.api.post<Login>('/auth/login', login);

                if (!response.data) {
                    throw new Error();
                }
                return response.data;
            } catch (error) {
                return handleAsyncError(error as AxiosError, rejectWithValue);
            }
        },
    );
