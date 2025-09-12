export interface InvoiceReportExtra {
    employee_count: number;
    employees_ids_in_invoice: number[];

    total_w9_hours: number;
    total_w9_rate: number;
    total_w9_amount: number;
    total_w9_markup_amount: number;

    // #Regular
    grand_regular_hours: number;
    grand_regular_rate: number;
    grand_regular_total: number;
    grand_regular_markup_total: number;
    // #Overtime
    grand_overtime_hours: number;
    grand_overtime_rate: number;
    grand_overtime_total: number;
    grand_overtime_markup_total: number;
    // #Holidays
    grand_holidays_hours: number;
    grand_holidays_rate: number;
    grand_holidays_total: number;
    grand_holidays_markup_total: number;
    // #Double Time
    grand_double_time_hours: number;
    grand_double_time_rate: number;
    grand_double_time_total: number;
    grand_double_time_markup_total: number;
    // #Attendance Bonus
    grand_attendance_bonus_hours: number;
    grand_attendance_bonus_rate: number;
    grand_attendance_bonus_total: number;
    grand_attendance_bonus_markup_total: number;
    // #Bonus
    grand_bonus_hours: number;
    grand_bonus_rate: number;
    grand_bonus_total: number;
    grand_bonus_markup_total: number;
    // #Adjustment
    grand_adjustment_hours: number;
    grand_adjustment_rate: number;
    grand_adjustment_total: number;
    grand_adjustment_markup_total: number;
    // #Bonus CER
    grand_bonus_cer_hours: number;
    grand_bonus_cer_rate: number;
    grand_bonus_cer_total: number;
    grand_bonus_cer_markup_total: number;
    // #Reduce
    grand_reduce_hours: number,
    grand_reduce_rate: number,
    grand_reduce_total: number,
    grand_reduce_markup_total: number,
    // #Attendance Bonus RH
    grand_attendance_bonus_rh_hours: number,
    grand_attendance_bonus_rh_rate: number,
    grand_attendance_bonus_rh_total: number,
    grand_attendance_bonus_rh_markup_total: number,
    // #Attendance Bonus OT
    grand_attendance_bonus_ot_hours: number;
    grand_attendance_bonus_ot_rate: number;
    grand_attendance_bonus_ot_total: number;
    grand_attendance_bonus_ot_markup_total: number;
    // #Regular Hours Rate 2
    grand_regular_hours_rate_2_hours: number;
    grand_regular_hours_rate_2_rate: number;
    grand_regular_hours_rate_2_total: number;
    grand_regular_hours_rate_2_markup_total: number;
    // #Overtime Hours Rate 2
    grand_overtime_hours_rate_2_hours: number;
    grand_overtime_hours_rate_2_rate: number;
    grand_overtime_hours_rate_2_total: number;
    grand_overtime_hours_rate_2_markup_total: number;
    // #OT2 RH RATE 1
    grand_ot2_rh_rate_1_hours: number;
    grand_ot2_rh_rate_1_rate: number;
    grand_ot2_rh_rate_1_total: number;
    grand_ot2_rh_rate_1_markup_total: number;
    // #OT2 RH Rate 2
    grand_ot2_rh_rate_2_hours: number;
    grand_ot2_rh_rate_2_rate: number;
    grand_ot2_rh_rate_2_total: number;
    grand_ot2_rh_rate_2_markup_total: number;

    // #Regular
    grand_regular_hours_w9: number;
    grand_regular_rate_w9: number;
    grand_regular_total_w9: number;
    grand_regular_markup_total_w9: number;

    // #Overtime
    grand_overtime_hours_w9: number;
    grand_overtime_rate_w9: number;
    grand_overtime_total_w9: number;
    grand_overtime_markup_total_w9: number;

    // #Holidays
    grand_holidays_hours_w9: number;
    grand_holidays_rate_w9: number;
    grand_holidays_total_w9: number;
    grand_holidays_markup_total_w9: number;

    // #Double Time
    grand_double_time_hours_w9: number;
    grand_double_time_rate_w9: number;
    grand_double_time_total_w9: number;
    grand_double_time_markup_total_w9: number;

    // #Attendance Bonus
    grand_attendance_bonus_hours_w9: number;
    grand_attendance_bonus_rate_w9: number;
    grand_attendance_bonus_total_w9: number;
    grand_attendance_bonus_markup_total_w9: number;

    // #Bonus
    grand_bonus_hours_w9: number;
    grand_bonus_rate_w9: number;
    grand_bonus_total_w9: number;
    grand_bonus_markup_total_w9: number;

    // #Adjustment
    grand_adjustment_hours_w9: number;
    grand_adjustment_rate_w9: number;
    grand_adjustment_total_w9: number;
    grand_adjustment_markup_total_w9: number;

    // #Bonus CER
    grand_bonus_cer_hours_w9: number;
    grand_bonus_cer_rate_w9: number;
    grand_bonus_cer_total_w9: number;
    grand_bonus_cer_markup_total_w9: number;

    // #Reduce
    grand_reduce_hours_w9: number;
    grand_reduce_rate_w9: number;
    grand_reduce_total_w9: number;
    grand_reduce_markup_total_w9: number;

    // #Attendance Bonus RH
    grand_attendance_bonus_rh_hours_w9: number;
    grand_attendance_bonus_rh_rate_w9: number;
    grand_attendance_bonus_rh_total_w9: number;
    grand_attendance_bonus_rh_markup_total_w9: number;

    // #Attendance Bonus OT
    grand_attendance_bonus_ot_hours_w9: number;
    grand_attendance_bonus_ot_rate_w9: number;
    grand_attendance_bonus_ot_total_w9: number;
    grand_attendance_bonus_ot_markup_total_w9: number;

    // #Regular Hours Rate 2
    grand_regular_hours_rate_2_hours_w9: number;
    grand_regular_hours_rate_2_rate_w9: number;
    grand_regular_hours_rate_2_total_w9: number;
    grand_regular_hours_rate_2_markup_total_w9: number;

    // #Overtime Hours Rate 2
    grand_overtime_hours_rate_2_hours_w9: number;
    grand_overtime_hours_rate_2_rate_w9: number;
    grand_overtime_hours_rate_2_total_w9: number;
    grand_overtime_hours_rate_2_markup_total_w9: number;

    // #OT2 RH RATE 1
    grand_ot2_rh_rate_1_hours_w9: number;
    grand_ot2_rh_rate_1_rate_w9: number;
    grand_ot2_rh_rate_1_total_w9: number;
    grand_ot2_rh_rate_1_markup_total_w9: number;

    // #OT2 RH Rate 2
    grand_ot2_rh_rate_2_hours_w9: number;
    grand_ot2_rh_rate_2_rate_w9: number;
    grand_ot2_rh_rate_2_total_w9: number;
    grand_ot2_rh_rate_2_markup_total_w9: number;
}

