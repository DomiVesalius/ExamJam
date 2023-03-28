import HTTP from '../../utils/http';
import React, {useEffect, useState} from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { IconButton } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ButtonGroup from '@mui/material/ButtonGroup';

interface VoteButtonProps {
    postId: string;
    isUpvoted: boolean;
    isDownvoted: boolean;
}


export const VoteButtons: React.FunctionComponent<VoteButtonProps> = (props) => {
    const [isUpvoted, setIsUpvoted] = useState(props.isUpvoted);
    const [isDownvoted, setIsDownvoted] = useState(props.isDownvoted);

    const handle = async (type: 'up' | 'down') => {
        try {
            const result = await HTTP.post(`/posts/${props.postId}/vote?type=${type}`);
            
            if (type === 'up') {
                const upvoted = result.data.data.isUpvoted
                if (isUpvoted && type == 'up') {
                    setIsUpvoted(false)
                    setIsDownvoted(false)
                } else {
                    setIsUpvoted(upvoted);
                    setIsDownvoted(!upvoted);
                }
            } else {
                const downvoted = result.data.data.isDownvoted
                if (isDownvoted && type === 'down'){
                    setIsUpvoted(false);
                    setIsDownvoted(false);
                }
                else{
                    setIsUpvoted(!downvoted);
                    setIsDownvoted(downvoted);
                }
                
            }
            
        } catch (e) {
            console.log(e);
        }
    }

    const upvoteIcon = isUpvoted ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon/>;
    
    const downvoteIcon = isDownvoted ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon/>
    
    return (
            <ButtonGroup>
                <IconButton onClick={() => handle('up')}>{upvoteIcon}</IconButton>
                <IconButton onClick={() => handle('down')}>{downvoteIcon}</IconButton>
            </ButtonGroup>
        )

}
