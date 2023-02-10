import React from 'react';
import HTTP from '../../utils/http';
import LogoutButton from '../../components/Auth/LogoutButton/LogoutButton';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import useSWR from 'swr';

const Dashboard: React.FunctionComponent = () => {
    const getUser = async () => {
        try {
            const res = await HTTP.get('/users/me');
            return res.data.email;
        } catch (e) {
            return 'Failed to get user data';
        }
    };

    const { data, error, isLoading } = useSWR('/api/users/me', getUser);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <ProtectedRoute>
            <LogoutButton />
            {data}
        </ProtectedRoute>
    );
};

export default Dashboard;
