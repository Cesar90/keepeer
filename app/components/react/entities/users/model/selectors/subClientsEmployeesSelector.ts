import { StateSchema } from '@/app/providers/StoreProvider';

export const getSubClientEmployessData = (state: StateSchema) => state.subClientEmployee?.data.results;
export const getSubClientEmployessNext = (state: StateSchema) => state.subClientEmployee?.data.next || false;
export const getSubClientEmployessPrevious = (state: StateSchema) => state.subClientEmployee?.data.previous || false;
export const getSubClientEmployessCount = (state: StateSchema) => state.subClientEmployee?.data.count;
export const getSubClientEmployessPageSize = (state: StateSchema) => state.subClientEmployee?.data.page_size || 10;
export const getSubClientEmployessIndexPage = (state: StateSchema) => state.subClientEmployee?.data.index_page || 0;
export const getSubClientEmployesssIsLoading = (state: StateSchema) => state.subClientEmployee?.isLoading || false;
export const getSubClientEmployesssError = (state: StateSchema) => state.subClientEmployee?.error;

// export const getSubClientEmployessOtherData = (state: StateSchema) => state.invoiceItemsOther?.data.results;
// export const getSubClientEmployessOtherNext = (state: StateSchema) => state.invoiceItemsOther?.data.next || false;
// export const getSubClientEmployessOtherPrevious = (state: StateSchema) => state.invoiceItemsOther?.data.previous || false;
// export const getSubClientEmployessOtherCount = (state: StateSchema) => state.invoiceItemsOther?.data.count;
// export const getSubClientEmployessOtherPageSize = (state: StateSchema) => state.invoiceItemsOther?.data.page_size || 10;
// export const getSubClientEmployessOthersIsLoading = (state: StateSchema) => state.invoiceItemsOther?.isLoading || false;
// export const getSubClientEmployessOtherError = (state: StateSchema) => state.invoiceItemsOther?.error;
