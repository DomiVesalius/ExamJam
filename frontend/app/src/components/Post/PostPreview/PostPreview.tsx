import React from 'react';
import { redirect } from '../../../utils/helpers';
import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import { useMainContext } from '../../../contexts/Main/MainContext';
import { VoteButtons } from '../../VotingButtons/VotingButtons';
import { KebabMenu } from '../KebabMenu/KebabMenu';

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
    isUpvoted: boolean;
    isDownvoted: boolean;
    upvotes: number;
    downvotes: number;
    cardWidth?: string;
}

const PostPreview: React.FunctionComponent<PostPreviewProps> = (props: PostPreviewProps) => {
    const { currUser } = useMainContext();

    const parsedHTML = new DOMParser().parseFromString(props.content, 'text/html');
    const textContent = parsedHTML.body.textContent || '';
    const previewText = textContent.substring(
        0,
        Math.min(textContent.length, props.previewTextMaxLength)
    ); // 200 could me modified to be any arbitrary number

    const handleNavigateToPost = () =>
        redirect(`/dashboard/courses/${props.courseCode}/posts/${props.postId}/`);
    return (
        <Card sx={{ width: props.cardWidth || '50vw' }}>
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
                <VoteButtons
                    itemId={props.postId}
                    isUpvoted={props.isUpvoted}
                    isDownvoted={props.isDownvoted}
                    upvotes={props.upvotes}
                    downvotes={props.downvotes}
                    itemType="post"
                />
                {currUser === props.author && (
                    <KebabMenu
                        postId={props.postId}
                        courseCode={props.courseCode}
                        author={props.author}
                        isBookmarked={props.isBookmarked}
                    />
                )}
            </CardActionArea>
        </Card>
    );
};

export default PostPreview;
