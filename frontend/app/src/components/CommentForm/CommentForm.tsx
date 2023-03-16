import { Avatar, Box, Button,Card, Stack, TextField} from '@mui/material';
import { useState } from 'react';

function CommentForm() {
    const [commentTxt, setCommentTxt] = useState("");
    const imgLink = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

    return (
        <Card>
            <Box sx={{ p: "15px" }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                        src={imgLink}
                        variant="rounded"
                        alt="user avatar"
                    />
                    <TextField
                        multiline
                        fullWidth
                        minRows={4}
                        id="outlined-multilined"
                        placeholder="Add a comment"
                        value={commentTxt}
                        onChange={(e) => {
                            setCommentTxt(e.target.value);
                        }}
                    />
                    <Button
                        size="large"
                        variant="contained"
                        type="submit"
                        sx={{
                            p: "8px 25px"
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