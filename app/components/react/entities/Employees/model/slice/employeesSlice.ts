import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchEmployees,
} from '../services';
import { EmployeeResult, EmployeesSchema, Employee } from '../types';

const initialState: EmployeesSchema = {
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

export const employeesSlice = createSlice({
    name: 'employeesSlice',
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
        updateEmployee: (state, action: PayloadAction<{ index: number, updatedRow: Employee }>) => {
            const { index, updatedRow } = action.payload;
            // Replace the entire row at the specified index with the new row data
            state.data.results[index] = {
                ...state.data.results[index], // Keep the current row properties
                ...updatedRow, // Overwrite with updated row properties
            };
        },
        addSubClientEmployee: (state, action: PayloadAction<{ index: number, employee: Employee }>) => {
            const { index, employee } = action.payload;

            state.data.results = [
                { ...employee },
                ...state.data.results,
            ];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<EmployeeResult>) => {
                state.isLoading = false;
                state.data.results = action.payload.results;
                state.data.count = action.payload.count;
                state.data.next = action.payload.next;
                state.data.previous = action.payload.previous;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: employeesSliceActions } = employeesSlice;
export const { reducer: employeesSliceReducer } = employeesSlice;
