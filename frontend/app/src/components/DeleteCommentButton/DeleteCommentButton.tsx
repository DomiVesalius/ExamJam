import React from 'react';
import Button from '@mui/material/Button';
import http from '../../utils/http';
import { redirect } from '../../utils/helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface DeleteCommentButtonProps {
    commentId: string;
}

const DeleteCommentButton: React.FunctionComponent<DeleteCommentButtonProps> = (props) => {
    const handleDelete = async () => {
        try {
            const response = await http.delete(`/comments/${props.commentId}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <IconButton size="small" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteCommentButton;
