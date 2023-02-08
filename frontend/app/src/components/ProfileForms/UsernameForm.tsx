import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

export interface UsernameFormValues {
    username: string;
}

const ChangeUsernameForm = () => {
    const [username, setUsername] = useState('Username');

    const initialValues: UsernameFormValues = {
        username: ''
    };

    const usernameValidationSchema = yup.object({
        username: yup.string()
    });

    const usernameFormik = useFormik({
        initialValues,
        validationSchema: usernameValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);

            setSubmitting(false);
        }
    });

    return (
        <FormikProvider value={usernameFormik}>
            <Form onSubmit={usernameFormik.handleSubmit}>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                    <TextField
                        id="username"
                        label="New username"
                        name="username"
                        onChange={usernameFormik.handleChange}
                        value={usernameFormik.values.username}
                        helperText={
                            usernameFormik.touched.username && usernameFormik.errors.username
                        }
                    />
                    <Button
                        variant="contained"
                        size={'small'}
                        onClick={() => {
                            alert('Username changed.');
                        }}
                    >
                        Change username
                    </Button>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default ChangeUsernameForm;
