import React, { FormEvent, useEffect, useState } from 'react';
import HTTP from './utils/http';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import PageLayout from './components/Layout/PageLayout';
import Counter from './components/Counter/Counter';
import { Typography } from '@mui/material';

interface Person {
    _id: string;
    name: string;
    SIN: number;
    age: number;
}

/**
 * For now this is just to show that the frontend and backend are connected.
 * Frontend sends a request to the backend to create a random person. The person is saved in the DB and the frontend
 * then fetches a list of all existing random people.
 * @constructor
 */
function App() {
    const getPeople = () => {
        HTTP.get('/misc/random-person')
            .then((r) => r.data)
            .then((d) => setPeople(d.people));
    };

    const createPerson = (name: string) => {
        HTTP.post('/misc/random-person', { name: name })
            .then((r) => r.data)
            .then(() => getPeople());
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        createPerson(e.target.personName.value);
    };

    const [people, setPeople] = useState<Array<Person>>([]);

    useEffect(() => {
        getPeople();
    }, []);

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
                <Route path={'/'} element={<Main />}></Route>
                <Route path={'profile'} element={<Profile />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
