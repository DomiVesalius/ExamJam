import { Avatar, Box, Card, Divider, Grid, Pagination, Stack, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React from 'react';

const imgLink =
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
const parent = 'Fernando Mancini';
const child = 'Nando Sousa';

let commentList = {
    data: [
        {
            _id: 'guy 1',
            postId: '640ebb95edd31461d605a3c8',
            parentId: '',
            content: 'comment 1',
            children: [
                {
                    _id: 'child 1',
                    postId: '640ebb95edd31461d605a3c8',
                    parentId: '6411119542b715cd0107238c',
                    content: 'reply 1',
                    children: []
                },
                {
                    _id: 'child 2',
                    postId: '640ebb95edd31461d605a3c8',
                    parentId: '6411119542b715cd0107238c',
                    content: 'reply 2',
                    children: []
                },
                {
                    _id: 'child 3',
                    postId: '640ebb95edd31461d605a3c8',
                    parentId: '6411119542b715cd0107238c',
                    content: 'reply 3',
                    children: []
                },
                {
                    _id: 'child 4',
                    postId: '640ebb95edd31461d605a3c8',
                    parentId: '6411119542b715cd0107238c',
                    content: 'reply 4',
                    children: []
                }
            ]
        },
        {
            _id: 'guy 2',
            postId: '640ebb95edd31461d605a3c8',
            parentId: '',
            content: 'comment 2',
            children: [
                {
                    _id: 'child',
                    postId: '640ebb95edd31461d605a3c8',
                    parentId: '6411119542b715cd0107238c',
                    content: 'reply 2 - 1',
                    children: []
                },
                {
                    _id: 'child ',
                    postId: '640ebb95edd31461d605a3c8',
                    parentId: '6411119542b715cd0107238c',
                    content: 'reply 2 -2',
                    children: []
                },
                {
                    _id: 'child',
                    postId: '640ebb95edd31461d605a3c8',
                    parentId: '6411119542b715cd0107238c',
                    content: 'reply 2- 3',
                    children: []
                },
                {
                    _id: 'child',
                    postId: '640ebb95edd31461d605a3c8',
                    parentId: '6411119542b715cd0107238c',
                    content: 'reply 2 - 4',
                    children: []
                }
            ]
        }
    ],
    totalPages: 8
};

interface CommentSectionProps {}

let comments = commentList.data;

export const CommentSection = () => {
    return (
        <Box>
            <Stack>
                {comments.map((e) => (
                    <Card sx={{ p: '40px 20px', my: '20px', width: '40vw' }}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt="Remy Sharp" src={imgLink} />
                            </Grid>
                            <Grid item>
                                <Stack>
                                    <ThumbUpIcon></ThumbUpIcon>
                                    <ThumbDownIcon></ThumbDownIcon>
                                </Stack>
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <Typography
                                    variant={'h6'}
                                    sx={{ m: 0, textAlign: 'left', fontWeight: 'bold' }}
                                >
                                    {e._id}
                                </Typography>
                                <Typography align="left" paragraph={true}>
                                    {e.content}
                                </Typography>
                            </Grid>
                        </Grid>
                        {e.children.map((e) => (
                            <Grid
                                container
                                wrap="nowrap"
                                spacing={2}
                                sx={{ m: 3, bgcolor: '#ededed', borderRadius: '8px' }}
                            >
                                <Grid item>
                                    <Avatar alt="Remy Sharp" src={imgLink} />
                                </Grid>
                                <Grid item>
                                    <Stack>
                                        <ThumbUpIcon></ThumbUpIcon>
                                        <ThumbDownIcon></ThumbDownIcon>
                                    </Stack>
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <div>
                                        <Typography
                                            variant={'h6'}
                                            sx={{ m: 0, textAlign: 'left', fontWeight: 'bold' }}
                                        >
                                            {e._id}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                m: 0,
                                                textAlign: 'left',
                                                color: 'blue',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Replying to {e.parentId}
                                        </Typography>
                                    </div>
                                    <Typography align="left" sx={{ mr: '20px' }} paragraph={true}>
                                        {e.content}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Card>
                ))}
            </Stack>
            <Box paddingTop="5%" display="flex" justifyContent="center" alignItems="center">
                <Stack>
                    <Pagination count={commentList.totalPages} />
                </Stack>
            </Box>
        </Box>
    );
};
