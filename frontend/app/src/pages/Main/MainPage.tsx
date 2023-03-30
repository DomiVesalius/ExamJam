import React from 'react';
import PageLayout from '../../components/Layout/PageLayout';
import { CssBaseline } from '@material-ui/core';
import { Header } from '../../components/Main/Header/Header';
import { GettingStarted } from '../../components/Main/GettingStarted/GettingStarted';
import { Feature, IconType } from '../../components/Main/Feature/Feature';
import { FeatureOpposite } from '../../components/Main/Feature/FeatureOpposite';

export const MainPage: React.FunctionComponent = () => {
    return (
        <div>
            <CssBaseline />
            <PageLayout title="HomePage">
                <CssBaseline />
                <Header />
                <GettingStarted />
                <FeatureOpposite
                    description="Community Driven"
                    image="/image7.jpg"
                    icon={IconType.starIcon}
                />
                <Feature description="Persistent" image="/image5.jpg" icon={IconType.flagIcon} />
            </PageLayout>
        </div>
    );
};
