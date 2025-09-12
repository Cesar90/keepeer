import { StateSchema } from '@/app/providers/StoreProvider';

export const getStateCitiesData = (state: StateSchema) => state.stateCities?.data;
export const getStateCitiesIsLoading = (state: StateSchema) => state.stateCities?.isLoading || false;
export const getStateCitiesError = (state: StateSchema) => state.stateCities?.error;
