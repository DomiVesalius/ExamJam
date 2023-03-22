import { Button, Card, Stack, CardContent } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useFormik, Form, FormikProvider } from 'formik';
import HTTP from '../../utils/http';
import NameAvatar from '../NameAvatar/NameAvatar';

interface CommentFormProps {
    postId: string;
    parentId: string | null;
    author: string;
}

const CommentForm: React.FunctionComponent<CommentFormProps> = (props: CommentFormProps) => {
    const [richTextValue, setRichTextValue] = useState('');

    const initialValues = {
        content: richTextValue
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);

            const commentCreationValues = {
                content: richTextValue,
                postId: props.postId,
                parentId: props.parentId
            };

            try {
                const result = await HTTP.post('/comments', commentCreationValues);
                window.location.reload();
            } catch (e) {
                setFieldError('content', 'Unexpected error. Try again...');
            }

            setSubmitting(false);
        }
    });

    return (
        <Card sx={{ padding: '15px'}}>
            <CardContent>
                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit}>
                        <Stack direction="row" spacing={2}>
                            <NameAvatar name={props.author} />
                            <ReactQuill
                                theme="snow"
                                placeholder="What is your question?"
                                value={richTextValue}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    paddingBottom: '20px'
                                }}
                                onChange={setRichTextValue}
                            />
                            <Button
                                size="large"
                                variant="contained"
                                type="submit"
                                sx={{
                                    p: '8px 25px',
                                    height: 'fit-content'
                                }}
                                disabled={formik.isSubmitting}
                            >
                                Send
                            </Button>
                        </Stack>
                        <div>{formik.errors.content}</div>
                    </Form>
                </FormikProvider>
            </CardContent>
        </Card>
    );
};

export default CommentForm;
