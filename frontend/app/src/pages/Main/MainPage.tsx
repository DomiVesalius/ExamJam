import React from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import UnprotectedRoute from '../../components/Routes/UnprotectedRoute';
import { makeStyles } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Header } from '../../components/Main/Header/Header';
import { GettingStarted } from '../../components/Main/GettingStarted/GettingStarted';
import { Feature } from '../../components/Main/Feature/Feature';
const useStyles = makeStyles((theme: any) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/image7.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
}));

export const MainPage: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <div>
            <CssBaseline />
            <PageLayout title="HomePage">
                <CssBaseline />
                <Header />
                <GettingStarted />
                <Feature
                    description="ExamJam is a platform that allows you to create and share exams with your friends and colleagues. You can also take exams created by others and get instant feedback on your performance."
                    image="/image2.jpg"
                />
            </PageLayout>
        </div>
    );
};
