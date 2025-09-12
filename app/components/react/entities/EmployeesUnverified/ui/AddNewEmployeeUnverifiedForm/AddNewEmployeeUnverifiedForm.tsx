import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    format, isBefore, startOfMonth,
} from 'date-fns';
import { CalendarIcon, CheckIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
    Button,
    Calendar,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    ToastAction,
    Checkbox,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    Command,
} from '@/shared/ui/shadcn/new-york';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    cn, DATE_FORMAT, extractErrorMessage, TaxesEnum,
} from '@/shared/lib/utils/utils';
import { EmployeeUnverified, postEmployeeUnverifiedNew } from '@/entities/EmployeesUnverified';
import {
    fetchStates,
    fetchCitiesByState,
    getStatesData,
    getStatesError,
    getStatesIsLoading,
    getStateCitiesData,
    getStateCitiesError,
    getStateCitiesIsLoading,
} from '@/entities/States';

// --------------------
// Schema and Types
// --------------------

const listADocumentTitles = [
    'U.S. Passport or U.S. Passport Card',
    'Permanent Resident Card or Alien Registration Receipt Card (Form I-551)',
    'Foreign passport that contains a temporary I-551 stamp or temporary I-551 printed notation on a machinereadable immigrant visa',
    'Employment Authorization Document that contains a photograph (Form I-766)',
    'For an individual temporarily authorized to work for a specific employer because of his or her status or parole',
    `Passport from the Federated States of Micronesia (FSM) or the Republic of the Marshall Islands (RMI) 
    with Form I-94 or Form I-94A indicating nonimmigrant admission under the Compact of Free Association Between the United States and the FSM or RM`,
] as const;

const listBDocumentTitles = [
    'Driver\'s license or ID card issued by a State or outlying possession of the United States provided it contains a photograph or information such as name, date of birth, gender, height, eye color, and address',
    'ID card issued by federal, state or local government agencies or entities, provided it contains a photograph or information such as name, date of birth, gender, height, eye color, and address',
    'School ID card with a photograph',
    'Voter\'s registration card',
    'U.S. Military card or draft record',
    'Military dependent\'s ID card',
    'U.S. Coast Guard Merchant Mariner Card',
    'Driver\'s license issued by a Canadian government authority',
    'School record or report card',
    'Clinic, doctor, or hospital record',
    'Day-care or nursery school record',
] as const;

const listCDocumentTitles = [
    'A Social Security Account Number card',
    'Certification of report of birth issued by the Department of State (Forms DS-1350, FS-545, FS-240)',
    'Original or certified copy of birth certificate issued by a State, county, municipal authority, or territory of the United States bearing an official seal',
    'Native American tribal document',
    'U.S. Citizen ID Card (Form I-197)',
    'Identification Card for Use of Resident Citizen in the United States (Form I-179)',
    'Employment authorization document issued by the Department of Homeland Security',
] as const;

const StateSchema = z.object({
    id: z.number(),
    name: z.string(),
});

const StateCitySchema = z.object({
    id: z.number(),
    name: z.string(),
});

