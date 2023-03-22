import {
    Avatar,
    Box,
    Card,
    Divider,
    Grid,
    Pagination,
    Stack,
    Typography,
    CardContent,
    CardActionArea
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React, { useEffect, useState } from 'react';
import { fetcher } from '../../utils/helpers';
import useSWR from 'swr';
import NameAvatar from '../NameAvatar/NameAvatar';
import CommentForm from '../CommentForm/CommentForm';
import { useMainContext } from '../../contexts/Main/MainContext';
import ReplyButton from '../ReplyButton/ReplyButton';
import IconButton from '@mui/material/IconButton';
import { KebabMenu } from '../Post/KebabMenu/KebabMenu';
import DeleteCommentButton from '../DeleteCommentButton/DeleteCommentButton';

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

function createComments(data: any, currUser: string): [React.ReactElement[], number] {
    const comments: React.ReactElement[] = [];
    const commentsData: Comment[] = data.data;

    for (let comment of commentsData) {
        comments.push(
            <Card sx={{ px: '20px', my: '20px', width: '40vw' }}>
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
                            {/*<div dangerouslySetInnerHTML={{ __html: comment.content }} />*/}
                            <Typography
                                align="left"
                                paragraph={true}
                                variant="h6"
                                dangerouslySetInnerHTML={{ __html: comment.content }}
                            >
                                {/*{comment.content}*/}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box display="flex" flexWrap="wrap" alignItems="center">
                                <IconButton aria-label="upvote">
                                    <ThumbUpIcon />
                                </IconButton>
                                <IconButton aria-label="downvote">
                                    <ThumbDownIcon />
                                </IconButton>
                                {currUser === comment.author && (
                                    <DeleteCommentButton commentId={comment._id} />
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                    {comment.children.map((child: ChildComment) => (
                        <Grid
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

                                <Typography
                                    align="left"
                                    sx={{ mr: '20px' }}
                                    paragraph={true}
                                    variant="h6"
                                    dangerouslySetInnerHTML={{ __html: child.content }}
                                ></Typography>
                            </Grid>
                            <Grid item>
                                <Box display="flex" flexWrap="wrap" alignItems="center">
                                    <IconButton aria-label="upvote">
                                        <ThumbUpIcon />
                                    </IconButton>
                                    <IconButton aria-label="downvote">
                                        <ThumbDownIcon />
                                    </IconButton>
                                    {currUser === child.author && (
                                        <DeleteCommentButton commentId={child._id} />
                                    )}
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
