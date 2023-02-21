import React from 'react';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import PageLayout from '../../components/Layout/PageLayout';

const Dashboard: React.FunctionComponent = () => {
    return (
        <ProtectedRoute>
            <PageLayout title="Dashboard"></PageLayout>
        </ProtectedRoute>
    );
};

export default Dashboard;
