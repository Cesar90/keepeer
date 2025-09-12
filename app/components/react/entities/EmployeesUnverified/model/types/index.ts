import { TaxesEnum } from '@/shared/lib/utils/utils';

export interface EmployeeUnverified {
    id: number;
    name: string;
    secondname?: string;
    lastname: string;
    secondlastname?: string;
    paycornumber: string;
    taxes: TaxesEnum;
}

export interface EmployeeUnverifiedResult extends IResultPagination<EmployeeUnverified> {
    index_page: number;
}

export interface EmployeesUnverifiedSchema extends GlobalsCommonSchema {
    data: EmployeeUnverifiedResult;
}
