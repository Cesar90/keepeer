import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { useSelector } from 'react-redux';
import {
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/shadcn/new-york';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    fetchSetPageIndexfEmployees,
    fetchEmployeesPageSize,
    getEmployessCount,
    getEmployessIndexPage,
    getEmployessPageSize,
} from '@/entities/Employees';

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    const dispatch = useAppDispatch();
    const pageSize = useSelector(getEmployessPageSize);
    const pageCount = useSelector(getEmployessCount);
    const indexPage = useSelector(getEmployessIndexPage);

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {/* {table.getFilteredSelectedRowModel().rows.length}
                {' '}
                of
                {' '} */}
                {table.getFilteredRowModel().rows.length}
                {' '}
                row(s)
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                            dispatch(fetchEmployeesPageSize(Number(value)));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                            {/* <SelectValue placeholder={Number(pageSize)} /> */}
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page
                    {' '}
                    {table.getState().pagination.pageIndex + 1}
                    {' '}
                    of
                    {' '}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            dispatch(fetchSetPageIndexfEmployees(0));
                            // table.setPageIndex(0)
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            dispatch(fetchSetPageIndexfEmployees(Math.max(indexPage - 1, 0)));
                            // table.previousPage()
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            dispatch(fetchSetPageIndexfEmployees(Math.min(indexPage + 1, Math.ceil(pageCount / pageSize))));
                            // table.nextPage()
                        }}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            dispatch(fetchSetPageIndexfEmployees(table.getPageCount() - 1));
                            // table.setPageIndex(table.getPageCount() - 1)
                        }}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
