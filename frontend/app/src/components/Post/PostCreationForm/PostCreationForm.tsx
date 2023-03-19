import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SunEditor, { buttonList } from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import 'suneditor/dist/css/suneditor.min.css';

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
    const editor = useRef<SunEditorCore>();
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

    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

    function handleChange(content: string) {
        setValue(content);
        console.log(content);
    }

    function toggleCodeView(isCodeView: boolean) {
        console.log(isCodeView);
    }

    const sunEditorButtonList: Array<Array<string>> = [['math']];
    for (let button of buttonList.formatting) {
        if (typeof button == 'string') sunEditorButtonList.push([button]);
        else sunEditorButtonList.push(button);
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
                                        <SunEditor
                                            setOptions={{
                                                katex: katex,
                                                buttonList: sunEditorButtonList
                                            }}
                                            onChange={handleChange}
                                            toggleCodeView={toggleCodeView}
                                        />
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: '<p>​<span class="__se__katex katex" data-exp="\\mathbb R" data-font-size="1em" style="font-size: 1em;" contenteditable="false"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi mathvariant="double-struck">R</mi></mrow><annotation encoding="application/x-tex">\\mathbb R</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6889em;"></span><span class="mord mathbb">R</span></span></span></span>​​<br></p>'
                                            }}
                                        ></div>
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
