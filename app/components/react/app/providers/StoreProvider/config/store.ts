// import {
//     CombinedState, configureStore, Reducer, ReducersMapObject,
// } from '@reduxjs/toolkit';
import {
    configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { loginSliceReducer } from '@/entities/users';
import { employeesSliceReducer } from '@/entities/Employees';
import { statesSliceReducer, stateCitiesSliceReducer } from '@/entities/States';
import { employeesUnverifiedSliceReducer } from '@/entities/EmployeesUnverified';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    // navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        login: loginSliceReducer,
        employee: employeesSliceReducer,
        state: statesSliceReducer,
        stateCities: stateCitiesSliceReducer,
        employeeUnverified: employeesUnverifiedSliceReducer,
        // counter: counterReducer,
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
        // reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        reducer: reducerManager.reduce as Reducer<StateSchema>,
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
