import React from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import UnprotectedRoute from '../../components/Routes/UnprotectedRoute';
import { makeStyles } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Header } from '../../components/Main/Header/Header';
import { GettingStarted } from '../../components/Main/GettingStarted/GettingStarted';
import { Feature } from '../../components/Main/Feature/Feature';
import { FeatureOpposite } from '../../components/Main/Feature/FeatureOpposite';
const useStyles = makeStyles((theme: any) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/image7.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
}));

export const MainPage: React.FunctionComponent = () => {
    return (
        <div>
            <CssBaseline />
            <PageLayout title="HomePage">
                <CssBaseline />
                <Header />
                <GettingStarted />
                <Feature description="Community Driven" image="/image7.jpg" />
                <FeatureOpposite description="Persistent" image="/image5.jpg" />
                <Feature description="AI Generated Answers" image="/image10.jpg" />
            </PageLayout>
        </div>
    );
};
