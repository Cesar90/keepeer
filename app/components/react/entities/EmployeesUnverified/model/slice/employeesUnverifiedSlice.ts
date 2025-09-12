import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchEmployeesUnverified,
} from '../services';
import { EmployeeUnverifiedResult, EmployeesUnverifiedSchema, EmployeeUnverified } from '../types';

const initialState: EmployeesUnverifiedSchema = {
    isLoading: false,
    error: undefined,
    data: {
        results: [],
        next: '',
        previous: '',
        count: 0, // totalCount
        page_size: 10, // pageSize
        index_page: 0,
    },
};

export const employeesUnverifiedSlice = createSlice({
    name: 'employeesUnverifiedSlice',
    initialState,
    reducers: {
        // setCurrentSubClient: (state, action: PayloadAction<SubClient>) => {
        //     state.currentSubClient = action.payload;
        // },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.data.page_size = action.payload;
        },
        setIndexPage: (state, action: PayloadAction<number>) => {
            state.data.index_page = action.payload;
        },
        updateEmployee: (state, action: PayloadAction<{ index: number, updatedRow: EmployeeUnverified }>) => {
            const { index, updatedRow } = action.payload;
            // Replace the entire row at the specified index with the new row data
            state.data.results[index] = {
                ...state.data.results[index], // Keep the current row properties
                ...updatedRow, // Overwrite with updated row properties
            };
        },
        addSubClientEmployee: (state, action: PayloadAction<{ index: number, employee: EmployeeUnverified }>) => {
            const { index, employee } = action.payload;

            state.data.results = [
                { ...employee },
                ...state.data.results,
            ];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeesUnverified.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEmployeesUnverified.fulfilled, (state, action: PayloadAction<EmployeeUnverifiedResult>) => {
                state.isLoading = false;
                state.data.results = action.payload.results;
                state.data.count = action.payload.count;
                state.data.next = action.payload.next;
                state.data.previous = action.payload.previous;
            })
            .addCase(fetchEmployeesUnverified.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: employeesUnverifiedSliceActions } = employeesUnverifiedSlice;
export const { reducer: employeesUnverifiedSliceReducer } = employeesUnverifiedSlice;
