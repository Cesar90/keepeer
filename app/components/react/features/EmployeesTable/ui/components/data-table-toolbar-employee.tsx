import {
    useCallback, useEffect, useRef, useState,
} from 'react';
import { Table } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { DataTableViewOptions } from './data-table-view-options';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Input,
} from '@/shared/ui/shadcn/new-york';
import {
    AddNewEmployeeForm,
    Employee,
    employeesSliceActions,
    fetchEmployees,
} from '@/entities/Employees';

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

const DEBOUNCE_DELAY = 800;

export function DataTableToolbarEmployee<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const dispatch = useAppDispatch();
    const [isOpenNewEmployeePopup, setOpenNewEmployeePopup] = useState(false);
    const [filterName, setFilterName] = useState<string>('');
    const [filterLastName, setFilterLastName] = useState<string>('');

    // Generic function to handle filtering
    const debouncedFilterSearchRef = useRef(
        debounce(
            (filters: { name?: string; lastname?: string }) => {
                // Dispatch the action with valid filters
                dispatch(
                    fetchEmployees({
                        ...filters,
                    }),
                );
            },
            DEBOUNCE_DELAY,
        ),
    ).current;

    // Clean up debounce on unmount
    useEffect(() => {
        return () => {
            debouncedFilterSearchRef.cancel();
        };
    }, [debouncedFilterSearchRef]);

    const handleFilterSearch = useCallback(
        (filterType: 'name' | 'lastname', filterValue: string) => {
            const filters: { name?: string; lastname?: string } = {};
            if (filterType === 'name' && filterValue) {
                filters.name = filterValue;
            }
            if (filterType === 'lastname' && filterValue) {
                filters.lastname = filterValue;
            }

            // Use the debounced function
            debouncedFilterSearchRef(filters);
        },
        [debouncedFilterSearchRef], // Dependencies
    );

    const addNewEmployee = useCallback(async () => {
        setOpenNewEmployeePopup(true);
    }, []);

    const closeDialogNewEmployee = useCallback(() => {
        setOpenNewEmployeePopup(false);
    }, []);

    const getEmployeeData = useCallback((employeeData: Employee) => {
        dispatch(
            employeesSliceActions.addSubClientEmployee({
                index: 0,
                employee: employeeData,
            }),
        );
        closeDialogNewEmployee();
    }, [dispatch, closeDialogNewEmployee]);

    return (
        <div className="flex items-center justify-between">
            <Dialog open={isOpenNewEmployeePopup} onOpenChange={setOpenNewEmployeePopup}>
                {/* <DialogTrigger asChild>
                    <button type="button">Open Dialog</button>
                </DialogTrigger> */}
                {/* <DialogContent className="w-full h-full w-11/12 h-auto max-w-5xl"> */}
                <DialogContent className="w-screen max-w-none">
                    {/* <DialogContent className="w-screen h-screen max-w-none max-h-none"> */}
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            <p>Add New Employee</p>
                        </DialogTitle>
                        <DialogDescription>
                            {/* You can make changes to your account and password settings here. */}
                        </DialogDescription>
                    </DialogHeader>
                    <AddNewEmployeeForm
                        getEmployeeData={getEmployeeData}
                    />
                    <Button
                        type="button"
                        onClick={closeDialogNewEmployee}
                    >
                        Close
                    </Button>
                </DialogContent>
            </Dialog>

            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search name ..."
                    // value={(table.getColumn('employee_name')?.getFilterValue() as string) ?? ''}
                    value={filterName}
                    // onChange={(event) => table.getColumn('employee_name')?.setFilterValue(event.target.value)}
                    onChange={(event) => {
                        setFilterName(event.target.value);
                        handleFilterSearch('name', event.target.value);
                    }}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <Input
                    placeholder="Search lastname ..."
                    // value={(table.getColumn('employee_lastname')?.getFilterValue() as string) ?? ''}
                    value={filterLastName}
                    // onChange={(event) => table.getColumn('employee_lastname')?.setFilterValue(event.target.value)}
                    onChange={(event) => {
                        setFilterLastName(event.target.value);
                        handleFilterSearch('lastname', event.target.value);
                    }}
                    className="h-8 w-[150px] lg:w-[250px]"
                />

                {/* {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )} */}

                <Button
                    className="bg-green-600 text-white hover:bg-green-700 flex items-center space-x-2"
                    onClick={addNewEmployee}
                >
                    <span>
                        Add New Employee
                    </span>
                    <PlusCircledIcon />
                </Button>

            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
