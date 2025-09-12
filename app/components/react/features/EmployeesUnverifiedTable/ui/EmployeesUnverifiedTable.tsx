import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

import { fetchEmployeesUnverified, getEmployesUnverifiedData } from '@/entities/EmployeesUnverified';

export default function EmployeesUnverifiedTable() {
    const dispatch = useAppDispatch();
    const employees = useSelector(getEmployesUnverifiedData);

    useEffect(() => {
        // if (__PROJECT__ !== 'storybook') {
        dispatch(fetchEmployeesUnverified({}));
        // }
    }, [dispatch]);

    return (
        <DataTable data={employees} columns={columns} />
    );
}
