import { EmployeeForm } from '@/features/Employee';

const HomaPage = () => {
    return (
        <div
            data-testid="HomePage"
            className="h-full flex-1 flex-col space-y-8 p-8 md:flex"
        >
            <EmployeeForm />
        </div>
    );
};

export default HomaPage;
