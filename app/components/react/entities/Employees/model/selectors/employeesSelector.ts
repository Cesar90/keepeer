import { StateSchema } from '@/app/providers/StoreProvider';

export const getEmployessData = (state: StateSchema) => state.employee?.data.results;
export const getEmployessNext = (state: StateSchema) => state.employee?.data.next || false;
export const getEmployessPrevious = (state: StateSchema) => state.employee?.data.previous || false;
export const getEmployessCount = (state: StateSchema) => state.employee?.data.count;
export const getEmployessPageSize = (state: StateSchema) => state.employee?.data.page_size || 10;
export const getEmployessIndexPage = (state: StateSchema) => state.employee?.data.index_page || 0;
export const getEmployesssIsLoading = (state: StateSchema) => state.employee?.isLoading || false;
export const getEmployesssError = (state: StateSchema) => state.employee?.error;
