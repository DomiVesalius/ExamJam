import { Box, Card, Grid, Pagination, Stack, Typography, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetcher } from '../../utils/helpers';
import useSWR from 'swr';
import NameAvatar from '../NameAvatar/NameAvatar';
import CommentForm from '../CommentForm/CommentForm';
import { useMainContext } from '../../contexts/Main/MainContext';
import ReplyButton from '../ReplyButton/ReplyButton';
import DeleteCommentButton from '../DeleteCommentButton/DeleteCommentButton';
import { VoteButtons } from '../VotingButtons/VotingButtons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

interface ChildComment {
    _id: string;
    author: string;
    postId: string;
    parentId: string;
    content: string;
    children: unknown[];
    isDownvoted: boolean;
    isUpvoted: boolean;
}

interface Comment {
    _id: string;
    author: string;
    postId: string;
    parentId: string | null;
    content: string;
    isDownvoted: boolean;
    isUpvoted: boolean;
    children: ChildComment[];
}

interface CommentSectionProps {
    postId: string;
    queryLimit: number;
    queryPage: number;
}

const commentPreview = (comment: string, currTheme: string): React.ReactElement => {
    return (
        <ReactMarkdown
            children={comment}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            // @ts-ignore
                            style={currTheme === 'dark' ? darcula : materialLight}
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
            rehypePlugins={[rehypeRaw]}
        />
    );
};

function createComments(data: any, currUser: string): [React.ReactElement[], number] {
    const comments: React.ReactElement[] = [];
    const commentsData: Comment[] = data.data;

    const currTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';

    for (let comment of commentsData) {
        comments.push(
            <Card key={comment._id} sx={{ px: '20px', my: '20px', width: '40vw' }}>
                <CardContent>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <NameAvatar name={comment.author} />
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
                            {commentPreview(comment.content, currTheme)}
                        </Grid>
                        <Grid item>
                            <Box display="flex" flexWrap="wrap" alignItems="center">
                                <VoteButtons
                                    itemId={comment._id}
                                    isUpvoted={comment.isUpvoted}
                                    isDownvoted={comment.isDownvoted}
                                    itemType="comment"
                                />
                                {currUser === comment.author && (
                                    <DeleteCommentButton commentId={comment._id} />
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                    {comment.children.map((child: ChildComment) => (
                        <Grid
                            key={child._id}
                            container
                            wrap="nowrap"
                            spacing={2}
                            sx={{ m: 2, borderRadius: '8px' }}
                        >
                            <Grid item>
                                <NameAvatar name={child.author} />
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
                                        color="secondary"
                                        sx={{
                                            m: 0,
                                            textAlign: 'left',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Replying to {comment.author}
                                    </Typography>
                                </div>

                                {commentPreview(child.content, currTheme)}
                            </Grid>
                            <Grid item>
                                <Box display="flex" flexWrap="wrap" alignItems="center">
                                    {currUser === child.author && (
                                        <DeleteCommentButton commentId={child._id} />
                                    )}
                                    <VoteButtons
                                        itemId={child._id}
                                        isUpvoted={child.isUpvoted}
                                        isDownvoted={child.isDownvoted}
                                        itemType="comment"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    ))}
                </CardContent>

                <ReplyButton postId={comment.postId} parentId={comment._id} />
            </Card>
        );
    }

    return [comments, data.totalPages];
}

const CommentSection: React.FunctionComponent<CommentSectionProps> = (
    props: CommentSectionProps
) => {
    const { currUser } = useMainContext();

    const [commentsList, setCommentsList] = useState<React.ReactElement[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(props.queryPage);

    const url = `/comments/posts/${props.postId}?page=${page}&limit=${props.queryLimit}`;
    const { data, error } = useSWR(url, fetcher);

    useEffect(() => {
        console.log(currUser);
    }, [currUser]);

    useEffect(() => {
        if (data) {
            const [comments, totalPages] = createComments(data, currUser);
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
            <CommentForm postId={props.postId} parentId={null} author={currUser} />
            <Stack>{commentsList.map((comment: React.ReactElement) => comment)}</Stack>
            <Box paddingTop="5%" display="flex" justifyContent="center" alignItems="center">
                <Stack>
                    {commentsList.length !== 0 && (
                        <Pagination count={totalPages} onChange={handleChangePage} />
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default CommentSection;
