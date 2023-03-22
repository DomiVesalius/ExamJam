import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import 'react-quill/dist/quill.snow.css';
import MDEditor from '@uiw/react-md-editor';
import 'katex/dist/katex.min.css';

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

    const [searchParams] = useSearchParams();
    const initialExam = searchParams.get('examId') || '';

    const [value, setValue] = useState('');
    const [examValue, setExamValue] = useState(initialExam);

    const initialValues: PostCreationFormValues = {
        title: '',
        examId: ''
    };
    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            const postCreationValues = {
                content: value,
                title: values.title,
                examId: examValue
            };
            try {
                const postId = (await HTTP.post('/posts', postCreationValues)).data.data._id;
                onSuccess(`posts/${postId}`);
            } catch (e: any) {}
            setSubmitting(false);
        }
    });
    if (!courseCode) {
        return <div>ERROR</div>;
    }

    function handleChange(content: string) {
        setValue(content);
        console.log(content);
    }

    // Set markdown editor to light mode.
    window.document.documentElement.setAttribute('data-color-mode', 'light');

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
                                        {/* @ts-ignore */}
                                        <MDEditor value={value} onChange={setValue} />
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
