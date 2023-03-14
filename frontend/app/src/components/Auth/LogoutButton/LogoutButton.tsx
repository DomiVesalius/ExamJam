import React from 'react';
import { Button } from '@mui/material';
import { useMainContext } from '../../../contexts/Main/MainContext';
import HTTP from '../../../utils/http';

const LogoutButton: React.FunctionComponent = () => {
    const { setIsAuthenticated, setCurrUser } = useMainContext();

    const handleLogout = () => {
        HTTP.delete('/users/logout')
            .then((res) => {
                setCurrUser('');
                setIsAuthenticated(false);
            })
            .catch((err) => console.log('Failed to logout'));
    };

    return (
        <Button color="error" variant="contained" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
