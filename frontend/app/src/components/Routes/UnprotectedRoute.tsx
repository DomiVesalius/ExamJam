import React, { useEffect } from 'react';
import { useMainContext } from '../../contexts/Main/MainContext';
import { useNavigate } from 'react-router-dom';

interface UnprotectedRouteProps {
    children?: React.ReactNode;
}

/**
 * This component is meant to be a wrapper for pages that are accessible by unauthenticated users
 * For example: If a user is logged in and attempts to access the registration or login page, they will be redirected
 * to the main dashboard.
 * @param props children are passed by nesting them within this component
 * @constructor
 */
const UnprotectedRoute: React.FunctionComponent<UnprotectedRouteProps> = (props) => {
    const { isAuthenticated } = useMainContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

    return <div>{props.children}</div>;
};

export default UnprotectedRoute;
