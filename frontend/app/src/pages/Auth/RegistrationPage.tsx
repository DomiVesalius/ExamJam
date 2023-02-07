import React from 'react';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';
import PageLayout from '../../components/Layout/PageLayout';
import { useNavigate } from 'react-router-dom';
import UnprotectedRoute from '../../components/Routes/UnprotectedRoute';

const RegistrationPage: React.FunctionComponent = () => {
    const navigate = useNavigate();

    return (
        <UnprotectedRoute>
            <PageLayout title="Register">
                <RegisterForm onSuccess={() => navigate('/login')} />
            </PageLayout>
        </UnprotectedRoute>
    );
};

export default RegistrationPage;
