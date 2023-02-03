import React from 'react';
import PageLayout from './components/Layout/PageLayout';
import Counter from './components/Counter/Counter';
import { Typography } from '@mui/material';

/**
 * For now this is just to show that the frontend and backend are connected.
 * Frontend sends a request to the backend to create a random person. The person is saved in the DB and the frontend
 * then fetches a list of all existing random people.
 * @constructor
 */
function App() {
    return (
        <PageLayout title={App.name}>
            <Typography variant="h1">Welcome to the main page :]</Typography>
        </PageLayout>
    );
}

export default App;
