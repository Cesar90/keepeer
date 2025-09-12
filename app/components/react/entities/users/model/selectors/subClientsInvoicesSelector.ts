import { StateSchema } from '@/app/providers/StoreProvider';

export const getSubClientsInvoicesData = (state: StateSchema) => state.SubClientsInvoices?.data;
export const getSubClientsInvoicesIsLoading = (state: StateSchema) => state.SubClientsInvoices?.isLoading || false;
export const getSubClientsInvoicesError = (state: StateSchema) => state.SubClientsInvoices?.error;
