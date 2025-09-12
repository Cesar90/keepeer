import {
    DetailedHTMLProps, InputHTMLAttributes, ForwardedRef, forwardRef,
} from 'react';
import styles from './Input.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

// import { FieldError } from 'react-hook-form';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: string;
}

export const Input = forwardRef(({ className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={classNames(styles.inputWrapper, {}, [className])}>
            <input
                className={classNames(styles.input, {
                    [styles.error]: error,
                })}
                ref={ref}
                {...props}
            />
            {/* {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>} */}
        </div>
    );
});
