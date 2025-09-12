import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
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
} from '@/shared/ui/shadcn/new-york';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { extractErrorMessage, TaxesEnum } from '@/shared/lib/utils/utils';
import { EmployeeNewPayload, postEmployeeNew } from '@/entities/Employees';

// --------------------
// Schema and Types
// --------------------

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
    taxes: z
        .enum(['W9', 'W2'], {
            required_error: 'Taxes value must be either "W9" or "W2".',
        }),
    paycornumber: z
        .string({
            required_error: 'Paycor number is required',
        })
        .regex(/^\d+$/, { message: 'Paycor number must contain only digits' }),
});

type FormData = z.infer<typeof formSchema>

type ITabs = 'personal' | 'paycor'

// --------------------
// Field-to-Tab Mapping
// --------------------

const fieldToTabMap: Record<keyof FormData, ITabs> = {
    name: 'personal',
    secondname: 'personal',
    lastname: 'personal',
    secondlastname: 'personal',
    taxes: 'paycor',
    paycornumber: 'paycor',
};

// --------------------
// Main Component
// --------------------

export function EmployeeForm() {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // name: "",
            // email: "",
            // address: "",
            // city: "",
            // country: "",
            // notes: "",
            // paycornumber: ""
        },
    });

    const [currentTab, setCurrentTab] = useState('personal');
    const [tabsWithErrors, setTabsWithErrors] = useState<Set<string>>(new Set());

    const handleSubmitWithTabValidation = async () => {
        const isValid = await form.trigger();

        if (isValid) {
            // console.log("✅ Submitted:", form.getValues())
            // alert("Form submitted successfully!")
            const data = form.getValues();
            const employee: EmployeeNewPayload = {
                name: data.name,
                lastname: data.lastname,
                secondname: data.secondname,
                secondlastname: data.secondlastname,
                paycornumber: +data.paycornumber,
                taxes: data.taxes as TaxesEnum,
            };

            try {
                const result = await dispatch(postEmployeeNew(employee));
                if (postEmployeeNew.rejected.match(result)) {
                    const errorMessage = extractErrorMessage(result, 'Failed to add new employee');
                    throw new Error(errorMessage);
                }

                toast({
                    title: 'Employee Added Successfully',
                });

                // const newEmployee: Employee = {
                //     id: result.payload.id,
                //     paycornumber: result.payload.paycornumber,
                //     name: result.payload.name,
                //     secondname: result.payload.secondname,
                //     lastname: result.payload.lastname,
                //     secondlastname: result.payload.secondlastname,
                //     taxes: result.payload.taxes,
                // };
                // getEmployeeData(newEmployee);
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
                        <TabsTrigger value="paycor">
                            Paycor
                            {' '}
                            {tabsWithErrors.has('paycor') && <span className="text-red-500 ml-1">❗</span>}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4 pt-4">
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
                        {/* <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="jane@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {/* <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Main St" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {/* <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="New York" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {/* <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="USA" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </TabsContent>

                    <TabsContent value="paycor" className="space-y-4 pt-4">
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
                    </TabsContent>

                    {/* <TabsContent value="address" className="space-y-4 pt-4">
                    </TabsContent> */}

                    {/* <TabsContent value="notes" className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Any extra notes..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent> */}
                </Tabs>

                <Button onClick={handleSubmitWithTabValidation} type="button">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
