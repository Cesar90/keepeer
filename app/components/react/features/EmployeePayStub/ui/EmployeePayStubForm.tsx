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
} from '@/shared/ui/shadcn/new-york';
import { useToast } from '@/shared/lib/hooks/useToast/useToast';
import { getFilenameFromContentDisposition } from '@/shared/lib/utils/utils';

const MAX_MB = 50;

const formSchema = z.object({
    stub: z
        .any()
        .refine((v) => v instanceof FileList && v.length > 0, 'PDF is required')
        .transform((list: FileList) => list.item(0) as File)
        .refine((file: File) => !!file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')), 'File must be a PDF')
        .refine((file: File) => file.size <= MAX_MB * 1024 * 1024, `Max size is ${MAX_MB}MB`),
});

type FormData = z.infer<typeof formSchema>;

async function downloadBlobAsFile(resp: Response, fallbackName: string) {
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getFilenameFromContentDisposition(resp.headers.get('Content-Disposition'), fallbackName);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

export function EmployeePayStubForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // stub is controlled via <input type="file" />
        },
    });

    const onSubmit = async (values: FormData) => {
        setIsSubmitting(true);
        try {
            const fd = new FormData();
            fd.append('file', values.stub);

            // If your FastAPI lives on another origin, set the full URL here:
            // const endpoint = 'https://api.your-domain.com/split-stubs'
            const endpoint = '/api/employees/split-stubs';

            const resp = await fetch(endpoint, {
                method: 'POST',
                body: fd,
            });

            if (!resp.ok) {
                const text = await resp.text().catch(() => '');
                throw new Error(text || `Upload failed with ${resp.status}`);
            }

            await downloadBlobAsFile(resp, 'stubs_by_employee.zip');

            toast({ title: 'ZIP ready!', description: 'We split the stubs by employee.' });
            form.reset();
        } catch (err: any) {
            toast({
                variant: 'destructive',
                title: 'Upload failed',
                description: err?.message ?? 'Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="stub"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stub PDF</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="application/pdf,.pdf"
                                    onChange={(e) => {
                                        field.onChange(e.target.files as FileList);
                                    }}
                                />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">
                                Upload the combined Pay Stub PDF (max
                                {' '}
                                {MAX_MB}
                                MB). We’ll return a ZIP with one PDF per employee.
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing…' : 'Split & Download ZIP'}
                </Button>
            </form>
        </Form>
    );
}
