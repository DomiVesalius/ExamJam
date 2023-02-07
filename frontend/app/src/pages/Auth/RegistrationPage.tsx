import React from 'react';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';
import PageLayout from '../../components/Layout/PageLayout';
import { useNavigate } from 'react-router-dom';
const RegistrationPage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    return (
        <PageLayout title="Register">
            <RegisterForm onSubmitCallback={() => navigate('/login')} />
        </PageLayout>
    );
};

export default RegistrationPage;
