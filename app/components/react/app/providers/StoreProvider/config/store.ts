import {
    CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducer } from '@/entities/counter';
import {
    clientPaymentMethodsSliceReducer,
    clientsReducer,
    subClientsReducer,
    tabsClientReducer,
} from '@/entities/Clients';
import {
    invoiceSubClientReducer,
    invoiceItemsReducer,
    invoiceItemsOtherReducer,
    typeOfJobSubClientReducer,
    typeOfPaysSubClientReducer,
    typeOfPaysOtherSubClientReducer,
    invoiceItemsTotalReducer,
    invoiceItemsOtherTotalReducer,
    iRequestFilterSliceReducer,
    invoiceEmployeeReducer,
    invoiceSubClientEmployeesSliceReducer,
    invoiceItemsTotalSummaryReducer,
    invoicePaymentSliceReducer,
} from '@/entities/Invoices';
import { rangeDatesReducer } from '@/entities/RangeDates';
import { companiesSliceReducer } from '@/entities/Companies';
import {
    subClientEmployeesSliceReducer,
    subClientJobSliceReducer,
    subClientsSliceReducer,
    subClientsLogsSliceReducer,
    subClientInvoicesReducer,
}
    from '@/entities/SubClients';
import { employeesSliceReducer } from '@/entities/Employees';
import {
    regionsInvoiceReducer,
    regionClientsReducer,
    regionSubClientReducer,
} from '@/entities/Regions';
import { invoiceDetailReducer, invoicesDetailReducer } from '@/entities/Invoice';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    // navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        client: clientsReducer,
        subClient: subClientsReducer,
        invoices: invoiceSubClientReducer,
        invoiceItems: invoiceItemsReducer,
        invoiceItemsOther: invoiceItemsOtherReducer,
        regionsInvoice: regionsInvoiceReducer,
        regionClients: regionClientsReducer,
        regionSubClients: regionSubClientReducer,
        rangeDates: rangeDatesReducer,
        companies: companiesSliceReducer,
        typeOfJobs: typeOfJobSubClientReducer,
        typeOfPays: typeOfPaysSubClientReducer,
        typeOfPaysOther: typeOfPaysOtherSubClientReducer,
        invoiceDetails: invoiceDetailReducer,
        invoiceItemsTotal: invoiceItemsTotalReducer,
        invoiceItemsOtherTotal: invoiceItemsOtherTotalReducer,
        iRequestFilter: iRequestFilterSliceReducer,
        invoiceEmployee: invoiceEmployeeReducer,
        subClientEmployee: subClientEmployeesSliceReducer,
        subClientJobs: subClientJobSliceReducer,
        invoiceSubClientEmployees: invoiceSubClientEmployeesSliceReducer,
        invoicesDetails: invoicesDetailReducer,
        employee: employeesSliceReducer,
        tabsClient: tabsClientReducer,
        invoiceItemsTotalSummary: invoiceItemsTotalSummaryReducer,
        subClientParameterization: subClientsSliceReducer,
        subClientLogs: subClientsLogsSliceReducer,
        SubClientsInvoices: subClientInvoicesReducer,
        ClientsPaymentMethods: clientPaymentMethodsSliceReducer,
        InvoicePayment: invoicePaymentSliceReducer,
        // ui: uiReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducer);

    const extraArg: ThunkExtraArg = {
        api: $api,
        // navigate,
    };

    // const store = configureStore<StateSchema>({
    const store = configureStore({
        // reducer: rootReducer,
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: true,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
// export const useAppDispatch = () => useDispatch<AppDispatch>()
