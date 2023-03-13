import React from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import PostCreationForm from '../../components/Post/PostCreationForm/PostCreationForm';
import { useNavigate, useParams } from 'react-router-dom';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import http from '../../utils/http';
import useSWR from 'swr';

const PostCreationPage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const routeParams = useParams();
    const courseCode = routeParams['courseCode'];

    return (
        <ProtectedRoute>
            <PageLayout title="CreatePost">
                <PostCreationForm
                    onSuccess={(postId: string) =>
                        navigate(`/dashboard/courses/${courseCode}/${postId}`)
                    }
                />
            </PageLayout>
        </ProtectedRoute>
    );
};

export default PostCreationPage;
