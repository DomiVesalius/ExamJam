import HTTP from '../../utils/http';
import React, { useState } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { IconButton } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ButtonGroup from '@mui/material/ButtonGroup';

interface VoteButtonProps {
    itemId: string;
    isUpvoted: boolean;
    isDownvoted: boolean;
    upvotes: number;
    downvotes: number;
    itemType: 'post' | 'comment';
}

export const VoteButtons: React.FunctionComponent<VoteButtonProps> = (props) => {
    const [isUpvoted, setIsUpvoted] = useState(props.isUpvoted);
    const [isDownvoted, setIsDownvoted] = useState(props.isDownvoted);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [downvotes, setDownvotes] = useState(props.downvotes);

    const handle = async (type: 'up' | 'down') => {
        let url;
        if (props.itemType === 'post') {
            url = `/posts/${props.itemId}/vote?type=${type}`;
        } else {
            url = `/comments/${props.itemId}/vote?type=${type}`;
        }

        try {
            const result = await HTTP.post(url);
            if (type === 'up') {
                const upvoted = result.data.data.isUpvoted;
                if (isUpvoted && type === 'up') {
                    setIsUpvoted(false);
                    setIsDownvoted(false);
                } else {
                    setIsUpvoted(upvoted);
                    setIsDownvoted(!upvoted);
                }
            } else {
                const downvoted = result.data.data.isDownvoted;
                if (isDownvoted && type === 'down') {
                    setIsUpvoted(false);
                    setIsDownvoted(false);
                } else {
                    setIsUpvoted(!downvoted);
                    setIsDownvoted(downvoted);
                }
            }
            console.log(result.data.data);
            setDownvotes(result.data.data.downvotes);
            setUpvotes(result.data.data.upvotes);
        } catch (e) {
            console.log(e);
        }
    };

    const upvoteIcon = isUpvoted ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />;

    const downvoteIcon = isDownvoted ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />;

    return (
        <div>
            <IconButton onClick={() => handle('up')}>{upvoteIcon}</IconButton>
            {upvotes - downvotes}
            <IconButton onClick={() => handle('down')}>{downvoteIcon}</IconButton>
        </div>
    );
};
