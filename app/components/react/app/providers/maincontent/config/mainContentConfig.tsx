import { ReactNode } from 'react';
import { ComponentRoot } from '../ui/maincontent';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { EmployeeListPage } from '@/pages/EmployeeListPage';
import { EmployeeCreatePage } from '@/pages/EmployeeCreatePage';
import { EmployeeSplitStubsPage } from '@/pages/EmployeeSplitStubsPage';
import { EmployeeListUnverifiedPage } from '@/pages/EmployeeListUnverifiedPage';

export const RootComponents: Record<string, ReactNode> = {
    [ComponentRoot.LOGIN]: <LoginPage />,
    [ComponentRoot.HOME]: <HomePage />,
    [ComponentRoot.EMPLOYEELIST]: <EmployeeListPage />,
    [ComponentRoot.EMPLOYEECREATE]: <EmployeeCreatePage />,
    [ComponentRoot.EMPLOYEESPLITSTUBS]: <EmployeeSplitStubsPage />,
    [ComponentRoot.EMPLOYEELISTUNVERIFIED]: <EmployeeListUnverifiedPage />,
};
