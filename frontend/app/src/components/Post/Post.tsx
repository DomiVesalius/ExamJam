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
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const fetcher = (url: string) => http.get(url).then((res) => res.data);

const Post: React.FunctionComponent = () => {
    let { courseCode, postId } = useParams();

    const [post, setPost] = useState({
        postId: '',
        title: '',
        author: '',
        content: '',
        formatType: '',
        examId: '',
        createdAt: '',
        updatedAt: '',
        isBookmarked: false
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
                formatType: data.data.formatType,
                examId: data.data.examId,
                createdAt: data.data.createdAt,
                updatedAt: data.data.updatedAt,
                isBookmarked: data.data.isBookmarked
            });
        }
    }, [data]);

    if (error || !courseCode) {
        return <div>ERROR</div>;
    }

    const updateDate = new Date(post.updatedAt);
    const formattedUpdateDate = updateDate.toLocaleString('en-US');
    const creationDate = new Date(post.createdAt);
    const formattedCreationDate = creationDate.toLocaleString('en-US');

    const currTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';

    return (
        <Container>
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
                                        <IconButton aria-label="upvote">
                                            <ThumbUpIcon />
                                        </IconButton>
                                        <IconButton aria-label="downvote">
                                            <ThumbDownIcon />
                                        </IconButton>
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
                                <ReactMarkdown
                                    children={post.content}
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    // @ts-ignore
                                                    style={
                                                        currTheme === 'dark'
                                                            ? darcula
                                                            : materialLight
                                                    }
                                                    language={match[1]}
                                                    PreTag="div"
                                                    children={String(children).replace(/\n$/, '')}
                                                    {...props}
                                                />
                                            ) : (
                                                <code className={className} {...props} />
                                            );
                                        }
                                    }}
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeRaw, rehypeKatex]}
                                />
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
