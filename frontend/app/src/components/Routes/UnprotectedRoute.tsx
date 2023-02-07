import React, { useEffect } from 'react';
import { useMainContext } from '../../contexts/Main/MainContext';
import { useNavigate } from 'react-router-dom';

interface UnprotectedRouteProps {
    children?: React.ReactNode;
}

const UnprotectedRoute: React.FunctionComponent<UnprotectedRouteProps> = (props) => {
    const { isAuthenticated } = useMainContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

    return <div>{props.children}</div>;
};

export default UnprotectedRoute;
