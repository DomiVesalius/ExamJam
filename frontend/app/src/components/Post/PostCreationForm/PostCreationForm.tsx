import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
import { ExamDropDown } from '../ExamDropDown/ExamDropDown';

export interface PostCreationFormProps {
    onSuccess: Function;
}

export interface PostCreationFormValues {
    title: string;
    examId: string;
}

const PostCreationForm: React.FunctionComponent<PostCreationFormProps> = ({ onSuccess }) => {
    const routeParams = useParams();
    const courseCode = routeParams['courseCode'];
    const [richTextValue, setRichTextValue] = useState('');
    const [examValue, setExamValue] = useState('');

    const initialValues: PostCreationFormValues = {
        title: '',
        examId: ''
    };
    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            const postCreationValues = {
                content: richTextValue,
                title: values.title,
                examId: examValue,
                courseCode: courseCode
            };
            try {
                const postId = (await HTTP.post('/posts', postCreationValues)).data.data._id;
                onSuccess(postId);
            } catch (e: any) {}
            setSubmitting(false);
        }
    });
    if (!courseCode) {
        return <div>ERROR</div>;
    }

    return (
        <Container maxWidth="xl">
            <Card variant="outlined">
                <Stack spacing={2}>
                    <CardHeader title="Create a Post" />
                    <CardContent>
                        <FormikProvider value={formik}>
                            <Form onSubmit={formik.handleSubmit}>
                                <Stack spacing={2}>
                                    <Stack spacing={2}>
                                        <ExamDropDown
                                            value={examValue}
                                            onChange={setExamValue}
                                            courseCode={courseCode}
                                        />

                                        <TextField
                                            id="title"
                                            label="Title"
                                            name="title"
                                            onChange={formik.handleChange}
                                            value={formik.values.title}
                                            error={
                                                formik.touched.title && Boolean(formik.errors.title)
                                            }
                                            helperText={formik.touched.title && formik.errors.title}
                                        />
                                        <ReactQuill
                                            theme="snow"
                                            value={richTextValue}
                                            onChange={setRichTextValue}
                                        />
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
