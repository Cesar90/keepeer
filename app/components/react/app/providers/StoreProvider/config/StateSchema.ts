import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState, Dispatch } from 'redux';
import { AxiosInstance } from 'axios';
import { rtkApi } from '@/shared/api/rtkApi';
import { CounterSchema } from '@/entities/counter';
import { RangeDatesSchema } from '@/entities/RangeDates';
import {
    ClientPaymentMethodSchema, ClientsSchema, SubClientsSchema, TabsClient,
} from '@/entities/Clients';
import {
    TypeOfPaysSchema,
    TypeOfPaysOtherSchema,
    TypeOfJobSchema,
    InvoiceSchema,
    InvoiceItemsSchema,
    InvoiceItemsOtherSchema,
    InvoiceItemsTotalSchema,
    InvoiceItemsOtherTotalSchema,
    InvoiceEmployeeSchema,
    IRequestFilter,
    InvoiceSubClientEmployeesSchema,
    InvoiceItemsTotalSummarySchema,
    InvoicePaymentSchema,
} from '@/entities/Invoices';
import { InvoiceDetailSchema, InvoicesDetailSchema } from '@/entities/Invoice';
import { RegionsInvoiceSchema } from '@/entities/Regions';
import { CompaniesSchema } from '@/entities/Companies';
import {
    SubClientEmployeesSchema,
    SubClientJobsSchema,
    SubClientsSchema as SubClientsSchemaParameterization,
    SubClientLogsSchema,
    SubClientsInvoicesSchema,
} from '@/entities/SubClients';
import { EmployeesSchema } from '@/entities/Employees';

export interface StateSchema {
    counter: CounterSchema;
    client: ClientsSchema,
    subClient: SubClientsSchema,
    invoices: InvoiceSchema,
    invoiceItems: InvoiceItemsSchema,
    invoiceItemsOther: InvoiceItemsOtherSchema,
    regionsInvoice: RegionsInvoiceSchema,
    regionClients: ClientsSchema,
    regionSubClients: SubClientsSchema,
    companies: CompaniesSchema,
    rangeDates: RangeDatesSchema,
    typeOfJobs: TypeOfJobSchema,
    typeOfPays: TypeOfPaysSchema,
    typeOfPaysOther: TypeOfPaysOtherSchema,
    invoiceDetails: InvoiceDetailSchema,
    invoiceItemsTotal: InvoiceItemsTotalSchema,
    invoiceItemsOtherTotal: InvoiceItemsOtherTotalSchema,
    iRequestFilter: IRequestFilter,
    invoiceEmployee: InvoiceEmployeeSchema,
    subClientEmployee: SubClientEmployeesSchema,
    subClientJobs: SubClientJobsSchema,
    invoiceSubClientEmployees: InvoiceSubClientEmployeesSchema
    invoicesDetails: InvoicesDetailSchema,
    employee: EmployeesSchema,
    tabsClient: TabsClient,
    invoiceItemsTotalSummary: InvoiceItemsTotalSummarySchema,
    subClientParameterization: SubClientsSchemaParameterization,
    subClientLogs: SubClientLogsSchema,
    SubClientsInvoices: SubClientsInvoicesSchema,
    ClientsPaymentMethods: ClientPaymentMethodSchema,
    InvoicePayment: InvoicePaymentSchema,
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    // navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    dispatch?: Dispatch;
    state: StateSchema
}
