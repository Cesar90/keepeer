import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { employeesSliceActions } from '../../slice/employeesSlice';
import { fetchEmployees } from '../fetchEmployees/fetchEmployees';

export const fetchSetPageIndexfEmployees = createAsyncThunk<void, number, ThunkConfig<string>>(
    'employees/fetchSetPageIndexfEmployees',
    async (pageIndex, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(employeesSliceActions.setIndexPage(pageIndex));
        dispatch(fetchEmployees({}));
    },
);
