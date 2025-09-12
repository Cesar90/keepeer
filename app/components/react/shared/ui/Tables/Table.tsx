import React, {
    useState, useMemo, useCallback,
} from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    ColumnDef,
    flexRender,
    Table,
    Row,
} from '@tanstack/react-table';

// Define the data type
type Person = {
    id: number;
    employeeNumber: number,
    productService: string,
    name: string;
    regularHours: number;
};

const TableComponent: React.FC = () => {
    const [data, setData] = useState<Person[]>([
        {
            id: 1, employeeNumber: 20, productService: 'General Labor', name: 'John Doe', regularHours: 28,
        },
        {
            id: 2, employeeNumber: 30, productService: 'General Labor', name: 'Jane Smith', regularHours: 34,
        },
        {
            id: 3, employeeNumber: 40, productService: 'General Labor', name: 'Alice Johnson', regularHours: 23,
        },
    ]);

    // Add a new row at a specific index
    const addRowAtIndex = useCallback((index: number, newRow: Person) => {
        setData((oldData) => [
            ...oldData.slice(0, index),
            newRow,
            ...oldData.slice(index),
        ]);
    }, []);

    // Handle cell edit
    const handleCellEdit = useCallback((table: Table<Person>, columnName: string, userId: number, rowIndex: number, columnId: string, value: string | number) => {
        if (columnName === 'regularHours') {
            const MAX_REGULAR_HOURS = 40;
            const valueString = value.toString();
            const valueNumber = value as number;
            const valueLength = valueString.length;
            const validReg = /^\d*\.?\d*$/;

            if (!validReg.test(valueString)) return;

            if (valueLength === 6) return;

            if (valueLength === 3 && /^\d$/.test(valueString[2])) return;

            if (valueLength < 3 && (valueString[0] === '.' || valueString[1] === '.')) return;

            if (valueLength > 2 && /^\d$/.test(valueString[2])) {
                value = parseFloat(valueString.slice(0, 2));
            }

            if (valueLength > 5) {
                value = parseFloat(valueString.slice(0, 5));
            }

            value = valueNumber > MAX_REGULAR_HOURS ? MAX_REGULAR_HOURS : valueNumber;

            if (valueNumber > MAX_REGULAR_HOURS) {
                const rowModel = table.getRowModel();
                const lastRow = rowModel.rows.length - 1;
                const isLastRow = rowIndex === lastRow;
                const beforeRow = rowModel.rows[rowIndex - 1];
                const nextRow = rowModel.rows[rowIndex + 1];
                const currentRow = rowModel.rows[rowIndex];

                const createNewRow = () => ({
                    ...currentRow.original,
                    regularHours: valueNumber - MAX_REGULAR_HOURS,
                    id: userId,
                });

                if (nextRow && nextRow.original.id !== userId) {
                    addRowAtIndex(rowIndex + 1, createNewRow());
                }

                if (isLastRow && beforeRow.original.id !== currentRow.original.id) {
                    addRowAtIndex(rowIndex + 1, createNewRow());
                }
            }
        }

        setData((oldData) => oldData.map((row, index) => {
            if (index === rowIndex) {
                return { ...row, [columnId]: value };
            }
            return row;
        }));

        // if (columnName === 'regularHours') {
        //     if (copyValue as number > MAX_REGULAR_HOURS) {
        //         const rowModel = table.getRowModel();
        //         const valueNumber = copyValue as number;
        //         const beforeRow = rowModel.rows[rowIndex - 1];
        //         const nextRow = rowModel.rows[rowIndex + 1];
        //         const currentRow = rowModel.rows[rowIndex];
        //         const lastRow = rowModel.rows.length - 1;

        //         if (nextRow) {
        //             if (nextRow.original.id !== userId) {
        //                 const newRow: Person = { ...currentRow.original, regularHours: (valueNumber - MAX_REGULAR_HOURS), id: userId };
        //                 addRowAtIndex(rowIndex + 1, newRow); // Adds the new row at index 1
        //             }
        //         }

        //         if (lastRow === rowIndex) {
        //             if (beforeRow.original.id !== currentRow.original.id) {
        //                 const newRow: Person = { ...currentRow.original, regularHours: (valueNumber - MAX_REGULAR_HOURS), id: userId };
        //                 addRowAtIndex(rowIndex + 1, newRow); // Adds the new row at index 1
        //             }
        //         }
        //     }
        // }
    }, [addRowAtIndex]);

    // Helper function to handle row editing
    // const handleEdit = (rowIndex: number, table: Table<Person>) => {
    //     const updatedRow = { ...table.getRow(String(rowIndex)).original, name: 'Updated!' };
    //     table.options.data.splice(rowIndex, 1, updatedRow);
    //     table.setOptions((prev: any) => ({
    //         ...prev,
    //         data: [...table.options.data],
    //     }));
    // };

    // Helper function to handle row deletion
    const handleDelete = useCallback((table: Table<Person>, row: Row<Person>) => {
        if (window.confirm('Are you sure you want to delete this row?')) {
            table.options.meta?.deleteRow(row.index);
        }
    }, []);

    // Column definitions
    const columns = useMemo<ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'employeeNumber',
                header: 'Employee Number',
                // eslint-disable-next-line react/no-unstable-nested-components
                cell: ({
                    getValue, row, column, table,
                }) => (
                    <span className="text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.original.employeeNumber}</span>
                    // <input
                    //     className="border rounded p-1 w-full"
                    //     value={getValue<string>()}
                    //     onChange={(e) => handleCellEdit(table, 'name', row.original.id, row.index, column.id, e.target.value)}
                    // />
                ),
            },
            {
                accessorKey: 'productService',
                header: 'Product Service',
                // eslint-disable-next-line react/no-unstable-nested-components
                cell: ({
                    getValue, row, column, table,
                }) => (
                    <span className="text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.original.productService}</span>
                    // <input
                    //     className="border rounded p-1 w-full"
                    //     value={getValue<string>()}
                    //     onChange={(e) => handleCellEdit(table, 'name', row.original.id, row.index, column.id, e.target.value)}
                    // />
                ),
            },
            {
                accessorKey: 'regularHours',
                header: 'Regular Hours',
                // eslint-disable-next-line react/no-unstable-nested-components
                cell: ({
                    getValue, row, column, table,
                }) => (
                    <>
                        {/* {row.id} */}
                        {console.log(getValue<number>())}
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                            focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={getValue<number>().toString()}
                            onChange={(e) => handleCellEdit(table, 'regularHours', row.original.id, row.index, column.id, e.target.value)}
                        />
                    </>

                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                // eslint-disable-next-line react/no-unstable-nested-components
                cell: ({ row, table }) => (
                    <div>
                        {/* <button
                            onClick={() => handleEdit(row.index, table)}
                            className="mr-2 bg-blue-500 text-white p-1"
                        >
                            Edit
                        </button> */}
                        <button
                            type="button"
                            onClick={() => handleDelete(table, row)}
                            data-drawer-target="drawer-delete-product-default"
                            data-drawer-show="drawer-delete-product-default"
                            aria-controls="drawer-delete-product-default"
                            data-drawer-placement="right"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                        >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0
                                    002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1
                                    1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Delete item
                        </button>
                    </div>
                ),
            },
        ],
        [handleCellEdit, handleDelete],
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        meta: {
            deleteRow: (rowIndex: number) => {
                setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
            },
            updateData: (rowIndex, columnId, value) => {
                // Skip page index reset until after next rerender
            },
        },
    });

    return (
        <div className="p-4">
            {/* <button
                onClick={handleAddRow}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Row at Index 1
            </button> */}
            <input
                value={table.getState().globalFilter ?? ''}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
                placeholder="Search..."
                className="mb-4 p-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="text-left p-2 border-b">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-2 border-b">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center mt-4">
                <button
                    type="button"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="inline-flex items-center justify-center px-3 py-2 text-sm
                    font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800
                    focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Previous
                </button>
                <span className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Page
                    {' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1}
                        {' '}
                        of
                        {' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <button
                    type="button"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="inline-flex items-center justify-center px-3 py-2
                        text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800
                        focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Next
                </button>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="ml-4 p-2 border rounded"
                >
                    {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                            Show
                            {' '}
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TableComponent;
