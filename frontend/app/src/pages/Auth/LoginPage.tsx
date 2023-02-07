import React, { useEffect } from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import UnprotectedRoute from '../../components/Routes/UnprotectedRoute';

const LoginPage: React.FunctionComponent = () => {
    return (
        <UnprotectedRoute>
            <PageLayout title="Login">
                <LoginForm />
            </PageLayout>
        </UnprotectedRoute>
    );
};

export default LoginPage;
