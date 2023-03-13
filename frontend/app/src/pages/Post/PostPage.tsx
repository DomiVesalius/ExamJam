import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CssBaseline, Stack } from '@mui/material';
import useSWR from 'swr';
import http from '../../utils/http';
import PageLayout from '../../components/Layout/PageLayout';
import Post from '../../components/Post/Post';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import PostDetail from '../../components/Post/PostDetail/PostDetail';

const fetcher = (url: string) => http.get(url).then((res) => res.data);

const PostPage: React.FunctionComponent = () => {
    return (
        <ProtectedRoute>
            <PageLayout title="PostPage">
                <Stack direction="row" spacing={2}>
                    {/*HAVE A POST PREVIEW HERE*/}
                    <Post />
                    <PostDetail />
                    {/*HAVE A POST DETAILS HERE*/}
                </Stack>
            </PageLayout>
        </ProtectedRoute>
    );
};

export default PostPage;
