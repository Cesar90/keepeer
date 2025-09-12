import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Employee } from '../../types';
import { cleanPayload, handleAsyncError } from '@/shared/lib/utils/utils';

export const postEmployeeNew = createAsyncThunk<
    Employee,
    Omit<Employee, 'id'>,
    ThunkConfig<string>>(
        'employee/postEmployeeNew',
        async (employee, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;
            const { getState, dispatch } = thunkApi;
            // const invoiceDetail = getInvoiceDetailsData(getState());

            try {
                const response = await extra.api.post<Employee>('/employees', cleanPayload(employee));

                if (!response.data) {
                    throw new Error();
                }
                return response.data;
            } catch (error) {
                return handleAsyncError(error as AxiosError, rejectWithValue);
            }
        },
    );
