import { ReactNode } from 'react';
import { ComponentRoot } from '../ui/maincontent';
import { HomePage } from '@/pages/HomePage';
// import { InvoiceListPage } from '@/pages/InvoiceListPage';
// import { InvoiceItemsListPage } from '@/pages/InvoiceItemsListPage';
// import { InvoiceItemsListPagePDF } from '@/pages/InvoiceItemsListPagePDF';
// import { ConfigEmployeePage } from '@/pages/ConfigEmployee';
// import { PaycorGenerateCSVPage } from '@/pages/PaycorGenerateCSVPage';
// import { EmployeesPage } from '@/pages/EmployeesPage';
// import { ClientsPage } from '@/pages/ClientsPage';
// import { ConfigJobSubClientPage } from '@/pages/ConfigJobSubClientPage';
// import { ParameterizationPage, SubClientIndexPage } from '@/pages/SubClient';
// import { StandardReportsPage } from '@/pages/Reports/StandardReports';
// import { SubClientReportDetailPage } from '@/pages/Reports/SubClientReportDetailPage';
// import { SubClientReportSummaryPage } from '@/pages/Reports/SubClientReportSummaryPage';
// import { InvoicesVSPayrollReportPage } from '@/pages/Reports/InvoicesVSPayrollReportPage';
// import { AccountsReceivablePage } from '@/pages/AccountsReceivablePage';
// import { SubClientReportAccountsReceivablePage } from '@/pages/Reports/SubClientReportAccountsReceivablePage';
// import { SubClientEmployeeHistoryPage } from '@/pages/Reports/SubClientEmployeeHistoryPage';

export const RootComponents: Record<string, ReactNode> = {
    [ComponentRoot.HOME]: <HomePage />
    // [ComponentRoot.INVOICECREATE]: <InvoiceCreatePage />,
    // [ComponentRoot.INVOICELIST]: <InvoiceListPage />,
    // [ComponentRoot.INVOICEITEMS]: <InvoiceItemsListPage />,
    // [ComponentRoot.INVOICEITEMSPDF]: <InvoiceItemsListPagePDF />,
    // [ComponentRoot.CONFIGEMPLOYEE]: <ConfigEmployeePage />,
    // [ComponentRoot.PAYCORGENERATECSV]: <PaycorGenerateCSVPage />,
    // [ComponentRoot.EMPLOYEES]: <EmployeesPage />,
    // [ComponentRoot.CLIENTS]: <ClientsPage />,
    // [ComponentRoot.CONFIGTYPEOFJOBSUBCLIENT]: <ConfigJobSubClientPage />,
    // [ComponentRoot.SUBCLIENTPARAMETERIZATION]: <ParameterizationPage />,
    // [ComponentRoot.REPORTSTANDARD]: <StandardReportsPage />,
    // [ComponentRoot.REPORTSUBCLIENTDETAIL]: <SubClientReportDetailPage />,
    // [ComponentRoot.REPORTSUBCLIENTSUMMARY]: <SubClientReportSummaryPage />,
    // [ComponentRoot.SUBCLIENTS]: <SubClientIndexPage />,
    // [ComponentRoot.REPORTINVOICESVSPAYROLL]: <InvoicesVSPayrollReportPage />,
    // [ComponentRoot.ACCOUNTSRECEIVABLE]: <AccountsReceivablePage />,
    // [ComponentRoot.REPORTACCOUNTSRECEIVABLE]: <SubClientReportAccountsReceivablePage />,
    // [ComponentRoot.EMPLOYEEHISTORY]: <SubClientEmployeeHistoryPage />,
};
