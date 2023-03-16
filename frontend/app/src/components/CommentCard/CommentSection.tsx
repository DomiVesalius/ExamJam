import { Avatar, Box, Card, Divider, Grid, Pagination, Stack, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React, { useEffect, useState } from 'react';
import { fetcher } from '../../utils/helpers';
import useSWR from 'swr';

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

interface ChildComment {
    _id: string;
    author: string;
    postId: string;
    parentId: string;
    content: string;
    children: unknown[];
}

interface Comment {
    _id: string;
    author: string;
    postId: string;
    parentId: string | null;
    content: string;
    children: ChildComment[];
}

interface CommentSectionProps {
    postId: string;
    queryLimit: number;
    queryPage: number;
}

function createComments(data: any): [React.ReactElement[], number] {
    const comments: React.ReactElement[] = [];
    const commentsData: Comment[] = data.data;

    for (let comment of commentsData) {
        comments.push(
            <Card sx={{ p: '40px 20px', my: '20px', width: '40vw' }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" src={imgLink} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <Grid>
                            <Typography
                                variant={'h6'}
                                sx={{ m: 0, textAlign: 'left', fontWeight: 'bold' }}
                            >
                                {comment.author}
                            </Typography>
                        </Grid>
                        <Typography align="left" paragraph={true} variant="h6">
                            {comment.content}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack>
                            <ThumbUpIcon></ThumbUpIcon>
                            <ThumbDownIcon></ThumbDownIcon>
                        </Stack>
                    </Grid>
                </Grid>
                {comment.children.map((child: ChildComment) => (
                    <Grid
                        container
                        wrap="nowrap"
                        spacing={2}
                        sx={{ m: 3, bgcolor: '#ededed', borderRadius: '8px' }}
                    >
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={imgLink} />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <div>
                                <Typography
                                    variant={'h6'}
                                    sx={{ m: 0, textAlign: 'left', fontWeight: 'bold' }}
                                >
                                    {child.author}
                                </Typography>
                                <Typography
                                    sx={{
                                        m: 0,
                                        textAlign: 'left',
                                        color: 'blue',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Replying to {comment.author}
                                </Typography>
                            </div>
                            <Typography
                                align="left"
                                sx={{ mr: '20px' }}
                                paragraph={true}
                                variant="h6"
                            >
                                {child.content}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Card>
        );
    }

    return [comments, data.totalPages];
}

// let comments = commentList.data;

const CommentSection: React.FunctionComponent<CommentSectionProps> = (
    props: CommentSectionProps
) => {
    const [commentsList, setCommentsList] = useState<React.ReactElement[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(props.queryPage);

    const url = `/comments/posts/${props.postId}?page=${page}&limit=${props.queryLimit}`;
    const { data, error } = useSWR(url, fetcher);

    useEffect(() => {
        if (data) {
            const [comments, totalPages] = createComments(data);
            setCommentsList(comments);
            setTotalPages(totalPages);
        }

        if (error) console.log(error);
    }, [data, error]);

    if (error) {
        return <div>ERROR</div>;
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Box>
            <Stack>{commentsList.map((comment: React.ReactElement) => comment)}</Stack>
            <Box paddingTop="5%" display="flex" justifyContent="center" alignItems="center">
                <Stack>
                    <Pagination count={totalPages} onChange={handleChangePage} />
                </Stack>
            </Box>
        </Box>
    );
};

export default CommentSection;
