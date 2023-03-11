import React, {useEffect, useState} from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import PostCreationForm from "../../components/Post/PostCreationForm/PostCreationForm";
import {useNavigate, useParams} from 'react-router-dom';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import http from "../../utils/http";
import useSWR from "swr";

const PostCreationPage: React.FunctionComponent = () => {
    const navigate = useNavigate();

    return (
        // <ProtectedRoute>
        // Change the success URL to Post View
            <PageLayout title="CreatePost">
                <PostCreationForm onSuccess={() => navigate('/')}/>
            </PageLayout>
        // </ProtectedRoute>
    );
};

export default PostCreationPage;
