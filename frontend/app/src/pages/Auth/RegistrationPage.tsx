import React from 'react';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';
import PageLayout from '../../components/Layout/PageLayout';
const RegistrationPage: React.FunctionComponent = () => {
    return (
        <PageLayout title="Register">
            <RegisterForm />
        </PageLayout>
    );
};

export default RegistrationPage;
