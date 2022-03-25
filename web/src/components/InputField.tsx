import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Form, useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, size: _, ...props }) => {
    const [field, { error }] = useField(props); //Name in type needs to be required

    return (
        //!! converts empty text to falsy 
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} placeholder={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}