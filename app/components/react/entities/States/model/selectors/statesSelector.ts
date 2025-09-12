import { StateSchema } from '@/app/providers/StoreProvider';

export const getStatesData = (state: StateSchema) => state.state?.data;
export const getStatesIsLoading = (state: StateSchema) => state.state?.isLoading || false;
export const getStatesError = (state: StateSchema) => state.state?.error;