const formSchema = z.object({
    // name: z.string().min(1, "Name is required"),
    name: z
        .string({
            required_error: 'Name of employee is required',
        }),
    secondname: z
        .string().optional(),
    lastname: z
        .string({
            required_error: 'Last Name of employee is required',
        }),
    secondlastname: z
        .string().optional(),

    address: z
        .string().optional(),

    apartment: z
        .string().optional(),

    // state: z
    //     .string().optional(),

    state: StateSchema.optional(),

    // city: z
    //     .string().optional(),

    city: StateCitySchema.optional(),

    zipcode: z
        .string().optional(),

    dateofbirth: z.date({}).optional(),

    gender: z
        .enum(['Male', 'Female'], {
        }).optional(),

    marital_status: z
        .enum(['Single', 'Married', 'Divorced', 'Widowed'], {
            required_error: 'Marital Status is required',
        })
        .optional(), // Made it optional

    emergency_contacy_name: z
        .string().optional(),

    emergency_contacy_phone_1: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
        .optional(), // Made it optional

    emergency_contacy_phone_2: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
        .optional(), // Made it optional

    ssn: z
        .string().optional(),

    taxes: z
        .enum(['W9', 'W2'], {
            required_error: 'Taxes value must be either "W9" or "W2".',
        }),
    paycornumber: z
        .string({
            required_error: 'Paycor number is required',
        })
        .regex(/^\d+$/, { message: 'Paycor number must contain only digits' }),

    social_security_number: z
        // .string({
        //     required_error: "Social Security Number is required",
        // })
        .string()
        .regex(/^\d{3}-\d{2}-\d{4}$/, { message: 'Please provide a valid SSN in the format XXX-XX-XXXX' })
        .optional(), // Made it optional

    employee_email_number: z
        .string({
        })
        .email({ message: 'Please provide a valid email address' })
        .optional(), // Made it optional

    employee_phone_number_1: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
        .optional(), // Made it optional

    employee_phone_number_2: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
        .optional(), // Made it optional

    hiredate: z.date({}).optional(),
    terminationdate: z.date({}).optional(),

    fed_filing_status: z
        .enum([
            'Single Or Married Filing Separately',
            'Married Filing Jointly',
            'Head of Household',
        ], {
            // required_error: 'Federal Filing Status is required',
        })
        .optional(), // Made it optional

    will_direct_deposit_be_set_up: z.boolean().optional(),
    account_number: z
        .string().optional(),
    routing_number: z
        .string().optional(),
    financial_institution_name_bank: z
        .string().optional(),
    account_type: z
        .enum([
            'Checking',
            'Saving',
        ], {
            // required_error: 'Federal Filing Status is required',
        })
        .optional(), // Made it optional

    employer_review_and_verification: z
        .enum([
            'List A',
            'List B AND List C',
        ], {
            // required_error: 'Federal Filing Status is required',
        })
        .optional(), // Made it optional

    list_a_document_title_1: z.enum(listADocumentTitles).optional(),

    // list_a_document_title_1: z
    //     .enum([
    //         'U.S. Passport or U.S. Passport Card',
    //         'Permanent Resident Card or Alien Registration Receipt Card (Form I-551)',
    //         `Foreign passport that contains a temporary I-551 stamp or temporary I-551 printed notation on a machinereadable immigrant visa`,
    //         `Employment Authorization Document that contains a photograph (Form I-766)`,
    //         `For an individual temporarily authorized to work for a specific employer because of his or her status or parole`,
    //         `Passport from the Federated States of Micronesia (FSM) or the Republic of the Marshall Islands (RMI) with Form I-94 or Form I-94A indicating nonimmigrant admission under the Compact of Free Association Between the United States and the FSM or RM`,
    //     ], {
    //         // required_error: 'Federal Filing Status is required',
    //     })
    //     .optional(), // Made it optional

    list_a_issuing_authority: z
        .string().optional(),
    list_a_document_number: z
        .string().optional(),
    list_a_expiration_date: z.date({}).optional(),

    list_b_document_title_2: z.enum(listBDocumentTitles).optional(),

    list_b_issuing_authority: z
        .string().optional(),
    list_b_document_number: z
        .string().optional(),
    list_b_expiration_date: z.date({}).optional(),

    list_c_document_title_3: z.enum(listCDocumentTitles).optional(),

    list_c_issuing_authority: z
        .string().optional(),
    list_c_document_number: z
        .string().optional(),
    list_c_expiration_date: z.date({}).optional(),

});

type FormData = z.infer<typeof formSchema>

type ITabs = 'personal' | 'personal_2' | 'employee_info'

// --------------------
// Field-to-Tab Mapping
// --------------------

