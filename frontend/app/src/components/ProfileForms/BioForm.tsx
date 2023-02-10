import React, { useEffect, useState } from 'react';
import HTTP from '../../utils/http';
import useSWR from 'swr';
import { Form, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Stack, TextField } from '@mui/material';

const ChangeBioForm = () => {
    const [showChangeBioSuccess, setShowChangeBioSuccess] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowChangeBioSuccess(false), 5000);
    }, [showChangeBioSuccess]);

    const getUserData = async () => {
        try {
            const res = await HTTP.get('/users/me');
            return res.data;
        } catch (e) {
            return 'Failed to get user data';
        }
    };

    const bioValidationSchema = yup.object({
        bio: yup.string()
    });

    const { data, error, isLoading } = useSWR('/api/users/me', getUserData);

    const bioFormik = useFormik({
        initialValues: { bio: '' },
        validationSchema: bioValidationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);

            try {
                const res = await HTTP.patch('/users/change-bio', values);
                window.location.reload();
            } catch (e: any) {
                setFieldError('bio', 'An unknown error occurred');
            }

            setSubmitting(false);
        }
    });

    useEffect(() => {
        if (!(error || isLoading)) {
            bioFormik.setFieldValue('bio', data.bio || '');
        }
    }, [data]);

    return (
        <div style={{ width: '100%' }}>
            <FormikProvider value={bioFormik}>
                <Form onSubmit={bioFormik.handleSubmit}>
                    <Stack>
                        <TextField
                            id="bio"
                            name="bio"
                            label="Bio"
                            multiline
                            rows={4}
                            placeholder="Enter a bio that describes you!"
                            value={bioFormik.values.bio}
                            onChange={bioFormik.handleChange}
                            helperText={bioFormik.touched.bio && bioFormik.errors.bio}
                            sx={{ m: 1 }}
                            fullWidth
                        />
                        <Button variant="contained" type="submit" disabled={bioFormik.isSubmitting}>
                            Update
                        </Button>
                    </Stack>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default ChangeBioForm;
