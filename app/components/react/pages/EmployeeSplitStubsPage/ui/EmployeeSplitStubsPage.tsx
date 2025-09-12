import { EmployeePayStubForm } from '@/features/EmployeePayStub';

const EmployeeSplitStubsPage = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0" data-testid="HomePage">
            <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Tools for splitting stub of employee
                        </h2>
                        <p className="text-muted-foreground">
                            PayStubs
                        </p>
                    </div>
                </div>
                <EmployeePayStubForm />
            </div>
        </div>
    );
};

export default EmployeeSplitStubsPage;
