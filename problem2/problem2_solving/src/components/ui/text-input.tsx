import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface FormFieldProps {
    className: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    ref: React.Ref<HTMLInputElement>;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
    { className, placeholder, name, value, onChange, onBlur },
    ref
) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (regex.test(e.target.value)) {
            onChange(e);
        }
    };

    return (
        <div className="flex flex-col flex-shrink">
            <input
                ref={ref}
                autoComplete="off"
                className={cn("h-12 font-medium text-lg w-full", className)}
                type="text"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
            />
        </div>
    );
});

export default FormField;
