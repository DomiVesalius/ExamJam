import React, { useEffect } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Container, Grid, Stack } from '@mui/material';

export interface LayoutProps {
    children?: React.ReactNode;
    title: string;
}

/**
 * Primary layout for the ExamJam application.
 */
const PageLayout: React.FunctionComponent<LayoutProps> = (props: LayoutProps): JSX.Element => {
    useEffect(() => {
        document.title = props.title;
    }, [props.title]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Navbar
                    userMenu1="Profile"
                    userMenu2="Logout"
                    navbarName="Exam Jam"
                    searchDefaultColor="#FFFFFF"
                    searchHoverColor="#FFFFFF"
                    searchPlaceholder="Search for courses..."
                />
            </Grid>
            <Grid item xs={12}>
                <Container>{props.children}</Container>
            </Grid>
        </Grid>
    );
};

export default PageLayout;
