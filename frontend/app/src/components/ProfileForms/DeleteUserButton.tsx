import { Alert, AlertTitle, Button, Stack } from '@mui/material';
import ChangePasswordForm from './PasswordForm';
import React, { useEffect, useState } from 'react';
import { useMainContext } from '../../contexts/Main/MainContext';
import HTTP from '../../utils/http';

const DeleteUserButton = () => {
    const { isAuthenticated, setIsAuthenticated } = useMainContext();
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleAccountDeletion = async () => {
        try {
            await HTTP.delete('/users');
            setIsAuthenticated(false);
        } catch (e) {
            setShowErrorAlert(true);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setShowErrorAlert(false);
        }, 5000);
    }, [showErrorAlert]);

    return (
        <div>
            <Button onClick={handleAccountDeletion} variant="contained" color="error">
                Delete Account
            </Button>

            {showErrorAlert && (
                <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
                    <AlertTitle>Server Error</AlertTitle>
                    Failed to delete account
                </Alert>
            )}
        </div>
    );
};

export default DeleteUserButton;
