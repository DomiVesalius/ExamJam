import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {Link, useParams} from 'react-router-dom';

import { Form, FormikProvider, useFormik } from 'formik';

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import HTTP from '../../../utils/http';
import {ExamDropDown} from "../ExamDropDown/ExamDropDown";

export interface PostCreationFormProps {
    onSuccess: Function;
}

export interface PostCreationFormValues {
    title: string;
    examName: string;
}

const PostCreationForm: React.FunctionComponent<PostCreationFormProps> = ({ onSuccess }) => {
    const routeParams = useParams();
    const courseCode = routeParams['courseCode'];

    const initialValues: PostCreationFormValues = {
        title: '',
        examName: ''
    };
    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                // MAKE A POST REQUEST TO THE CREATE POST ENDPOINT NANDO MADE
                await HTTP.post('API HERE', values);
                onSuccess();
            } catch (e: any) {
                const { response } = e;
            }
            setSubmitting(false);
        }
    });
    if (!courseCode) {
        return <div>ERROR</div>;
    }


    return (
        <Container maxWidth="xs">
            <Card variant="outlined">
                <Stack spacing={2}>
                    <CardHeader title="Create a Post" />
                    <CardContent>
                        <FormikProvider value={formik}>
                            <Form onSubmit={formik.handleSubmit}>
                                <Stack spacing={2}>
                                    <Stack spacing={2}>
                                        <TextField
                                            id="title"
                                            label="Title"
                                            name="title"
                                            onChange={formik.handleChange}
                                            value={formik.values.title}
                                            error={
                                                formik.touched.title &&
                                                Boolean(formik.errors.title)
                                            }
                                            helperText={
                                                formik.touched.title && formik.errors.title
                                            }
                                        />
                                        <ExamDropDown courseCode={courseCode} />
                                    </Stack>
                                    <Button
                                        disabled={formik.isSubmitting}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        <Typography variant="subtitle1">Create a Post!</Typography>
                                    </Button>
                                </Stack>
                            </Form>
                        </FormikProvider>
                    </CardContent>
                </Stack>
            </Card>
        </Container>
    );
};

export default PostCreationForm;
