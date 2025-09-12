import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

import { fetchEmployees, getEmployessData } from '@/entities/Employees';

export default function EmployeesTable() {
    const dispatch = useAppDispatch();
    const employees = useSelector(getEmployessData);

    useEffect(() => {
        // if (__PROJECT__ !== 'storybook') {
        dispatch(fetchEmployees({}));
        // }
    }, [dispatch]);

    return (
        <DataTable data={employees} columns={columns} />
    );
}
