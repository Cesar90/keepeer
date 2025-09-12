import { fetchEmployees } from './fetchEmployees/fetchEmployees';
import { fetchSetPageIndexfEmployees } from './fetchSetPageIndexfEmployees/fetchSetPageIndexfEmployees';
import { fetchEmployeesPageSize } from './fetchEmployeesPageSize/fetchEmployeesPageSize';
import { putEmployeeById } from './putEmployeeById/putEmployeeById';
import { fetchSubclientEmployeeById } from './fetchSubclientEmployeeById/fetchSubclientEmployeeById';

import {
    postEmployeeNew,
    EmployeeNewPayload,
} from './postEmployeeNew/postEmployeeNew';

export type {
    EmployeeNewPayload,
};

export {
    fetchEmployees,
    fetchSetPageIndexfEmployees,
    fetchEmployeesPageSize,
    putEmployeeById,
    fetchSubclientEmployeeById,
    postEmployeeNew,
};
