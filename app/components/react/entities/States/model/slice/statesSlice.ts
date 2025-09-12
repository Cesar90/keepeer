import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchStates,
} from '../services';
import {
    State,
    StatesSchema,
} from '../types';

const initialState: StatesSchema = {
    isLoading: false,
    error: undefined,
    data: [],
};

export const statesSlice = createSlice({
    name: 'statesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStates.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchStates.fulfilled, (state, action: PayloadAction<State[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchStates.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: statesSliceActions } = statesSlice;
export const { reducer: statesSliceReducer } = statesSlice;