const fieldToTabMap: Record<keyof FormData, ITabs> = {
    name: 'personal',
    secondname: 'personal',
    lastname: 'personal',
    secondlastname: 'personal',
    address: 'personal',
    apartment: 'personal',
    city: 'personal',
    state: 'personal',
    zipcode: 'personal',
    dateofbirth: 'personal',
    gender: 'personal',
    marital_status: 'personal',
    emergency_contacy_name: 'personal_2',
    emergency_contacy_phone_1: 'personal_2',
    emergency_contacy_phone_2: 'personal_2',
    ssn: 'personal_2',
    taxes: 'employee_info',
    paycornumber: 'employee_info',
    social_security_number: 'employee_info',
    employee_email_number: 'employee_info',
    employee_phone_number_1: 'employee_info',
    employee_phone_number_2: 'employee_info',
    hiredate: 'employee_info',
    terminationdate: 'employee_info',
    fed_filing_status: 'employee_info',
    will_direct_deposit_be_set_up: 'employee_info',
    account_number: 'employee_info',
    routing_number: 'employee_info',
    financial_institution_name_bank: 'employee_info',
    account_type: 'employee_info',
    employer_review_and_verification: 'employee_info',
    list_a_document_title_1: 'employee_info',
    list_a_issuing_authority: 'employee_info',
    list_a_document_number: 'employee_info',
    list_a_expiration_date: 'employee_info',

    list_b_document_title_2: 'employee_info',
    list_b_issuing_authority: 'employee_info',
    list_b_document_number: 'employee_info',
    list_b_expiration_date: 'employee_info',

    list_c_document_title_3: 'employee_info',
    list_c_issuing_authority: 'employee_info',
    list_c_document_number: 'employee_info',
    list_c_expiration_date: 'employee_info',
};

// --------------------
// Main Component
// --------------------
interface IAddNewEmployeeUnverifiedForm {
    getEmployeeData: (employeeData: EmployeeUnverified) => void
}

