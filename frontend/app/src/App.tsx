import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/Profile/ProfilePage';
import PageLayout from './components/Layout/PageLayout';
import { Typography } from '@mui/material';

import RegistrationPage from './pages/Auth/RegistrationPage';
import LoginPage from './pages/Auth/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import CourseSearch from './pages/Dashboard/CourseSearch/CourseSearch';

/**
 * For now this is just to show that the frontend and backend are connected.
 * Frontend sends a request to the backend to create a random person. The person is saved in the DB and the frontend
 * then fetches a list of all existing random people.
 * @constructor
 */
function App() {
    function Main() {
        return (
            <PageLayout title={App.name}>
                <Typography variant="h1">Welcome to the main page :]</Typography>
            </PageLayout>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="dashboard/profile" element={<ProfilePage />}></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="register" element={<RegistrationPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path={'dashboard/courses'} element={<CourseSearch />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
