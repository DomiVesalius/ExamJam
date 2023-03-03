import React from 'react';
import './Profile.css';
import { Avatar, Button, Container, Stack} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChangePasswordForm from '../../components/ProfileForms/PasswordForm';
import ChangeUsernameForm from '../../components/ProfileForms/UsernameForm';
import DeleteUserButton from '../../components/ProfileForms/DeleteUserButton';
import ProtectedRoute from '../../components/Routes/ProtectedRoute';
import ChangeBioForm from '../../components/ProfileForms/BioForm';
import PageLayout from '../../components/Layout/PageLayout';

const ProfilePage = () => {
    return (
        <ProtectedRoute>
            <PageLayout title="My Profile">
                <Container maxWidth={'md'}>
                    <Stack spacing={2} alignItems={'center'}>
                        <Stack direction={'row'} spacing={20} alignItems={'center'}>
                            <Stack spacing={2} alignItems={'center'}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={'/frontend/app/public/logo192.png'}
                                    sx={{ width: 100, height: 100 }}
                                />
                                <Button
                                    variant="outlined"
                                    startIcon={<EditIcon />}
                                    size={'small'}
                                    onClick={() => {
                                        alert('ProfilePage picture changed.');
                                    }}
                                >
                                    Change picture
                                </Button>
                                <ChangeUsernameForm />
                            </Stack>
                        </Stack>
                        <ChangeBioForm />
                        <ChangePasswordForm />
                        <DeleteUserButton />
                    </Stack>
                </Container>
            </PageLayout>
        </ProtectedRoute>
    );
};

export default ProfilePage;
