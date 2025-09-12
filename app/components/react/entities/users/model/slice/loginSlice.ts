import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    login,
} from '../services';
import {
    Login,
    LoginSchema,
} from '../types';

const initialState: LoginSchema = {
    isLoading: false,
    error: undefined,
    data: {
        email: '',
        password: '',
    },
};

export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<Login>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: loginSliceActions } = loginSlice;
export const { reducer: loginSliceReducer } = loginSlice;
