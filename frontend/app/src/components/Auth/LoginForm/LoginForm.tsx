import React from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
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
    Typography,
    Icon,
    Grid
} from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';

import HTTP from '../../../utils/http';

export interface LoginFormProps {}

interface FormValues {
    email: string;
    password: string;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
    const navigate = useNavigate();

    const initialValues: FormValues = {
        email: '',
        password: ''
    };

    const validationSchema = yup.object({
        email: yup.string().email().required('An email is required'),
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const res = await HTTP.post('/users/login', values);
                navigate('/dashboard');
            } catch (e: any) {}

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
                                        <Button size="small" onClick={() => navigate('/register')}>
                                            Dont have an account?
                                        </Button>
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