export type InvoiceReportExtraSum = Record<keyof SnakeToCamelKeys<InvoiceReportExtra>, number>

export interface InvoiceReport extends InvoiceReportExtra {

}

export interface InvoiceReportSum {

}

export interface SubClient {
    id: number
    region_name: string
    client_name: string
    client_code: string
    name: string
    name_invoice: string
    extra_info: string
    reference: string
    over_time_markup: number
    invoice_prefix: string
    max_regular_hours: number
    address: string
    phone: string
    extension: string
    contact_name: string
    contact_email: string
    regular_hours_markup: number
    new_regular_hours_markup: number
    time_change_regular_markup: number
    new_markup_valid_from: string
    is_new_markup_active: boolean
}

export interface SubClientEmployee {
    id: number
    subclient_name: string
    subclient_id: number
    name: string
    lastname: string
    paycornumber: string
    typeofjob_name: string
    typeofjob_id: number
    rate: number
    regular_hours_markup?: number
    over_time_markup?: number
    new_regular_hours_markup?: number
    time_change_regular_markup?: number
    is_time_change_regular_markup_active?: boolean
    is_active: boolean
}

export interface SubClientJob {
    id: number
    subclient_name: string
    subclient_id: number
    name: string
    // is_active: boolean
}

export interface SubClientLog {
    id: number
    action: string
    model_name: string
    before_value?: string
    current_value?: string
    created: string
    user_name: string
}

export interface SubClientResult extends IResultPagination<SubClient> {
    index_page: number;
}

export interface SubClientEmployeeResult extends IResultPagination<SubClientEmployee> {
    index_page: number;
}

export interface SubClientJobResult extends IResultPagination<SubClientJob> {
    index_page: number;
}

export interface SubClientLogResult extends IResultPagination<SubClientLog> {
    index_page: number;
}

export interface SubClientsSchema extends GlobalsCommonSchema {
    data: SubClientResult;
}

export interface SubClientEmployeesSchema extends GlobalsCommonSchema {
    data: SubClientEmployeeResult;
}

export interface SubClientJobsSchema extends GlobalsCommonSchema {
    data: SubClientJobResult;
}

export interface SubClientLogsSchema extends GlobalsCommonSchema {
    data: SubClientLogResult;
}

export interface SubClientsInvoices {
    subclients: SubClient[]
    invoices: InvoiceReport[]
}

export interface SubClientsInvoicesSchema extends GlobalsCommonSchema {
    data: SubClientsInvoices[]
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginSchema extends GlobalsCommonSchema {
    data: Login;
}
