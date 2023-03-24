import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import NameAvatar from '../NameAvatar/NameAvatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { redirect } from '../../utils/helpers';
import PathConstants from '../../utils/pathConstants';

interface ProfileCardProps {
    username: string;
    email: string;
    bio: string;
}

const ProfileCard: React.FunctionComponent<ProfileCardProps> = (props: ProfileCardProps) => {
    return (
        <Card sx={{ minWidth: '300px', width: '20vw', maxWidth: '25vw', borderRadius: '10px' }}>
            <CardHeader
                avatar={<NameAvatar name={props.email} />}
                title={props.username}
                subheader={props.email}
                titleTypographyProps={{ fontSize: 'large' }}
                action={
                    <IconButton
                        size="small"
                        onClick={() => redirect(PathConstants.profileEditPage)}
                    >
                        <EditIcon />
                    </IconButton>
                }
            />
            {props.bio && (
                <CardContent>
                    <Typography variant="body2">{props.bio}</Typography>
                </CardContent>
            )}
        </Card>
    );
};

export default ProfileCard;
