import React, { useEffect } from 'react';
import { redirect } from '../../../utils/helpers';
import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMainContext } from '../../../contexts/Main/MainContext';
import BookmarkButton from '../../BookmarkButton/BookmarkButton';
import { BookmarkType } from '../../../utils/helpers';
export interface PostPreviewProps {
    postId: string;
    courseCode: string;
    title: string;
    examId: string;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    previewTextMaxLength: number;
    content: string;
    isBookmarked: boolean;
}

const PostPreview: React.FunctionComponent<PostPreviewProps> = (props: PostPreviewProps) => {
    const { currUser } = useMainContext();

    const parsedHTML = new DOMParser().parseFromString(props.content, 'text/html');
    const textContent = parsedHTML.body.textContent || '';
    const previewText = textContent.substring(
        0,
        Math.min(textContent.length, props.previewTextMaxLength)
    ); // 200 could me modified to be any arbitrary number

    const handleNavigateToPost = () => redirect(`${props.courseCode}/posts/${props.postId}/`);
    return (
        <Card sx={{ width: '50vw' }}>
            <CardActionArea onClick={handleNavigateToPost}>
                <CardContent>
                    <Typography color="text.secondary">
                        Posted by <strong>{props.author}</strong> at{' '}
                        {props.createdAt.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}{' '}
                        on {props.createdAt.toLocaleDateString()}
                    </Typography>
                    <Typography color="text.secondary">
                        Updated at{' '}
                        {props.updatedAt.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}{' '}
                        on {props.updatedAt.toLocaleDateString()}
                    </Typography>
                    <CardHeader title={`${props.title}`} />
                    <Typography variant="body1">{previewText}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ display: 'flex', justifyContent: 'right' }}>
                <BookmarkButton type={BookmarkType.post} itemId={props.postId} isBookmarked={props.isBookmarked}/>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                {currUser === props.author && (
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                )}
            </CardActionArea>
        </Card>
    );
};

export default PostPreview;
