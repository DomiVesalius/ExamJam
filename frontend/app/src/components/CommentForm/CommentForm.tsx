import { Avatar, Box, Button, Card, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';

function CommentForm() {
    const [commentTxt, setCommentTxt] = useState('');
    const imgLink =
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
    const [richTextValue, setRichTextValue] = useState('');

    return (
        <Card>
            <Box sx={{ p: '15px' }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar src={imgLink} variant="rounded" alt="user avatar" />
                    <ReactQuill
                        theme="snow"
                        placeholder="What is your question?"
                        value={richTextValue}
                        style={{
                            width: '100%',
                            height: 'auto'
                        }}
                        onChange={setRichTextValue}
                    />
                    <Button
                        size="large"
                        variant="contained"
                        type="submit"
                        sx={{
                            p: '8px 25px'
                        }}
                    >
                        Send
                    </Button>
                </Stack>
            </Box>
        </Card>
    );
}

export default CommentForm;
