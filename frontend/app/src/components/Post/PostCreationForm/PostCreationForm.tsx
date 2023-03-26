import React, { useState, ChangeEvent } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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
import { ExamDropDown } from '../ExamDropDown/ExamDropDown';
import RtfMdEditor from '../RtfMdEditor/RtfMdEditor';

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
    const [mdValue, setMdValue] = useState('');
    const [editorState, setEditor] = useState('rtf');
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
                content: editorState === 'rtf' ? value : mdValue,
                title: values.title,
                formatType: editorState,
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
                                        <RtfMdEditor
                                            rtfValue={value}
                                            setRtfValue={setValue}
                                            mdValue={mdValue}
                                            setMdValue={setMdValue}
                                            editorState={editorState}
                                            setEditor={setEditor}
                                            editorHeight={400}
                                            editorWidth={'auto'}
                                        />
                                    </Stack>
                                    <Stack spacing={2}>
                                        <Button
                                            disabled={formik.isSubmitting}
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                        >
                                            <Typography variant="subtitle1">
                                                Create a Post!
                                            </Typography>
                                        </Button>
                                    </Stack>
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
