import { StateSchema } from '@/app/providers/StoreProvider';

export const getSubClientJobsData = (state: StateSchema) => state.subClientJobs?.data.results;
export const getSubClientJobsNext = (state: StateSchema) => state.subClientJobs?.data.next || false;
export const getSubClientJobsPrevious = (state: StateSchema) => state.subClientJobs?.data.previous || false;
export const getSubClientJobsCount = (state: StateSchema) => state.subClientJobs?.data.count;
export const getSubClientJobsPageSize = (state: StateSchema) => state.subClientJobs?.data.page_size || 10;
export const getSubClientJobsIndexPage = (state: StateSchema) => state.subClientJobs?.data.index_page || 0;
export const getSubClientJobsIsLoading = (state: StateSchema) => state.subClientJobs?.isLoading || false;
export const getSubClientJobsError = (state: StateSchema) => state.subClientJobs?.error;
