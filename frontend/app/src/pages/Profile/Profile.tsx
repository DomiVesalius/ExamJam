import React from 'react';
import './Profile.css';
import { Avatar, Button, Container, Stack, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChangePasswordForm from '../../components/ProfileForms/PasswordForm';
import ChangeUsernameForm from '../../components/ProfileForms/UsernameForm';

const Profile = () => {
    return (
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
                                alert('Profile picture changed.');
                            }}
                        >
                            Change picture
                        </Button>
                        <ChangeUsernameForm />
                    </Stack>
                </Stack>
                <TextField
                    id="outlined-multiline-static"
                    label="Bio"
                    multiline
                    rows={4}
                    defaultValue="Enter a bio that describes you!"
                    sx={{ m: 1 }}
                    fullWidth
                />
                <Stack direction="row" spacing={2} alignItems={'center'}>
                    <h3>Change Password:</h3>
                    <ChangePasswordForm />
                </Stack>
                <Button variant="contained" color="error">
                    Delete Account
                </Button>
            </Stack>
        </Container>
    );
};

export default Profile;
