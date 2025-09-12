import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Employee } from '@/entities/Employees';

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Id" />
        ),
        cell: ({ row }) => <div className="w-[20px]">{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'paycornumber',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Paycor Number" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[50px] truncate font-medium">
                        {row.getValue('paycornumber')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[100px] truncate font-medium">
                        {row.getValue('name')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'secondname',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Second Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[100px] truncate font-medium">
                        {row.getValue('secondname')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'lastname',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Lastname" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[100px] truncate font-medium">
                        {row.getValue('lastname')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'secondlastname',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Second Last Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[100px] truncate font-medium">
                        {row.getValue('secondlastname')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'taxes',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Taxes" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[100px] truncate font-medium">
                        {row.getValue('taxes')}
                    </span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row, table }) => <DataTableRowActions table={table} row={row} />,
    },
];
