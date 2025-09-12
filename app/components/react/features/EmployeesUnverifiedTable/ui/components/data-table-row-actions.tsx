import { useCallback, useState } from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row, Table } from '@tanstack/react-table';
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    ToastAction,
} from '@/shared/ui/shadcn/new-york';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    // EditEmployeeForm,
    Employee,
} from '@/entities/Employees';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>,
    table: Table<Employee>
}

export function DataTableRowActions<TData>({
    row,
    table,
}: DataTableRowActionsProps<TData>) {
    const rowData = row.original as Employee;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    const employeeUpdated = useCallback(async (employeeData: Employee) => {
        const employeeUpdate: Employee = {
            id: employeeData.id,
            name: employeeData.name,
            secondname: employeeData.secondname,
            lastname: employeeData.lastname,
            secondlastname: employeeData.secondlastname,
            paycornumber: employeeData.paycornumber,
            taxes: employeeData.taxes,
        };

        try {
            // const result = await dispatch(putEmployeeById(employeeUpdate));
            // if (putEmployeeById.rejected.match(result)) {
            //     const errorMessage = extractErrorMessage(result, 'Failed to update row');
            //     throw new Error(errorMessage);
            // }

            // toast({
            //     title: 'Employee updated successfully',
            // });

            // dispatch(
            //     employeesSliceActions.updateEmployee({
            //         index: row.index,
            //         updatedRow: employeeUpdate,
            //     }),
            // );
            // closeDialog();
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Uh oh! Something went wrong.',
                title: `${error}`,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
        // }, [toast, dispatch, row.index, closeDialog]);
    }, [toast]);

    // const employeeUpdated = useCallback(async (employeeData: Employee) => {
    //     const subClientEmployeeUpdate: Employee = {
    //         id: rowData.id,
    //         rate: employeeData.rate,
    //         is_active: employeeData.is_active,
    //         typeofjob_id: employeeData.typeofjob_id,
    //     };

    //     try {
    //         const result = await dispatch(putSubclientEmployessById(subClientEmployeeUpdate));
    //         if (putSubclientEmployessById.rejected.match(result)) {
    //             const errorMessage = extractErrorMessage(result, 'Failed to update row');
    //             throw new Error(errorMessage);
    //         }

    //         toast({
    //             title: 'Employee updated successfully',
    //         });
    //         const updatedRow = {
    //             ...rowData,
    //             rate: employeeData.rate, // Update the rate field
    //             is_active: employeeData.is_active,
    //             typeofjob_id: employeeData.typeofjob_id,
    //             typeofjob_name: employeeData.typeofjob_name,
    //         };
    //         closeDialog();
    //     } catch (error) {
    //         toast({
    //             variant: 'destructive',
    //             description: 'Uh oh! Something went wrong.',
    //             title: `${error}`,
    //             action: <ToastAction altText="Try again">Try again</ToastAction>,
    //         });
    //     }
    // }, [toast, dispatch, rowData, row.index, closeDialog]);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Edit Employee</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    {/* <EditEmployeeForm
                        employeeData={rowData}
                        updateData={employeeUpdated}
                    /> */}
                    <Button
                        type="button"
                        onClick={closeDialog}
                    >
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={() => {
                        setIsOpen(true);
                    }}
                    >
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
