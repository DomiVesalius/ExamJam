import React, { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import IconButton from '@mui/material/IconButton';
import { Form, FormikProvider, useFormik } from 'formik';
import HTTP from '../../utils/http';
import ReactQuill from 'react-quill';
import { Grid, Stack } from '@mui/material';
import Button from '@mui/material/Button';

interface ReplyFormAndButtonProps {
    postId: string;
    parentId: string;
}

const ReplyForm: React.FunctionComponent<ReplyFormAndButtonProps> = (props) => {
    const [text, setText] = useState('');

    const initialValues = {
        content: text
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            if (text.length === 0) return;

            setSubmitting(true);

            const commentCreationValues = {
                content: text,
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
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        <ReactQuill
                            theme="snow"
                            placeholder="Reply to this comment..."
                            value={text}
                            style={{
                                width: '100%',
                                height: 'auto',
                                paddingBottom: '20px'
                            }}
                            onChange={setText}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button type="submit" disabled={formik.isSubmitting}>
                            Reply
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
};

const ReplyButton: React.FunctionComponent<ReplyFormAndButtonProps> = (props) => {
    const [enabled, setEnabled] = useState(false);

    return (
        <Grid container>
            <Grid item xs={1}>
                <IconButton onClick={() => setEnabled(!enabled)}>
                    <ReplyIcon />
                </IconButton>
            </Grid>
            <Grid item xs={11}>
                {enabled && <ReplyForm postId={props.postId} parentId={props.parentId} />}
            </Grid>
        </Grid>
    );
};

export default ReplyButton;
