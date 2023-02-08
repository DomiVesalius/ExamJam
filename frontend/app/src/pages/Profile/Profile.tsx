import React from 'react';
import { useState } from 'react';
import "./Profile.css"
import {
    Avatar,
    Button,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    Stack,
    TextField
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';
import { VisibilityOff } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Form, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

function Profile() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("Username");
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const changePassowrdValidationSchema = yup.object({
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords do not match')
            .required('Confirm your password')
    });


    return (
            <Container maxWidth={"md"} >
                <Stack spacing={2} alignItems={"center"}>
                    <Stack direction={"row"} spacing={20} alignItems={"center"}>
                        <Stack spacing={2} alignItems={"center"}>
                            <Avatar
                                alt="Remy Sharp"
                                src={'frontend/app/public/logo192.png'}
                                sx={{ width: 100, height: 100}}
                            />
                            <Button variant="outlined" startIcon={<EditIcon />} size={"small"}
                                    onClick={() => {alert("Profile picture changed.")}}>
                                Change picture
                            </Button>
                            <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                <TextField id="filled-basic" label={"Username"} variant="filled"
                                           onChange={(e) => {setUsername(e.target.value)}}/>
                                <Button variant="contained" size={"small"} onClick={() => {alert("Username changed.")}}>
                                    Change username
                                </Button>
                            </Stack>
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
                    <Stack direction="row" spacing={2}  alignItems={"center"}>
                        <h3>Change Password:</h3>
                            <Stack direction="row" spacing={2}  alignItems={"center"}>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <Button variant="contained" endIcon={<SendIcon />} size={"small"}>
                                    Send
                                </Button>
                            </Stack>
                    </Stack>
                    <Button variant="contained" color="error">
                        Delete Account
                    </Button>
                </Stack>
            </Container>
    );
}

export default Profile;
