import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getSubClientsData = (state: StateSchema) => state.subClientParameterization?.data.results;
export const getSubClientsNext = (state: StateSchema) => state.subClientParameterization?.data.next || false;
export const getSubClientsPrevious = (state: StateSchema) => state.subClientParameterization?.data.previous || false;
export const getSubClientsCount = (state: StateSchema) => state.subClientParameterization?.data.count;
export const getSubClientsPageSize = (state: StateSchema) => state.subClientParameterization?.data.page_size || 10;
export const getSubClientsIndexPage = (state: StateSchema) => state.subClientParameterization?.data.index_page || 0;
export const getSubClientssIsLoading = (state: StateSchema) => state.subClientParameterization?.isLoading || false;
export const getSubClientssError = (state: StateSchema) => state.subClientParameterization?.error;

export const selectVisibleHeaders = createSelector(
    [getSubClientsData],
    (subClients) => {
        // Transforming keys into UpperCamelCase format
        // const headers = Object.keys(subClients[0] || {}).map((key) => {
        //     return key
        //         .replace(/_([a-z])/g, (_, char) => ' ' + char.toUpperCase()) // Convert snake_case to space-separated words
        //         .replace(/^([a-z])/g, (_, char) => char.toUpperCase()) // Capitalize the first letter of the first word
        //         .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add a space between lowercase and uppercase letters
        // });
        // return headers;
        return [
            'Id',
            'Region Name',
            'Name',
            'Regular Hours Markup',
            'New Regular Hours Markup',
            'Time Change Regular Markup',
            'New Markup Valid From',
            'Is New Markup Active',
        ];
    },
);
