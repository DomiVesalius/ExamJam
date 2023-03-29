import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import NameAvatar from '../NameAvatar/NameAvatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { fetcher, redirect } from '../../utils/helpers';
import PathConstants from '../../utils/pathConstants';
import useSWR from 'swr';

const ProfileCard: React.FunctionComponent = () => {
    const [user, setUser] = useState({ username: '', email: '', bio: '' });
    const url: string = `/users/me`;
    const { data, error } = useSWR(url, fetcher);

    useEffect(() => {
        console.log(data);
        if (data) {
            setUser({
                email: data.email,
                username: data.username,
                bio: data.bio
            });
        }

        if (error) console.log(error);
    }, [data, error]);

    if (error) return <Typography variant="subtitle1">An error occurred</Typography>;

    return (
        <Card sx={{ minWidth: '300px', width: '20vw', maxWidth: '25vw', borderRadius: '10px' }}>
            <CardHeader
                avatar={<NameAvatar name={user.email} />}
                title={user.username}
                subheader={user.email}
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
            {user.bio && (
                <CardContent>
                    <Typography variant="body2">{user.bio}</Typography>
                </CardContent>
            )}
        </Card>
    );
};

export default ProfileCard;
