import { StateSchema } from '@/app/providers/StoreProvider';

export const getSubClientsLogsData = (state: StateSchema) => state.subClientLogs?.data.results;
export const getSubClientsLogsNext = (state: StateSchema) => state.subClientLogs?.data.next || false;
export const getSubClientsLogsPrevious = (state: StateSchema) => state.subClientLogs?.data.previous || false;
export const getSubClientsLogsCount = (state: StateSchema) => state.subClientLogs?.data.count;
export const getSubClientsLogsPageSize = (state: StateSchema) => state.subClientLogs?.data.page_size || 10;
export const getSubClientsLogsIndexPage = (state: StateSchema) => state.subClientLogs?.data.index_page || 0;
export const getSubClientsLogsIsLoading = (state: StateSchema) => state.subClientLogs?.isLoading || false;
export const getSubClientsLogsError = (state: StateSchema) => state.subClientLogs?.error;
