import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { employeesUnverifiedSliceActions } from '../../slice/employeesUnverifiedSlice';
import { fetchEmployeesUnverified } from '../fetchEmployeesUnverified/fetchEmployeesUnverified';

export const fetchEmployeesUnverifiedPageSize = createAsyncThunk<void, number, ThunkConfig<string>>(
    'employeesunverified/fetchEmployeesUnverifiedPageSize',
    async (pageSize, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(employeesUnverifiedSliceActions.setPageSize(pageSize));
        dispatch(employeesUnverifiedSliceActions.setIndexPage(0));
        dispatch(fetchEmployeesUnverified({}));
    },
);
