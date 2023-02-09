import {
    Alert,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    Stack,
    TextField
} from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import React, { useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import SendIcon from '@mui/icons-material/Send';
import HTTP from '../../utils/http';

export interface PasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
const ChangePasswordForm = () => {
    const [showChangePasswordSuccess, setShowChangePasswordSuccess] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowChangePasswordSuccess(false), 5000);
    }, [showChangePasswordSuccess]);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const initialValues: PasswordFormValues = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const passwordValidationSchema = yup.object({
        currentPassword: yup.string().required('Password is required'),
        newPassword: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('New password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Passwords do not match')
            .required('Confirm your password')
    });

    const passwordFormik = useFormik({
        initialValues,
        validationSchema: passwordValidationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
            setSubmitting(true);

            try {
                const res = await HTTP.patch('/users/change-password', values);
                resetForm();

                setShowChangePasswordSuccess(true);
            } catch (e: any) {
                if (e.response.status === 403) {
                    setFieldError('currentPassword', 'Incorrect password');
                } else {
                    setFieldError('confirmPassword', 'An unknown error occurred');
                }
            }

            setSubmitting(false);
        }
    });

    return (
        <Stack direction="row" spacing={2} alignItems={'center'}>
            <FormikProvider value={passwordFormik}>
                <h3>Change Password:</h3>
                <Form onSubmit={passwordFormik.handleSubmit}>
                    <Stack direction="row" spacing={2} alignItems={'center'}>
                        <FormControl>
                            <TextField
                                id="password"
                                label="Password"
                                name="currentPassword"
                                type={'password'}
                                onChange={passwordFormik.handleChange}
                                value={passwordFormik.values.currentPassword}
                                error={
                                    passwordFormik.touched.currentPassword &&
                                    Boolean(passwordFormik.errors.currentPassword)
                                }
                                helperText={
                                    passwordFormik.touched.currentPassword &&
                                    passwordFormik.errors.currentPassword
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="newPassword"
                                label="New Password"
                                name="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                onChange={passwordFormik.handleChange}
                                value={passwordFormik.values.newPassword}
                                error={
                                    passwordFormik.touched.newPassword &&
                                    Boolean(passwordFormik.errors.newPassword)
                                }
                                helperText={
                                    passwordFormik.touched.newPassword &&
                                    passwordFormik.errors.newPassword
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                onChange={passwordFormik.handleChange}
                                value={passwordFormik.values.confirmPassword}
                                error={
                                    passwordFormik.touched.confirmPassword &&
                                    Boolean(passwordFormik.errors.confirmPassword)
                                }
                                helperText={
                                    passwordFormik.touched.confirmPassword &&
                                    passwordFormik.errors.confirmPassword
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            type={'submit'}
                            endIcon={<SendIcon />}
                            size={'small'}
                            disabled={passwordFormik.isSubmitting}
                        >
                            Send
                        </Button>
                    </Stack>
                    <Stack>
                        {showChangePasswordSuccess && (
                            <Alert onClose={() => setShowChangePasswordSuccess(false)}>
                                Password successfully changed
                            </Alert>
                        )}
                    </Stack>
                </Form>
            </FormikProvider>
        </Stack>
    );
};

export default ChangePasswordForm;
