import React, { useEffect } from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import { useMainContext } from '../../contexts/Main/MainContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FunctionComponent = () => {
    const { isAuthenticated } = useMainContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <PageLayout title="Login">
            <LoginForm />
        </PageLayout>
    );
};

export default LoginPage;
