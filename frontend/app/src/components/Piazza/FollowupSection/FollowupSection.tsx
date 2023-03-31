import React from 'react';
import followup, { FollowupProps } from '../Followup/Followup';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import Followup from '../Followup/Followup';

export interface FollowupSectionProps {
    followups: FollowupProps[];
}

const FollowupSection: React.FunctionComponent<FollowupSectionProps> = (props) => {
    return (
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <Typography variant="h6">
                    <strong>followup discussions,</strong>{' '}
                    <i style={{ fontSize: 'small' }}>for lingering questions and comments</i>
                </Typography>
            </CardContent>
            <Divider />
            <CardContent>
                <Stack spacing={3}>
                    {props.followups.map((followup) => (
                        <Followup
                            _id={followup._id}
                            postId={followup.postId}
                            content={followup.content}
                            commentChildren={followup.commentChildren}
                        />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default FollowupSection;
