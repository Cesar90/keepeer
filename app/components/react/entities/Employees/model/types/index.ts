import { TaxesEnum } from '@/shared/lib/utils/utils';

export interface Employee {
    id: number;
    name: string;
    secondname?: string;
    lastname: string;
    secondlastname?: string;
    paycornumber: string;
    taxes: TaxesEnum;
}

export interface EmployeeResult extends IResultPagination<Employee> {
    index_page: number;
}

export interface EmployeesSchema extends GlobalsCommonSchema {
    data: EmployeeResult;
}
