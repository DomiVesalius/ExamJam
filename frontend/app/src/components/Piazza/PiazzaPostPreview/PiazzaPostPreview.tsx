import React from 'react';
import { Button, Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

export interface PiazzaPostPreviewProps {
    postId: string;
    forumId: string;
    postNumber: number;
    courseCode: string;
    title: string;
    content: string;
    createdAt: Date;
    numComments: number;
    previewTextMaxLength: number;
}

// TODO: Resource https://stackoverflow.com/questions/23616226/insert-html-with-react-variable-statements-jsx
// <div dangerouslySetInnerHTML={{ __html: previewText }}></div>

const PiazzaPostPreview: React.FunctionComponent<PiazzaPostPreviewProps> = (
    props: PiazzaPostPreviewProps
) => {
    const redirect = (url: string) => {
        window.location.href = url;
    };

    const parsedHTML = new DOMParser().parseFromString(props.content, 'text/html');
    const textContent = parsedHTML.body.textContent || '';
    const previewText = textContent.substring(
        0,
        Math.min(textContent.length, props.previewTextMaxLength)
    ); // 200 could me modified to be any arbitrary number

    const handleNavigateToPost = () =>
        redirect(`forums/${props.forumId}/posts/${props.postNumber}`);

    return (
        <Card sx={{ width: '50vw' }}>
            <CardActionArea onClick={handleNavigateToPost}>
                <CardContent>
                    <Typography color="text.secondary">
                        Sourced from forum {props.forumId}. Post # {props.postNumber}
                    </Typography>
                    <CardHeader
                        title={`${props.title}`}
                        subheader={props.createdAt.toDateString()}
                        sx={{ fontWeight: 'bold' }}
                    />
                    <Typography variant="body1">{previewText}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ display: 'flex', justifyContent: 'right' }}>
                <Button size="small" color="primary" onClick={handleNavigateToPost}>
                    {props.numComments} Comments
                </Button>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActionArea>
        </Card>
    );
};

export default PiazzaPostPreview;
