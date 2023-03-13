import React from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import Post from '../../components/Post/Post';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import PostDetail from '../../components/Post/PostDetail/PostDetail';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@mui/material';

import { Paper } from '@mui/material';
const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: '100%',
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: '100%',
        margin: '0 auto',
        width: '100%'
    }
}));

const PostPage: React.FunctionComponent = () => {
    const classes = useStyles();

    return (
        <ProtectedRoute>
            <PageLayout title="PostPage">
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={classes.paper}>
                        <Post />
                    </Paper>
                </Container>
            </PageLayout>
        </ProtectedRoute>
    );
};

export default PostPage;
