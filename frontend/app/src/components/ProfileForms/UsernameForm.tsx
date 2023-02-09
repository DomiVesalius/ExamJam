import { Button, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import HTTP from '../../utils/http';
import useSWR from 'swr';

const ChangeUsernameForm = () => {
    const getUserData = async () => {
        try {
            const res = await HTTP.get('/users/me');
            return res.data;
        } catch (e) {
            return 'Failed to get user data';
        }
    };

    const { data, error, isLoading } = useSWR('/api/users/me', getUserData);

    const usernameValidationSchema = yup.object({
        username: yup.string().min(1, 'Username too short').required()
    });

    const usernameFormik = useFormik({
        initialValues: { username: '' },
        validationSchema: usernameValidationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);
            try {
                const res = await HTTP.patch('/users/change-username', {
                    newUsername: values.username
                });
                window.location.reload();
            } catch (e: any) {
                setFieldError('username', 'An unknown error occurred');
            }

            setSubmitting(false);
        }
    });

    useEffect(() => {
        if (!(error || isLoading)) {
            usernameFormik.setFieldValue('username', data.username || '');
        }
    }, [data]);

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
                        // helperText={
                        //     usernameFormik.touched.username && usernameFormik.errors.username
                        // }
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disabled={usernameFormik.isSubmitting}
                    >
                        Change username
                    </Button>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default ChangeUsernameForm;
