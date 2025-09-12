import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
// import { CombinedState, Dispatch } from 'redux';
import { Dispatch } from 'redux';
import { AxiosInstance } from 'axios';
import { rtkApi } from '@/shared/api/rtkApi';
// import { CounterSchema } from '@/entities/counter';
import { LoginSchema } from '@/entities/users';
import { EmployeesSchema } from '@/entities/Employees';
import { StatesSchema, StateCitiesSchema } from '@/entities/States';
import { EmployeesUnverifiedSchema } from '@/entities/EmployeesUnverified';

export interface StateSchema {
    // counter: CounterSchema;
    login: LoginSchema,
    employee: EmployeesSchema,
    state: StatesSchema,
    stateCities: StateCitiesSchema,
    employeeUnverified: EmployeesUnverifiedSchema,
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    // reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => StateSchema;
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