export function AddNewEmployeeUnverifiedForm(props: IAddNewEmployeeUnverifiedForm) {
    const { getEmployeeData } = props;

    const states = useSelector(getStatesData);
    const isLoading = useSelector(getStatesIsLoading);
    const error = useSelector(getStatesError);

    const stateCities = useSelector(getStateCitiesData);
    const isStateCitiesLoading = useSelector(getStateCitiesIsLoading);
    const stateCitiesError = useSelector(getStateCitiesError);

    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            state: undefined,
            // name: "",
            // email: "",
            // address: "",
            // city: "",
            // country: "",
            // notes: "",
            // paycornumber: ""
        },
    });
    const [search, setSearch] = useState('');
    const [currentTab, setCurrentTab] = useState('personal');
    const [tabsWithErrors, setTabsWithErrors] = useState<Set<string>>(new Set());

    const {
        watch,
    } = form;

    const watchDirectDeposit = watch('will_direct_deposit_be_set_up');
    const watchEmployerReviewAndVerification = watch('employer_review_and_verification');
    const state = watch('state');

    useEffect(() => {
        if (!state) {
            dispatch(fetchStates());
        }
    }, [state, dispatch]);

    // console.log(watchEmployerReviewAndVerification);

    useEffect(() => {
        if (state?.id) {
            form.setValue('city', undefined);
            dispatch(fetchCitiesByState(state.id));
        }
    }, [state, form, dispatch]);

    const handleSubmitWithTabValidation = async () => {
        const isValid = await form.trigger();

        if (isValid) {
            // console.log("✅ Submitted:", form.getValues())
            // alert("Form submitted successfully!")
            const data = form.getValues();
            const employee: Omit<EmployeeUnverified, 'id'> = {
                name: data.name,
                lastname: data.lastname,
                secondname: data.secondname,
                secondlastname: data.secondlastname,
                paycornumber: data.paycornumber,
                taxes: data.taxes as TaxesEnum,
            };

            try {
                const result = await dispatch(postEmployeeUnverifiedNew(employee));
                if (postEmployeeUnverifiedNew.rejected.match(result)) {
                    const errorMessage = extractErrorMessage(result, 'Failed to add new employee');
                    throw new Error(errorMessage);
                }

                toast({
                    title: 'Unverified Employee Added Successfully',
                });

                const newEmployee: EmployeeUnverified = {
                    id: result.payload.id,
                    paycornumber: result.payload.paycornumber,
                    name: result.payload.name,
                    secondname: result.payload.secondname,
                    lastname: result.payload.lastname,
                    secondlastname: result.payload.secondlastname,
                    taxes: result.payload.taxes,
                };
                getEmployeeData(newEmployee);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    description: 'Uh oh! Something went wrong.',
                    title: `${error}`,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            }
        } else {
            const errorFields = Object.keys(form.formState.errors) as (keyof FormData)[];
            const tabs = new Set<string>(errorFields.map((field) => fieldToTabMap[field]));
            setTabsWithErrors(tabs);

            // Use iterator instead of spread for older TypeScript compatibility
            const firstTab = tabs.values().next().value;
            if (firstTab) {
                setCurrentTab(firstTab);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="personal">
                            Personal
                            {' '}
                            {tabsWithErrors.has('personal') && <span className="text-red-500 ml-1">❗</span>}
                        </TabsTrigger>
                        <TabsTrigger value="personal_2">
                            Personal 2
                            {' '}
                            {tabsWithErrors.has('personal_2') && <span className="text-red-500 ml-1">❗</span>}
                        </TabsTrigger>
                        <TabsTrigger value="employee_info">
                            Employee Info
                            {' '}
                            {tabsWithErrors.has('employee_info') && <span className="text-red-500 ml-1">❗</span>}
                        </TabsTrigger>
                    </TabsList>

                    <div className="overflow-y-auto max-h-[50vh] p-5">
                        {/* <div className="overflow-y-auto h-screen"> */}
                        <TabsContent value="personal" className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="secondname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Second Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Second Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Last Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="secondlastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Second Last Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Address (Street Number and Name)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Address (Street Number and Name)"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="apartment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Apt. Number (if any)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Apt. Number (if any) "
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                State
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="State"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <Popover modal>
                                                    <FormLabel className="mb-2">Select State</FormLabel>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    'justify-between',
                                                                    !field.value && 'text-muted-foreground',
                                                                )}
                                                            >
                                                                {field.value ? field.value.name : 'Select Item'}
                                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search..." />
                                                            <CommandList>
                                                                <CommandEmpty>No term found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {states.map((state) => (
                                                                        <CommandItem
                                                                            value={state.name}
                                                                            key={state.id}
                                                                            onSelect={() => {
                                                                                form.setValue('state', state);
                                                                            }}
                                                                        >
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'mr-2 h-4 w-4',
                                                                                    field.value?.name === state.name ? 'opacity-100' : 'opacity-0',
                                                                                )}
                                                                            />
                                                                            {state.name}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                City
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="City"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <Popover modal>
                                                    <FormLabel className="mb-2">Select City</FormLabel>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                // disabled={isStateCitiesLoading}
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    'justify-between',
                                                                    !field.value && 'text-muted-foreground',
                                                                )}
                                                            >
                                                                {field.value ? field.value.name : 'Select Item'}
                                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search..." />
                                                            <CommandList>
                                                                <CommandEmpty>No term found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {stateCities.map((city) => (
                                                                        <CommandItem
                                                                            value={city.name}
                                                                            key={city.id}
                                                                            onSelect={() => {
                                                                                form.setValue('city', city);
                                                                            }}
                                                                        >
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'mr-2 h-4 w-4',
                                                                                    field.value?.name === city.name
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0',
                                                                                )}
                                                                            />
                                                                            {city.name}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="zipcode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                ZIP Code
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="ZIP Code"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dateofbirth"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="mb-2">Date of Birth</FormLabel>
                                            {/* <FormLabel>Due date</FormLabel> */}
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                'pl-3 text-left font-normal',
                                                                !field.value && 'text-muted-foreground',
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, DATE_FORMAT)
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        // onSelect={handleDateSelect}
                                                        // disabled={(date) => date < new Date()}
                                                        disabled={(date) => isBefore(date, startOfMonth(new Date()))}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem className="">
                                            <FormLabel>Gender</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value} // Binds the selected value to the form state
                                                    onValueChange={(value) => field.onChange(value)} // Updates form state when selection changes
                                                >
                                                    {/* <SelectTrigger className="h-8 w-[200px]"></SelectTrigger> */}
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Gender" />
                                                    </SelectTrigger>
                                                    <SelectContent side="top">
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="marital_status"
                                    render={({ field }) => (
                                        <FormItem className="">
                                            <FormLabel>Marital Status</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value} // Binds the selected value to the form state
                                                    onValueChange={(value) => field.onChange(value)} // Updates form state when selection changes
                                                >
                                                    {/* <SelectTrigger className="h-8 w-[200px]"></SelectTrigger> */}
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Select a Marital Status"
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent side="top">
                                                        <SelectItem value="Single">Single</SelectItem>
                                                        <SelectItem value="Married">Married</SelectItem>
                                                        <SelectItem value="Divorced">Divorced</SelectItem>
                                                        <SelectItem value="Widowed">Widowed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="personal_2" className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    control={form.control}
                                    name="emergency_contacy_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Emergency Contact Name:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Emergency Contact Name:"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="emergency_contacy_phone_1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Emergency Contact Phone 1</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Emergency Contact Phone 1"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="emergency_contacy_phone_2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Emergency Contact Phone 2</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Emergency Contact Phone 2"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="ssn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                SSN
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="SSN"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="employee_info" className="space-y-4 pt-4">
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="paycornumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Paycor ID</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="New Paycor ID"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="taxes"
                                        render={({ field }) => (
                                            <FormItem className="">
                                                <FormLabel>Taxes</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value} // Binds the selected value to the form state
                                                        onValueChange={(value) => field.onChange(value)} // Updates form state when selection changes
                                                    >
                                                        {/* <SelectTrigger className="h-8 w-[200px]"></SelectTrigger> */}
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Tax Type" />
                                                        </SelectTrigger>
                                                        <SelectContent side="top">
                                                            <SelectItem value="W9">W9</SelectItem>
                                                            <SelectItem value="W2">W2</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="social_security_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    U.S. Social Security Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="U.S. Social Security Number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="employee_email_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employee Email Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Employee's Email Number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="employee_phone_number_1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employee Email Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Employee's Phone Number 1"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="employee_phone_number_2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employee Phone Number 2</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Employee's Phone Number 2"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="hiredate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="mb-2">Hire Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    'pl-3 text-left font-normal',
                                                                    !field.value && 'text-muted-foreground',
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, DATE_FORMAT)
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            // onSelect={handleDateSelect}
                                                            // disabled={(date) => date < new Date()}
                                                            disabled={(date) => isBefore(date, startOfMonth(new Date()))}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="terminationdate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="mb-2">Termination Date:</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    'pl-3 text-left font-normal',
                                                                    !field.value && 'text-muted-foreground',
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, DATE_FORMAT)
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            // onSelect={handleDateSelect}
                                                            // disabled={(date) => date < new Date()}
                                                            disabled={(date) => isBefore(date, startOfMonth(new Date()))}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="fed_filing_status"
                                        render={({ field }) => (
                                            <FormItem className="">
                                                <FormLabel>Fed Filing Status</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value} // Binds the selected value to the form state
                                                        onValueChange={(value) => field.onChange(value)} // Updates form state when selection changes
                                                    >
                                                        {/* <SelectTrigger className="h-8 w-[200px]"></SelectTrigger> */}
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Select a Fed Filing Status"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent side="top">
                                                            <SelectItem
                                                                value="Single Or Married Filing Separately"
                                                            >
                                                                Single Or Married Filing Separately
                                                            </SelectItem>
                                                            <SelectItem value="Married Filing Jointly">
                                                                Married Filing Jointly
                                                            </SelectItem>
                                                            <SelectItem value="Head of Household">
                                                                Head of Household
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="will_direct_deposit_be_set_up"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>Will Direct Deposit be set up for this employee?</FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {watchDirectDeposit && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="account_number"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Account Number
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Account Number"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="routing_number"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Routing Number
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Routing Number"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="financial_institution_name_bank"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Financial Institution Name (Bank)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Financial Institution Name (Bank)"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="account_type"
                                                render={({ field }) => (
                                                    <FormItem className="">
                                                        <FormLabel>Account Type</FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                value={field.value} // Binds the selected value to the form state
                                                                onValueChange={(value) => field.onChange(value)} // Updates form state when selection changes
                                                            >
                                                                {/* <SelectTrigger className="h-8 w-[200px]"></SelectTrigger> */}
                                                                <SelectTrigger>
                                                                    <SelectValue
                                                                        placeholder="Account Type"
                                                                    />
                                                                </SelectTrigger>
                                                                <SelectContent side="top">
                                                                    <SelectItem
                                                                        value="Checking"
                                                                    >
                                                                        Checking
                                                                    </SelectItem>
                                                                    <SelectItem value="Saving">
                                                                        Saving
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="employer_review_and_verification"
                                        render={({ field }) => (
                                            <FormItem className="">
                                                <FormLabel>Employer Review And Verification</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value} // Binds the selected value to the form state
                                                        onValueChange={(value) => field.onChange(value)} // Updates form state when selection changes
                                                    >
                                                        {/* <SelectTrigger className="h-8 w-[200px]"></SelectTrigger> */}
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Select One"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent side="top">
                                                            <SelectItem
                                                                value="Select One"
                                                            >
                                                                Select One
                                                            </SelectItem>
                                                            <SelectItem
                                                                value="List A"
                                                            >
                                                                List A Documents that Establish Both Identity and Employment Authorization
                                                            </SelectItem>
                                                            <SelectItem value="List B AND List C">
                                                                List B Documents that Establish Identity AND List C Documents that Establish Employment Authorization
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>

                                {watchEmployerReviewAndVerification === 'List A' && (

                                    <div
                                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                    >
                                        <fieldset
                                            className="border border-gray-300 rounded p-4 flex-[1] lg:flex-[1/4] grid grid-cols-1 gap-4"
                                        >
                                            <legend className="text-lg font-medium mb-4">
                                                List A Document Information
                                            </legend>

                                            <FormField
                                                control={form.control}
                                                name="list_a_document_title_1"
                                                render={({ field }) => (
                                                    <FormItem className="">
                                                        <FormLabel>List A - Document Title 1</FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                value={field.value} // Binds the selected value to the form state
                                                                onValueChange={(value) => field.onChange(value)} // Updates form state when selection changes
                                                            >
                                                                {/* <SelectTrigger className="h-8 w-[200px]"></SelectTrigger> */}
                                                                <SelectTrigger>
                                                                    <SelectValue
                                                                        placeholder="List A - Document Title 1"
                                                                    />
                                                                </SelectTrigger>
                                                                <SelectContent side="top">
                                                                    {listADocumentTitles.map((title) => (
                                                                        <SelectItem key={title} value={title}>
                                                                            {title}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="list_a_issuing_authority"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            List A - Issuing Authority
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="List A - Issuing Authority"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="list_a_document_number"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            List A - Document Number
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="List A - Document Number"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="list_a_expiration_date"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel className="mb-2">
                                                            List A - Expiration Date
                                                        </FormLabel>
                                                        {/* <FormLabel>Due date</FormLabel> */}
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outline"
                                                                        className={cn(
                                                                            'pl-3 text-left font-normal',
                                                                            !field.value && 'text-muted-foreground',
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, DATE_FORMAT)
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    // onSelect={handleDateSelect}
                                                                    // disabled={(date) => date < new Date()}
                                                                    disabled={(date) => isBefore(date, startOfMonth(new Date()))}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </fieldset>
                                    </div>
                                )}

                                <div
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                >

                                    {watchEmployerReviewAndVerification === 'List B AND List C' && (
                                        <>
                                            <fieldset
                                                className="border border-gray-300 rounded p-4 flex-[1] lg:flex-[1/4] grid grid-cols-1 gap-4"
                                            >
                                                <legend className="text-lg font-medium mb-4">
                                                    List B Document Information
                                                </legend>

                                                <FormField
                                                    control={form.control}
                                                    name="list_b_document_title_2"
                                                    render={({ field }) => (
                                                        <FormItem className="">
                                                            <FormLabel>Document Title 2</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    value={field.value} // Binds the selected value to the form state
                                                                    onValueChange={(value) => field.onChange(value)} // Updates form state when selection changes
                                                                >
                                                                    {/* <SelectTrigger className="h-8 w-[200px]"></SelectTrigger> */}
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder="Document Title 2"
                                                                        />
                                                                    </SelectTrigger>
                                                                    <SelectContent side="top">
                                                                        {listBDocumentTitles.map((title) => (
                                                                            <SelectItem key={title} value={title}>
                                                                                {title}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="list_b_issuing_authority"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                List B - Issuing Authority
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="List B - Issuing Authority"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="list_b_document_number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                List B - Document Number
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="List B - Document Number"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="list_b_expiration_date"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel className="mb-2">
                                                                List B - Expiration Date
                                                            </FormLabel>
                                                            {/* <FormLabel>Due date</FormLabel> */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="outline"
                                                                            className={cn(
                                                                                'pl-3 text-left font-normal',
                                                                                !field.value && 'text-muted-foreground',
                                                                            )}
                                                                        >
                                                                            {field.value ? (
                                                                                format(field.value, DATE_FORMAT)
                                                                            ) : (
                                                                                <span>Pick a date</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={field.onChange}
                                                                        // onSelect={handleDateSelect}
                                                                        // disabled={(date) => date < new Date()}
                                                                        disabled={(date) => isBefore(date, startOfMonth(new Date()))}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                            </fieldset>

                                            <fieldset
                                                className="border border-gray-300 rounded p-4 flex-[1] lg:flex-[1/4] grid grid-cols-1 gap-4"
                                            >

                                                <legend className="text-lg font-medium mb-4">
                                                    List C Document Information
                                                </legend>

                                                <FormField
                                                    control={form.control}
                                                    name="list_c_document_title_3"
                                                    render={({ field }) => (
                                                        <FormItem className="">
                                                            <FormLabel>Document Title 3</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    value={field.value} // Binds the selected value to the form state
                                                                    onValueChange={(value) => field.onChange(value)} // Updates form state when selection changes
                                                                >
                                                                    {/* <SelectTrigger className="h-8 w-[200px]"></SelectTrigger> */}
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            placeholder="Document Title 3"
                                                                        />
                                                                    </SelectTrigger>
                                                                    <SelectContent side="top">
                                                                        {listCDocumentTitles.map((title) => (
                                                                            <SelectItem key={title} value={title}>
                                                                                {title}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="list_c_issuing_authority"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                List C - Issuing Authority
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="List C - Issuing Authority"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="list_c_document_number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                List C - Document Number
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="List C - Document Number"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="list_c_expiration_date"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel className="mb-2">
                                                                List C - Expiration Date
                                                            </FormLabel>
                                                            {/* <FormLabel>Due date</FormLabel> */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="outline"
                                                                            className={cn(
                                                                                'pl-3 text-left font-normal',
                                                                                !field.value && 'text-muted-foreground',
                                                                            )}
                                                                        >
                                                                            {field.value ? (
                                                                                format(field.value, DATE_FORMAT)
                                                                            ) : (
                                                                                <span>Pick a date</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={field.onChange}
                                                                        // onSelect={handleDateSelect}
                                                                        // disabled={(date) => date < new Date()}
                                                                        disabled={(date) => isBefore(date, startOfMonth(new Date()))}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </fieldset>
                                        </>
                                    )}

                                </div>
                            </>
                        </TabsContent>
                    </div>
                </Tabs>

                <Button onClick={handleSubmitWithTabValidation} type="button">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
