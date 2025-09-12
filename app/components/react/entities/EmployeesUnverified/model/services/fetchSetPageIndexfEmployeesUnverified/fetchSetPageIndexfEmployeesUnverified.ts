import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { employeesUnverifiedSliceActions } from '../../slice/employeesUnverifiedSlice';
import { fetchEmployeesUnverified } from '../fetchEmployeesUnverified/fetchEmployeesUnverified';

export const fetchSetPageIndexfEmployeesUnverified = createAsyncThunk<void, number, ThunkConfig<string>>(
    'employeesunverified/fetchSetPageIndexfEmployeesUnverified',
    async (pageIndex, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(employeesUnverifiedSliceActions.setIndexPage(pageIndex));
        dispatch(fetchEmployeesUnverified({}));
    },
);
