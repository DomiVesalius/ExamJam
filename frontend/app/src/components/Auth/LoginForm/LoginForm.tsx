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
import { useMainContext } from '../../../contexts/Main/MainContext';

export interface LoginFormProps {}

interface FormValues {
    email: string;
    password: string;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
    const { setIsAuthenticated } = useMainContext();

    const initialValues: FormValues = {
        email: '',
        password: ''
    };

    const validationSchema = yup.object({
        email: yup.string().email().required('An email is required'),
        password: yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);
            try {
                const res = await HTTP.post('/users/login', values);
                setIsAuthenticated(true);
            } catch (e: any) {
                if (e.request.status === 401) {
                    setFieldError('password', 'Incorrect password');
                } else {
                    setFieldError('password', 'Unexpected error. Try again.');
                }
            }
            setSubmitting(false);
        }
    });

    return (
        <Container maxWidth="xs">
            <Card variant="outlined">
                <Stack spacing={2}>
                    <CardHeader title="Login" />
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
                                    </Stack>
                                    <Button
                                        disabled={formik.isSubmitting}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        <Typography variant="subtitle1">Login</Typography>
                                    </Button>
                                    <CardActions>
                                        <Link to="/register">
                                            <Button size="small">Dont have an account?</Button>
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

export default LoginForm;
