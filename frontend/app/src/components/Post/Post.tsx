import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    CssBaseline,
    Stack,
    Typography
} from '@mui/material';
import useSWR from 'swr';
import http from '../../utils/http';

const fetcher = (url: string) => http.get(url).then((res) => res.data);

const Post: React.FunctionComponent = () => {
    let { courseCode, postId } = useParams();

    const [post, setPost] = useState({
        postId: '',
        title: '',
        author: '',
        content: '',
        examId: '',
        createdAt: '',
        updatedAt: ''
    });

    const url: string = `/posts/${postId}`;
    const { data, error } = useSWR(url, fetcher);

    useEffect(() => {
        if (data) {
            setPost({
                postId: data.data._id,
                author: data.data.author,
                title: data.data.title,
                content: data.data.content,
                examId: data.data.examId,
                createdAt: data.data.createdAt,
                updatedAt: data.data.updatedAt
            });
        }
    }, [data]);

    if (error || !courseCode) {
        return <div>ERROR</div>;
    }

    const updateDate = new Date(post.updatedAt);
    const formattedUpdateDate = updateDate.toLocaleString('en-US');
    const creationDate = new Date(post.createdAt);
    const formattedCreationDate = updateDate.toLocaleString('en-US');

    return (
        <Container maxWidth="md">
            <Card variant="outlined">
                <Stack spacing={2}>
                    <CardHeader title="" />
                    <CardContent>
                        <Stack spacing={2}>
                            <Stack spacing={2}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    Posted by <b>{post.author}</b> on {formattedCreationDate}
                                </Typography>
                                <Typography variant="h5" component="h5">
                                    {post.title}
                                </Typography>
                                <div
                                    style={{ width: '100%' }}
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                                <Typography variant="caption" display="block" gutterBottom>
                                    Last updated at {formattedUpdateDate}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Stack>
            </Card>
        </Container>
    );
};

export default Post;
