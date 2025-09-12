import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AxiosError } from 'axios';

export const DATE_FORMAT = 'MM-dd-yyyy';

export enum TaxesEnum {
    W9 = 'W9',
    W2 = 'W2',
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const normalizeSpaces = (input: string) => {
    return input.trim().replace(/\s+/g, ' ');
};

export function createQueryString(params: Record<string, string | number | boolean | undefined | null>): string {
    const queryString = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');
    return queryString ? `?${queryString}` : '';
}

// Utility to remove undefined or null values from an object
export function cleanPayload<T extends object>(payload: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(payload as Record<string, unknown>)
            .filter(([_, value]) => value !== undefined && value !== null && value !== ''),
    ) as Partial<T>;
}

export const handleAsyncError = (error: AxiosError, rejectWithValue: Function) => {
    if (error.response) {
        if (error.response.status === 422) {
            const errorMessages = error.response.data;
            return rejectWithValue(errorMessages);
        }

        if (error.response.status === 401) {
            const errorMessages = error.response.data;
            return rejectWithValue(errorMessages);
        }

        // If it's an HTTP error, check for DRF bad request (400) response
        if (error.response.status === 400) {
            // Extract validation errors from DRF response
            const errorMessages = error.response.data;
            return rejectWithValue(errorMessages);
        }
        return rejectWithValue(`Request failed with status ${error.response.status}`);
    } if (error.request) {
        // If the request was made but no response was received
        return rejectWithValue('No response received from the server');
    }
    // If something else caused the error
    return rejectWithValue('Unexpected error occurred');
};

export function extractErrorMessage(
    result: any,
    defaultErrorMessage: string = 'An unknown error occurred',
): string {
    // debugger;
    const detail = result?.payload?.detail ?? result?.detail;

    if (typeof detail === 'string') {
        return detail;
    }

    if (Array.isArray(detail)) {
        // for (const error of detail) {
        //     if (typeof error === 'object' && error?.ctx?.reason) {
        //         return error.ctx.reason;
        //     }
        // }
        const errorWithReason = detail.find(
            (error) => typeof error === 'object' && error?.ctx?.reason,
        );
        if (errorWithReason) {
            return errorWithReason.ctx.reason;
        }
    }

    return defaultErrorMessage;
}

export function getFilenameFromContentDisposition(cd?: string | null, fallback = 'stubs_by_employee.zip') {
    if (!cd) return fallback;
    // e.g. attachment; filename="something.zip"
    const match = /filename\*?=(?:UTF-8''|")?([^";]+)/i.exec(cd);
    if (match?.[1]) {
        try { return decodeURIComponent(match[1].replace(/"/g, '')); } catch { return match[1]; }
    }
    return fallback;
}
