import React from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';

const LoginPage: React.FunctionComponent = () => {
    return (
        <PageLayout title="Login">
            <LoginForm />
        </PageLayout>
    );
};

export default LoginPage;
