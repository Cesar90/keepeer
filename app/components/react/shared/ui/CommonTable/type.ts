// export type RowData = unknown | object | any[];

// export interface CoreCell<TData extends RowData, TValue> {
//     getContext: () => CellContext<TData, TValue>;
//     id: string;
// }

// export interface GroupingCell {
//     getIsAggregated: () => boolean;
//     getIsGrouped: () => boolean;
//     getIsPlaceholder: () => boolean;
// }

// export interface Cell<TData extends RowData, TValue> extends CoreCell<TData, TValue>, GroupingCell {
// }

// export interface CellContext<TData extends RowData, TValue> {
//     cell: Cell<TData, TValue>;
//     // column: Column<TData, TValue>;
//     // getValue: Getter<TValue>;
//     // renderValue: Getter<TValue | null>;
//     // row: Row<TData>;
//     // table: Table<TData>;
// }

// export type ColumnDefTemplate<TProps extends object> = string | ((props: TProps) => any);

export type ColumnDefinitionType<T, K extends keyof T> = {
    key: K
    header: string;
    width?: number;
    // cell?: ColumnDefTemplate<CellContext<T, K>>;
}

export type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>
}

export type TableHeaderProps<T, K extends keyof T> = {
    columns: Array<ColumnDefinitionType<T, K>>
}

export type TableRowsProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>
}
