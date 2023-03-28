import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import http from '../../utils/http';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { KebabMenu } from './KebabMenu/KebabMenu';
import CommentSection from '../CommentList/CommentSection';

import {VoteButtons} from '../VotingButtons/PostVotingButtons';

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
        updatedAt: '',
        isBookmarked: false,
        isUpvoted: false,
        isDownvoted: false,
    });

    const url: string = `/posts/${postId}`;
    const { data, error } = useSWR(url, fetcher);

    useEffect(() => {
        if (data) {
            console.log('logging data', data.data);
            console.log('logging downvoted', data.data.isDownvoted);
            console.log('logging upvoted', data.data.isUpvoted);
            setPost({
                postId: data.data._id,
                author: data.data.author,
                title: data.data.title,
                content: data.data.content,
                examId: data.data.examId,
                createdAt: data.data.createdAt,
                updatedAt: data.data.updatedAt,
                isBookmarked: data.data.isBookmarked,
                isUpvoted: data.data.isUpvoted,
                isDownvoted: data.data.isDownvoted,
            });
        }
    }, [data, error]);

    if (error || !courseCode) {
        return <div>ERROR</div>;
    }

    const updateDate = new Date(post.updatedAt);
    const formattedUpdateDate = updateDate.toLocaleString('en-US');
    const creationDate = new Date(post.createdAt);
    const formattedCreationDate = creationDate.toLocaleString('en-US');

    return (
        <Container key={post.postId}>
            <Card variant="outlined">
                <Stack spacing={2}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Stack spacing={2}>
                                <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Posted by <b>{post.author}</b> on {formattedCreationDate}
                                    </Typography>

                                    <Box display="flex" flexWrap="wrap" alignItems="center">
                                        <VoteButtons postId={post.postId} isUpvoted={post.isUpvoted} isDownvoted={post.isDownvoted}/>
                                        {/* <UpvoteButton postId={post.postId} isUpvoted={post.isUpvoted}/>
                                        <DownvoteButton postId={post.postId} isDownvoted={post.isDownvoted}/> */}
                                        <KebabMenu
                                            postId={post.postId}
                                            courseCode={courseCode}
                                            author={post.author}
                                            isBookmarked={post.isBookmarked}
                                        />
                                    </Box>
                                </Box>
                                <Typography variant="h4" component="h1" gutterBottom>
                                    {post.title}
                                </Typography>

                                <Typography variant="body1" component="div" gutterBottom>
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    Last updated at {formattedUpdateDate}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Stack>
            </Card>
            <Container sx={{ mt: '20px' }}>
                <CommentSection postId={postId || ''} queryLimit={10} queryPage={1} />
            </Container>
        </Container>
    );
};

export default Post;
