import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchCitiesByState,
} from '../services';
import {
    StateCity,
    StateCitiesSchema,
} from '../types';

const initialState: StateCitiesSchema = {
    isLoading: false,
    error: undefined,
    data: [],
};

export const stateCitiesSlice = createSlice({
    name: 'stateCitiesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCitiesByState.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCitiesByState.fulfilled, (state, action: PayloadAction<StateCity[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCitiesByState.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: stateCitiesSliceActions } = stateCitiesSlice;
export const { reducer: stateCitiesSliceReducer } = stateCitiesSlice;
