import React from 'react';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { Form, FormikProvider, useFormik } from 'formik';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import HTTP from '../../../utils/http';

export interface RegisterFormProps {
    onSuccess: Function;
}

export interface RegisterFormValues {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm: React.FunctionComponent<RegisterFormProps> = ({ onSuccess }) => {
    const initialValues: RegisterFormValues = {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = yup.object({
        email: yup
            .string()
            .email()
            .matches(new RegExp('^.+@(mail\\.utoronto|utoronto)\\.ca$'), 'Enter a valid UofT email')
            .required('An email is required'),
        username: yup.string().required('Username is required'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords do not match')
            .required('Confirm your password')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                await HTTP.post('/users/register', values);
                onSuccess();
            } catch (e: any) {
                const { response } = e;
                if (response.status === 409) {
                    formik.setFieldError('email', 'Email already in use');
                } else {
                    formik.setFieldError('email', 'Email is not a valid UofT email');
                }
            }

            setSubmitting(false);
        }
    });

    return (
        <Container maxWidth="xs">
            <Card variant="outlined">
                <Stack spacing={2}>
                    <CardHeader title="Register" />
                    <CardContent>
                        <FormikProvider value={formik}>
                            <Form onSubmit={formik.handleSubmit}>
                                <Stack spacing={2}>
                                    <Stack spacing={2}>
                                        <TextField
                                            id="email"
                                            label="Email"
                                            type="email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            error={
                                                formik.touched.email && Boolean(formik.errors.email)
                                            }
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                        <TextField
                                            id="username"
                                            label="Username"
                                            name="username"
                                            onChange={formik.handleChange}
                                            value={formik.values.username}
                                            error={
                                                formik.touched.username &&
                                                Boolean(formik.errors.username)
                                            }
                                            helperText={
                                                formik.touched.username && formik.errors.username
                                            }
                                        />
                                        <TextField
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            error={
                                                formik.touched.password &&
                                                Boolean(formik.errors.password)
                                            }
                                            helperText={
                                                formik.touched.password && formik.errors.password
                                            }
                                        />
                                        <TextField
                                            id="confirmPassword"
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.confirmPassword}
                                            error={
                                                formik.touched.confirmPassword &&
                                                Boolean(formik.errors.confirmPassword)
                                            }
                                            helperText={
                                                formik.touched.confirmPassword &&
                                                formik.errors.confirmPassword
                                            }
                                        />
                                    </Stack>
                                    <Button
                                        disabled={formik.isSubmitting}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        <Typography variant="subtitle1">Register</Typography>
                                    </Button>
                                    <CardActions>
                                        <Link to="/login">
                                            <Button size="small">Already have an account?</Button>
                                        </Link>
                                    </CardActions>
                                </Stack>
                            </Form>
                        </FormikProvider>
                    </CardContent>
                </Stack>
            </Card>
        </Container>
    );
};

export default RegisterForm;
