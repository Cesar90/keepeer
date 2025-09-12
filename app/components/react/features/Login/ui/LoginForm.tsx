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
    ToastAction,
} from '@/shared/ui/shadcn/new-york';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { login } from '@/entities/users';
import { extractErrorMessage } from '@/shared/lib/utils/utils';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(4, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { handleSubmit, control } = form;

    const onSubmit = async (data: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await dispatch(login({
                email: data.email,
                password: data.password,
            }));
            if (login.rejected.match(result)) {
                const errorMessage = extractErrorMessage(result, '');
                throw new Error(errorMessage);
            }

            toast({
                title: 'Login successful',
                description: 'Welcome back!',
            });

            window.location.href = '/';
        } catch (error) {
            // alert(error);
            toast({
                variant: 'destructive',
                description: 'Uh oh! Something went wrong.',
                title: `${error}`,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Sign in to CER Management HR
                    </h1>
                </div>

                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Email */}
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email address
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="you@example.com"
                                            {...field}
                                            className="mt-1 text-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            {...field}
                                            className="mt-1 text-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-lg transition-all"
                        >
                            {isSubmitting ? 'Logging in...' : 'Login to your account'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
