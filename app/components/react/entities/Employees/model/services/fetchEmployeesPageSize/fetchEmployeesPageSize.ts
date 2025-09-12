import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { employeesSliceActions } from '../../slice/employeesSlice';
import { fetchEmployees } from '../fetchEmployees/fetchEmployees';

export const fetchEmployeesPageSize = createAsyncThunk<void, number, ThunkConfig<string>>(
    'employees/fetchEmployeesPageSize',
    async (pageSize, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(employeesSliceActions.setPageSize(pageSize));
        dispatch(employeesSliceActions.setIndexPage(0));
        dispatch(fetchEmployees({}));
    },
);
