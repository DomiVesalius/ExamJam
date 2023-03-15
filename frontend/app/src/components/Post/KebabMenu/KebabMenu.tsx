import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import http from '../../../utils/http';
import { redirect, fetcher } from '../../../utils/helpers';
import useSWR from 'swr';
import BookmarkButton from '../../BookmarkButton/BookmarkButton';
import { BookmarkType } from '../../../utils/helpers';

interface CourseTableProps {
    postId: string;
    courseCode: string;
    author: string;
}

const handleDelete = async (postId: string, courseCode: string) => {
    try {
        const response = await http.delete(`/posts/${postId}`);
        redirect(`/dashboard/courses/${courseCode}`);
    } catch (error) {
        console.log(error);
    }
};

export const KebabMenu: React.FunctionComponent<CourseTableProps> = ({
    postId,
    courseCode,
    author
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [usr, setusr] = useState({
        email: ''
    });

    const url: string = `/users/me`;
    const { data, error } = useSWR(url, fetcher);

    useEffect(() => {
        console.log(data);
        if (data) {
            setusr({
                email: data.email
            });
        }
    }, [data]);

    if (error) return <div>failed to load</div>;
    if (!usr.email) return <div>loading...</div>;

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: 'black' }}
            >
                ...
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {usr.email === author && (
                    <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={() => handleDelete(postId, courseCode)}
                    >
                        <DeleteIcon />
                    </IconButton>

                )}
                <BookmarkButton type={BookmarkType.post} itemId={postId}/>

                <IconButton size="small" aria-label="share">
                    <ShareIcon />
                </IconButton>
            </Menu>
        </div>
    );
};
