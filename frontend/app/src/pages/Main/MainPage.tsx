import React from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import UnprotectedRoute from '../../components/Routes/UnprotectedRoute';

export const MainPage: React.FunctionComponent = () => {
    return (
        <UnprotectedRoute>
            <PageLayout title="ExamPage">
                <h1>Main Page</h1>
            </PageLayout>
        </UnprotectedRoute>
    );
};
