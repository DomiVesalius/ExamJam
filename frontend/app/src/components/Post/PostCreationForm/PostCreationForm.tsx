import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import hljs from 'highlight.js';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
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

    function handleEditorChange(event: ChangeEvent<HTMLInputElement>, value: string) {
        setEditor(value);
        console.log(value);
    }

    // Set markdown editor to light mode.
    window.document.documentElement.setAttribute('data-color-mode', 'light');

    const markdownEditor = (
        <MDEditor
            value={mdValue}
            /* @ts-ignore */
            onChange={(value = '', event) => {
                setMdValue(value);
                // TODO: showing unicode after completing 3 ending backticks in code block
                console.log(value);
            }}
            previewOptions={{
                rehypePlugins: [[rehypeSanitize]]
            }}
        />
    );

    Quill.register('modules/imageResize', ImageResize);
    hljs.configure({
        languages: ['javascript', 'ruby', 'python', 'rust']
    });
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }]
    ];
    const quillModules = {
        toolbar: toolbarOptions,
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    };
    const rtfEditor = (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={(value) => setValue(value)}
            modules={quillModules}
        />
    );

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
                                        <FormControl>
                                            <FormLabel id="editor-row-radio-buttons-group-label">
                                                Editors
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="editor-row-radio-buttons-group-label"
                                                defaultValue="markdown"
                                                name="row-radio-buttons-group"
                                                value={editorState}
                                                onChange={handleEditorChange}
                                            >
                                                <FormControlLabel
                                                    value="rtf"
                                                    control={<Radio />}
                                                    label="Rich-Text-Format"
                                                />
                                                <FormControlLabel
                                                    value="markdown"
                                                    control={<Radio />}
                                                    label="Markdown"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        {editorState == 'rtf' ? rtfEditor : markdownEditor}
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
