import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import http from '../../../utils/http';

interface CourseTableProps {
    postId: string;
}
const handleDelete = async (postId: string) => {
    try {
        const response = await http.delete(`/posts/${postId})`);
    } catch (error) {
        return <div>ERROR</div>;
    }
};
export const KebabMenu: React.FunctionComponent<CourseTableProps> = ({ postId }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <IconButton aria-label="delete" onClick={() => handleDelete(postId)}>
                    <DeleteIcon /> Delete
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon /> Share
                </IconButton>
            </Menu>
        </div>
    );
};
