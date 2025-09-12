import { StateSchema } from '@/app/providers/StoreProvider';

export const getEmployesUnverifiedData = (state: StateSchema) => state.employeeUnverified?.data.results;
export const getEmployesUnverifiedNext = (state: StateSchema) => state.employeeUnverified?.data.next || false;
export const getEmployesUnverifiedPrevious = (state: StateSchema) => state.employeeUnverified?.data.previous || false;
export const getEmployesUnverifiedCount = (state: StateSchema) => state.employeeUnverified?.data.count;
export const getEmployesUnverifiedPageSize = (state: StateSchema) => state.employeeUnverified?.data.page_size || 10;
export const getEmployesUnverifiedIndexPage = (state: StateSchema) => state.employeeUnverified?.data.index_page || 0;
export const getEmployesUnverifiedIsLoading = (state: StateSchema) => state.employeeUnverified?.isLoading || false;
export const getEmployesUnverifiedError = (state: StateSchema) => state.employeeUnverified?.error;
