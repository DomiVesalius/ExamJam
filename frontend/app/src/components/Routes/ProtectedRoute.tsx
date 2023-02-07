import React, { useEffect } from 'react';
import { useMainContext } from '../../contexts/Main/MainContext';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children?: React.ReactNode;
}

/**
 * This component is meant to be a wrapper for pages that are protected/require a user to be authenticated/logged-in
 * For example: If a user is not logged in and attempts to access the dashboard, they will be redirected to the login
 * page.
 * @param props children are passed by nesting them within this component
 * @constructor
 */
const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = (props) => {
    const { isAuthenticated } = useMainContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
    }, [isAuthenticated, navigate]);

    return <>{props.children}</>;
};

export default ProtectedRoute;
