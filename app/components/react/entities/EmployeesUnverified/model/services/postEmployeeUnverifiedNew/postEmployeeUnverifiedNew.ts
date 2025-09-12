import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { EmployeeUnverified } from '../../types';
import { cleanPayload, handleAsyncError } from '@/shared/lib/utils/utils';

export const postEmployeeUnverifiedNew = createAsyncThunk<
    EmployeeUnverified,
    Omit<EmployeeUnverified, 'id'>,
    ThunkConfig<string>>(
        'employee/postEmployeeUnverifiedNew',
        async (employee, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;
            const { getState, dispatch } = thunkApi;
            // const invoiceDetail = getInvoiceDetailsData(getState());

            try {
                const response = await extra.api.post<EmployeeUnverified>('/employeesunverified', cleanPayload(employee));

                if (!response.data) {
                    throw new Error();
                }
                return response.data;
            } catch (error) {
                return handleAsyncError(error as AxiosError, rejectWithValue);
            }
        },
    );
