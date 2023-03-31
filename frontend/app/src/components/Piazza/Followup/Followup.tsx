import { Grid, Paper } from '@mui/material';
import React from 'react';
import Feedback, { FeedbackProps } from '../Feedback/Feedback';

export interface FollowupProps {
    _id: string;
    postId: string;
    content: string;
    commentChildren: FeedbackProps[];
    width?: string;
}

const Followup: React.FunctionComponent<FollowupProps> = (props) => {
    return (
        <Paper key={props._id} elevation={2} sx={{ padding: 1, width: props.width || '80%' }}>
            <Grid container spacing={2}>
                <Grid item>
                    <img
                        style={{ width: 40, height: 40 }}
                        src="https://piazza.com/images/dashboard/common/anon_icons/anon_icon-09.jpg"
                        alt="Anonymous image"
                    />
                </Grid>
                <Grid item xs={10}>
                    <strong>Anon</strong>
                    <div dangerouslySetInnerHTML={{ __html: props.content }} />
                </Grid>
                {props.commentChildren.map((child) => (
                    <Grid item marginLeft={5} xs={12}>
                        <Feedback
                            _id={child._id}
                            postId={child.postId}
                            parentId={props._id}
                            content={child.content}
                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default Followup;
