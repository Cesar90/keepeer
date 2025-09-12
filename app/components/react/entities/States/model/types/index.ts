export interface State {
    id: number;
    name: string;
}

export interface StateCity {
    id: number;
    name: string;
    state_id: number;
}

export interface StatesSchema extends GlobalsCommonSchema {
    data: State[];
}

export interface StateCitiesSchema extends GlobalsCommonSchema {
    data: StateCity[];
}
