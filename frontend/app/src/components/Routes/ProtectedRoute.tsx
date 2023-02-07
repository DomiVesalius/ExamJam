import React, { useEffect } from 'react';
import { useMainContext } from '../../contexts/Main/MainContext';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children?: React.ReactNode[];
}

const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = (props) => {
    const { isAuthenticated } = useMainContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
    }, [isAuthenticated, navigate]);

    return <div>{props.children}</div>;
};

export default ProtectedRoute;
