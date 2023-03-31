import { Grid, Paper } from '@mui/material';
import React from 'react';

export interface FeedbackProps {
    _id: string;
    postId: string;
    parentId: string;
    content: string;
    width?: string;
}

const Feedback: React.FunctionComponent<FeedbackProps> = (props) => {
    return (
        <Paper key={props._id} elevation={3} sx={{ padding: 1, width: props.width || '95%' }}>
            <Grid container spacing={2}>
                <Grid item>
                    <img
                        style={{ width: 40, height: 40 }}
                        src="https://piazza.com/images/dashboard/common/anon_icons/anon_icon-09.jpg"
                        alt="Anonymous image"
                    />
                </Grid>
                <Grid item xs={11}>
                    <strong style={{ padding: 0 }}>Anon</strong>
                    <div dangerouslySetInnerHTML={{ __html: props.content }} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Feedback;
