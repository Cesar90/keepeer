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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Textarea,
} from '@/shared/ui/shadcn/new-york';

// --------------------
// Schema and Types
// --------------------

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    bio: z.string().optional(),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>

const fieldToTabMap: Record<keyof FormData, string> = {
    name: 'personal',
    email: 'personal',
    bio: 'personal',
    address: 'address',
    city: 'address',
    country: 'address',
    notes: 'notes',
};

const tabOrder = ['personal', 'address', 'notes'];

export function TabbedLockedForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            bio: '',
            address: '',
            city: '',
            country: '',
            notes: '',
        },
    });

    const [currentTab, setCurrentTab] = useState('personal');
    const [validatedTabs, setValidatedTabs] = useState<Set<string>>(new Set(['personal']));
    const [tabsWithErrors, setTabsWithErrors] = useState<Set<string>>(new Set());

    const getTabFields = (tab: string) => {
        return Object.entries(fieldToTabMap)
            .filter(([_, t]) => t === tab)
            .map(([key]) => key) as (keyof FormData)[];
    };

    const handleTabChange = async (nextTab: string) => {
        const currentFields = getTabFields(currentTab);
        const isValid = await form.trigger(currentFields);

        if (isValid) {
            //   setValidatedTabs((prev) => new Set([...prev, currentTab, nextTab]))
            setValidatedTabs((prev) => {
                const newSet = new Set(prev);
                newSet.add(currentTab);
                newSet.add(nextTab);
                return newSet;
            });
            setTabsWithErrors((prev) => {
                const updated = new Set(prev);
                updated.delete(currentTab);
                return updated;
            });
            setCurrentTab(nextTab);
        } else {
            const errorFields = Object.keys(form.formState.errors) as (keyof FormData)[];
            const tabHasErrors = errorFields.some((f) => fieldToTabMap[f] === currentTab);
            if (tabHasErrors) {
                setTabsWithErrors((prev) => new Set(prev).add(currentTab));
            }
            // Stay on current tab
        }
    };

    const handleSubmit = async () => {
        const isValid = await form.trigger();
        if (isValid) {
            console.log('✅ Submitted:', form.getValues());
            alert('Form submitted successfully!');
        } else {
            const errorFields = Object.keys(form.formState.errors) as (keyof FormData)[];
            const tabsWithError = new Set(errorFields.map((f) => fieldToTabMap[f]));
            setTabsWithErrors(tabsWithError);

            const firstErrorTab = tabsWithError.values().next().value;
            if (firstErrorTab) setCurrentTab(firstErrorTab);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-lg shadow">
            <Form {...form}>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            {tabOrder.map((tab, index) => {
                                const isDisabled = !tabOrder.slice(0, index).every((t) => validatedTabs.has(t));
                                const hasError = tabsWithErrors.has(tab);

                                return (
                                    <TabsTrigger key={tab} value={tab} disabled={isDisabled}>
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        {hasError && <span className="text-red-500 ml-1">❗</span>}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>

                        {/* PERSONAL TAB */}
                        <TabsContent value="personal" className="space-y-4 pt-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jane Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
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
                            />
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Short bio..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </TabsContent>

                        {/* ADDRESS TAB */}
                        <TabsContent value="address" className="space-y-4 pt-4">
                            <FormField
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
                            />
                            <FormField
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
                            />
                            <FormField
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
                            />
                        </TabsContent>

                        {/* NOTES TAB */}
                        <TabsContent value="notes" className="space-y-4 pt-4">
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
                        </TabsContent>
                    </Tabs>

                    <Button onClick={handleSubmit} type="button">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
